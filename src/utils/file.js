import MediaTypes from '../types/MediaTypes';
import { fetchMediaList } from './media';

export function formatFileSize(bytes, decimalPoint) {
  if (bytes == 0) return '0 Bytes';
  const dm = decimalPoint || 0;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, i)).toFixed(dm)) + ' ' + sizes[i];
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(milliseconds);
    }, milliseconds);
  });
}

async function downloadFile(file) {
  if (!file.url) return;
  const a = document.createElement('a');
  a.id = file.id;
  a.download = file.name;
  a.href = file.url;
  a.style.display = 'none';
  document.body.append(a);
  a.click();

  await delay(100);
  a.remove();
}

export async function downloadMultiFiles(allMedia) {
  allMedia.forEach(async (media, idx) => {
    if (media.type === MediaTypes.FOLDER) {
      const subMedia = await fetchMediaList(media.id);
      await downloadMultiFiles(subMedia);
    } else {
      await downloadFile(media);
    }
  });
}
