export function jobTimeStamp(userId) {
  const timestamp = userId.toString().substring(0, 8);
  const uploadedAt = new Date(parseInt(timestamp, 16) * 1000);

  if (uploadedAt.getHours() > 1) {
    return `${uploadedAt.getHours()} hours ago`;
  } else {
    if (uploadedAt.getMinutes() > 1) {
      return `${uploadedAt.getMinutes()} minutes ago`;
    } else {
      return `Just now`;
    }
  }
}
