// utils/dateHelpers.ts

/**
 * Convert Firestore-style timestamp { seconds, nanoseconds } to JS Date
 */
export function timestampToDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}): Date {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000);
}

/**
 * Format Firestore timestamp into MM/DD/YY
 */
export function formatTimestamp(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  if (!timestamp?.seconds) return "";
  const date = timestampToDate(timestamp);

  const month = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); // last 2 digits

  return `${month}/${day}/${year}`;
}
