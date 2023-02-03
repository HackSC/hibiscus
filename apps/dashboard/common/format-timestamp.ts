export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('default', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
    .format(date)
    .replace(' at ', ', ');
}
