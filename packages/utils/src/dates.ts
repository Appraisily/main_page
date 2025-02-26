/**
 * Format a date as a string in the format of "MMMM DD, YYYY"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

/**
 * Format a date as a string in ISO format
 */
export function formatISODate(date: Date): string {
  const isoString = date.toISOString();
  const parts = isoString.split('T');
  return parts[0] || '';
}

/**
 * Get the relative time from a date (e.g., "2 days ago")
 */
export function getRelativeTime(date: Date): string {
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'today';
  return formatter.format(diffInDays, 'day');
} 