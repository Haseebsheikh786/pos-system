import { useCallback } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Invoice, InvoiceItem } from '@/types/invoice';
import type { Profile } from '@/types/profile';
import type { Payment } from '@/types/payment';

interface UseInvoiceDownloaderProps {
    invoice: Invoice | null;
    items: InvoiceItem[];
    profile?: Profile | null;
    payments?: Payment[];
}

interface JsPDFWithAutoTable extends jsPDF {
    lastAutoTable?: {
        finalY: number;
    };
}

export const useInvoiceDownloader = ({
    invoice,
    items,
    profile,
    payments = [],
}: UseInvoiceDownloaderProps) => {
    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const calculateTotal = () => {
        if (!items) return 0;
        return items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const downloadInvoice = useCallback(() => {
        if (!invoice) {
            console.warn("Invoice not ready");
            return;
        }
        // Create PDF document
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        }) as JsPDFWithAutoTable;

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 15;
        const contentWidth = pageWidth - (margin * 2);

        // Current Y position
        let yPos = margin;

        // Add background color for header
        doc.setFillColor(245, 247, 250);
        doc.rect(0, 0, pageWidth, 60, 'F');

        // Business Logo and Name (Top Section)
        doc.setFontSize(24);
        doc.setTextColor(41, 128, 185); // Blue color for business name
        doc.setFont('helvetica', 'bold');
        const businessName = profile?.business_name || 'Your Business';
        const businessNameWidth = doc.getTextWidth(businessName);
        doc.text(businessName, (pageWidth - businessNameWidth) / 2, yPos + 10);

        // Business Details (Left side)
        yPos = 30;
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);

        if (profile?.business_address) {
            const addressLines = doc.splitTextToSize(profile.business_address, contentWidth / 2);
            doc.text(addressLines, margin, yPos);
            yPos += addressLines.length * 4;
        }

        if (profile?.phone) {
            doc.text(`Phone: ${profile.phone}`, margin, yPos);
            yPos += 5;
        }

        if (profile?.email) {
            doc.text(`Email: ${profile.email}`, margin, yPos);
        }

        // Invoice Header Section
        yPos = 30;
        doc.setFontSize(20);
        doc.setTextColor(46, 204, 113); // Green color for INVOICE text
        doc.setFont('helvetica', 'bold');
        doc.text('TAX INVOICE', pageWidth - margin - 40, yPos);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text('Original for Recipient', pageWidth - margin - 40, yPos + 5);

        // Invoice Details
        yPos = 40;
        const invoiceDetails = [
            ['Invoice No:', invoice.invoice_number || `INV-${invoice.id.slice(0, 8)}`],
            ['Invoice Date:', formatDate(invoice.created_at)],
            ['Invoice Time:', formatTime(invoice.created_at)],
            ['Customer:', invoice.customer_name || 'Walk-in Customer'],
            ['Phone:', invoice.customer_phone || 'N/A'],
        ];

        invoiceDetails.forEach(([label, value], index) => {
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.setFont('helvetica', 'normal');
            doc.text(label, pageWidth - margin - 40, yPos + (index * 5));

            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            const valueX = pageWidth - margin - 40 + 25;
            doc.text(value, valueX, yPos + (index * 5));
        });

        // Separator line
        yPos = 65;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPos, pageWidth - margin, yPos);

        // Products Table
        yPos += 10;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text('ITEMS DESCRIPTION', margin, yPos);

        if (items && items.length > 0) {
            const tableColumn = ['Sr.', 'Description', 'Price', 'Qty', 'Amount'];
            const tableRows = items.map((item, index) => [
                (index + 1).toString(),
                item.product_name || 'Product',
                formatCurrency(item.price),
                item.quantity.toString(),
                formatCurrency(item.price * item.quantity),
            ]);

            autoTable(doc, {
                startY: yPos + 5,
                head: [tableColumn],
                body: tableRows,
                margin: { left: margin, right: margin },
                headStyles: {
                    fillColor: [41, 128, 185], // Blue header
                    textColor: [255, 255, 255],
                    fontSize: 10,
                    fontStyle: 'bold',
                },
                bodyStyles: {
                    fontSize: 9,
                    textColor: [60, 60, 60],
                },
                alternateRowStyles: {
                    fillColor: [245, 247, 250],
                },
                columnStyles: {
                    0: { cellWidth: 10 }, // Sr. No
                    1: { cellWidth: 70 }, // Description
                    2: { cellWidth: 30, halign: 'right' }, // Price
                    3: { cellWidth: 20, halign: 'center' }, // Qty
                    4: { cellWidth: 30, halign: 'right' }, // Amount
                },
                styles: {
                    lineWidth: 0.1,
                    lineColor: [200, 200, 200],
                },
            });

            // With this:
            if (doc.lastAutoTable) {
                yPos = doc.lastAutoTable.finalY + 10;
            }
        } else {
            yPos += 15;
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text('No items found', margin, yPos);
        }

        // Amount Summary
        const total = calculateTotal();
        const paidAmount = invoice.amount_paid || 0;
        const balanceDue = invoice.due_amount || 0;

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        // Amount details table
        const amountDetails = [
            ['Total:', formatCurrency(total)],
            ['Amount Paid:', formatCurrency(paidAmount)],
            ['Balance Due:', formatCurrency(balanceDue)],
        ];

        const amountTableX = pageWidth - margin - 60;

        amountDetails.forEach(([label, value], index) => {
            doc.setFont('helvetica', 'normal');
            doc.text(label, amountTableX, yPos + (index * 5));

            doc.setFont('helvetica', 'bold');
            const isTotal = label === 'Total:';
            const isBalanceDue = label === 'Balance Due:';

            if (isTotal) {
                doc.setTextColor(41, 128, 185); // Blue for total
            } else if (isBalanceDue) {
                if (balanceDue > 0) {
                    doc.setTextColor(231, 76, 60); // Red
                } else {
                    doc.setTextColor(46, 204, 113); // Green
                }
            } else {
                doc.setTextColor(0, 0, 0);
            }


            doc.text(value, pageWidth - margin - 10, yPos + (index * 5), { align: 'right' });
        });

        yPos += (amountDetails.length * 5) + 10;

        // Payment Status
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        const status = invoice.payment_status?.toUpperCase() || 'PENDING';
        const statusColor =
            invoice.payment_status === 'paid' ? [46, 204, 113] :
                invoice.payment_status === 'partial' ? [241, 196, 15] :
                    [231, 76, 60];

        doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
        doc.text(`PAYMENT STATUS: ${status}`, margin, yPos);

        // Payment History (if any)
        if (payments.length > 0) {
            yPos += 10;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.text('PAYMENT HISTORY', margin, yPos);

            const paymentRows = payments.map(payment => [
                formatDate(payment.created_at),
                payment.method?.toUpperCase() || 'CASH',
                formatCurrency(payment.amount),
            ]);

            autoTable(doc, {
                startY: yPos + 5,
                head: [['Date', 'Method', 'Amount']],
                body: paymentRows,
                margin: { left: margin, right: margin },
                headStyles: {
                    fillColor: [52, 73, 94], // Dark blue header
                    textColor: [255, 255, 255],
                    fontSize: 9,
                },
                bodyStyles: {
                    fontSize: 8,
                    textColor: [60, 60, 60],
                },
                columnStyles: {
                    0: { cellWidth: 35 },
                    1: { cellWidth: 25, halign: 'center' },
                    2: { cellWidth: 30, halign: 'right' },
                    3: { cellWidth: 60 },
                },
                styles: {
                    lineWidth: 0.1,
                    lineColor: [200, 200, 200],
                },
            });

            if (doc.lastAutoTable) {
                yPos = doc.lastAutoTable.finalY;
            }
        }

        // Footer Section
        const footerY = doc.internal.pageSize.getHeight() - 30;

        // Thank you message
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.setFont('helvetica', 'italic');
        doc.text('Thank you for your business!', pageWidth / 2, footerY, { align: 'center' });

        // Terms and Conditions
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        const terms = [
            'Terms & Conditions:',
            '1. Goods once sold will not be taken back.',
            '2. Payment should be made in full at the time of purchase.',
            '3. This is a computer generated invoice.',
        ];

        terms.forEach((line, index) => {
            doc.text(line, margin, footerY + 5 + (index * 3));
        });

        // Save the PDF
        const fileName = `${invoice.invoice_number || invoice.id.slice(0, 8)}.pdf`;
        doc.save(fileName);
    }, [invoice, profile, payments]);

    return { downloadInvoice };
};

export default useInvoiceDownloader;