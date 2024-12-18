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
  const words = text.split(' ');
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
}