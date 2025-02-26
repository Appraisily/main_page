/**
 * Decodes HTML entities and special characters in a string
 */
export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Truncates text to a specified number of words
 */
export function truncateWords(text: string, wordCount: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
}

/**
 * Formats a currency amount with proper separators and decimals
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2
  }).format(amount);
}