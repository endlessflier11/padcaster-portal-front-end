export function formatFileSize(bytes, decimalPoint) {
  if (bytes == 0) return '0 Bytes';
  const dm = decimalPoint || 0;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, i)).toFixed(dm)) + ' ' + sizes[i];
}
