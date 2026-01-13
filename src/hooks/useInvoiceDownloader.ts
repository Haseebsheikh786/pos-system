import { useCallback } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Invoice, InvoiceItem } from '@/types/invoice';
import type { Profile } from '@/types/profile';

interface JsPDFWithAutoTable extends jsPDF {
    lastAutoTable?: {
        finalY: number;
    };
}

interface DownloadInvoiceArgs {
    invoice: Invoice;
    items: InvoiceItem[];
    profile: Profile;
}

export const useInvoiceDownloader = () => {
    const formatCurrency = (amount: number) => `${amount}`;

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });

    const formatTime = (dateString: string) =>
        new Date(dateString).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

    const calculateTotal = (items: InvoiceItem[]) =>
        items.reduce((t, i) => t + i.price * i.quantity, 0);

    // ✅ FUNCTION ACCEPTS DATA
    const downloadInvoice = useCallback(
        async ({ invoice, items, profile }: DownloadInvoiceArgs) => {
            if (!invoice) return; 

            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            }) as JsPDFWithAutoTable;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 15;
            let yPos = margin;

            /* ---------------- LOGO LOADER ---------------- */
            const loadImage = (url?: string): Promise<string | null> => {
                return new Promise((resolve) => {
                    if (!url) return resolve(null);
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        if (!ctx) return resolve(null);
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    };
                    img.onerror = () => resolve(null);
                    img.src = url;
                });
            };

            const logoBase64 = await loadImage(profile?.shop_logo_url);

            /* ---------------- HEADER CARD ---------------- */
            doc.setFillColor(245, 247, 250);
            doc.rect(0, 0, pageWidth, 45, 'F');

            if (logoBase64) {
                doc.addImage(logoBase64, 'PNG', margin, 8, 25, 25);
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(20);
            doc.setTextColor(33, 37, 41);
            doc.text(
                profile?.business_name || 'Your Business',
                logoBase64 ? margin + 32 : margin,
                18
            );

            doc.setFontSize(9);
            doc.setTextColor(90, 90, 90);
            doc.text(profile?.business_address || '', logoBase64 ? margin + 32 : margin, 24);
            if (profile?.phone) doc.text(`Phone: ${profile.phone}`, logoBase64 ? margin + 32 : margin, 29);
            if (profile?.email) doc.text(`Email: ${profile.email}`, logoBase64 ? margin + 32 : margin, 34);

            /* ---------------- INVOICE META ---------------- */
            doc.setFontSize(18);
            doc.setTextColor(41, 128, 185);
            doc.text('INVOICE', pageWidth - margin, 18, { align: 'right' });

            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);

            const metaY = 26;
            const metaX = pageWidth - margin - 60;
            const meta = [
                ['Invoice No', invoice.invoice_number || invoice.id.slice(0, 8)],
                ['Date', formatDate(invoice.created_at)],
                ['Time', formatTime(invoice.created_at)],
            ];

            meta.forEach(([k, v], i) => {
                doc.text(`${k}:`, metaX, metaY + i * 5);
                doc.setFont('helvetica', 'bold');
                doc.text(v, pageWidth - margin, metaY + i * 5, { align: 'right' });
                doc.setFont('helvetica', 'normal');
            });

            yPos = 55;

            /* ---------------- CUSTOMER ---------------- */
            doc.setDrawColor(220);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(0);
            doc.text('Bill To:', margin, yPos);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            yPos += 6;
            doc.text(invoice.customer_name || 'Walk-in Customer', margin, yPos);
            yPos += 5;
            doc.text(`Phone: ${invoice.customer_phone || 'N/A'}`, margin, yPos);

            /* ---------------- ITEMS TABLE ---------------- */
            yPos += 10;

            autoTable(doc, {
                startY: yPos,
                head: [['#', 'Item', 'Price', 'Qty', 'Amount']],
                body: items.map((item, i) => [
                    i + 1,
                    item.product_name,
                    formatCurrency(item.price),
                    item.quantity,
                    formatCurrency(item.price * item.quantity),
                ]),
                margin: { left: margin, right: margin },
                styles: {
                    fontSize: 9,
                    lineColor: [230, 230, 230],
                    lineWidth: 0.3,
                },
                headStyles: {
                    fillColor: [41, 128, 185],
                    textColor: 255,
                    fontStyle: 'bold',
                },
                columnStyles: {
                    0: { cellWidth: 10 },
                    1: { cellWidth: 75 },
                    2: { halign: 'left' },
                    3: { halign: 'left' },
                    4: { halign: 'left' },
                },
                alternateRowStyles: { fillColor: [248, 249, 250] },
            });

            yPos = doc.lastAutoTable?.finalY || yPos;
            yPos += 8;

            /* ---------------- TOTAL BOX ---------------- */
            const total = calculateTotal(items);
            const paid = invoice.amount_paid || 0;
            const due = invoice.due_amount || 0;

            const boxX = pageWidth - margin - 70;
            doc.setFillColor(248, 249, 250);
            doc.rect(boxX, yPos, 70, 28, 'F');

            const totals = [
                ['Total', formatCurrency(total)],
                ['Paid', formatCurrency(paid)],
                ['Balance', formatCurrency(due)],
            ];

            totals.forEach(([k, v], i) => {
                doc.setFont('helvetica', 'normal');
                doc.text(k, boxX + 4, yPos + 7 + i * 7);
                doc.setFont('helvetica', 'bold');
                doc.text(v, boxX + 66, yPos + 7 + i * 7, { align: 'right' });
            });

            /* ---------------- FOOTER ---------------- */
            doc.setFontSize(8);
            doc.setTextColor(120);
            doc.text(
                'Thank you for your business!',
                pageWidth / 2,
                pageHeight - 20,
                { align: 'center' }
            );

            doc.text(
                'This is a computer generated invoice.',
                pageWidth / 2,
                pageHeight - 15,
                { align: 'center' }
            );

            doc.save(`${invoice.invoice_number || invoice.id.slice(0, 8)}.pdf`);
        },
        []
    );

    return { downloadInvoice };
};

export default useInvoiceDownloader;
