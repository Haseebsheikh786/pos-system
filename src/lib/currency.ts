// Currency symbols mapping
export const currencySymbols: Record<string, string> = {
    pkr: "₨",
    inr: "₹",
    usd: "$",
    eur: "€",
    gbp: "£",
    jpy: "¥",
    aud: "A$",
    cad: "C$",
    chf: "CHF",
    cny: "¥",
};

// Currency names for display
export const currencyNames: Record<string, string> = {
    pkr: "Pakistani Rupee",
    inr: "Indian Rupee",
    usd: "US Dollar",
    eur: "Euro",
    gbp: "British Pound",
    jpy: "Japanese Yen",
    aud: "Australian Dollar",
    cad: "Canadian Dollar",
    chf: "Swiss Franc",
    cny: "Chinese Yuan",
};

// Currency codes (3-letter)
export const currencyCodes: Record<string, string> = {
    pkr: "PKR",
    inr: "INR",
    usd: "USD",
    eur: "EUR",
    gbp: "GBP",
    jpy: "JPY",
    aud: "AUD",
    cad: "CAD",
    chf: "CHF",
    cny: "CNY",
};

// Get currency symbol
export const getCurrencySymbol = (currencyCode: string): string => {
    if (!currencyCode) return "$"; // Default fallback
    return currencySymbols[currencyCode.toLowerCase()] || currencyCode;
};

// Get currency name
export const getCurrencyName = (currencyCode: string): string => {
    if (!currencyCode) return "US Dollar"; // Default fallback
    return currencyNames[currencyCode.toLowerCase()] || currencyCode;
};

// Get currency code (3-letter)
export const getCurrencyCode = (currencyCode: string): string => {
    if (!currencyCode) return "USD"; // Default fallback
    return currencyCodes[currencyCode.toLowerCase()] || currencyCode.toUpperCase();
};

// Format price with currency symbol
export const formatPrice = (
    amount: number,
    currencyCode: string = "usd",
    options?: {
        showSymbol?: boolean;
        showCode?: boolean;
        locale?: string;
    }
): string => {
    const symbol = getCurrencySymbol(currencyCode);
    const code = getCurrencyCode(currencyCode);

    const defaultOptions = {
        showSymbol: true,
        showCode: false,
        locale: "en-US",
        ...options,
    };

    const formattedAmount = new Intl.NumberFormat(defaultOptions.locale, {
        style: "currency",
        currency: code,
    }).format(amount);

    if (!defaultOptions.showSymbol) {
        return formattedAmount.replace(/[^0-9.,]/g, "");
    }

    if (defaultOptions.showCode) {
        return `${code} ${amount.toLocaleString(defaultOptions.locale)}`;
    }

    return formattedAmount;
};

// Get all currency options for dropdown
export const getCurrencyOptions = () => {
    return Object.entries(currencySymbols).map(([code, symbol]) => ({
        value: code,
        label: `${currencyCodes[code]} - ${currencyNames[code]} (${symbol})`,
        symbol,
        name: currencyNames[code],
        code: currencyCodes[code],
    }));
};

// Validate currency code
export const isValidCurrency = (currencyCode: string): boolean => {
    return currencyCode.toLowerCase() in currencySymbols;
};