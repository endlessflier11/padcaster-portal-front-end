export const toSlug = (string) => {
  return string.toLowerCase().replace(/\s/g, '-').replace(/[^0-9a-zA-Z-]+/g, "");
}

export const alertParam = (alert) => {
  return `alert=${encodeURIComponent(`${alert.status}:${alert.message}`)}`;
}
