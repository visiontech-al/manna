export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Calendar-day key such as `2026-10-06`, in local time. */
export function toDayKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** `Today`, `Yesterday`, or a short date such as `Mon, Oct 5`. */
export function formatDayLabel(date: Date, now: Date = new Date()) {
  if (isSameDay(date, now)) {
    return 'Today';
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, yesterday)) {
    return 'Yesterday';
  }

  return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatLongDate(date: Date) {
  return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
}

export function getGreeting(date: Date = new Date()) {
  const hour = date.getHours();

  if (hour < 12) {
    return 'Good morning';
  }

  if (hour < 18) {
    return 'Good afternoon';
  }

  return 'Good evening';
}
