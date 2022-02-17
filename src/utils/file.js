export function formatFileSize(bytes, decimalPoint) {
  if (bytes == 0) return '0 Bytes';
  const dm = decimalPoint || 0;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, i)).toFixed(dm)) + ' ' + sizes[i];
}

function delay(milliseconds) {
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function download(file, count) {
  const url = file.url;
  const name = file.name;
  if (!url) {
    throw new Error('Resource URL not provided! You need to provide one');
  }
  fetch(url)
    .then((response) => response.blob())
    .then(async (blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.id = `hidden-downloader-${count}`;
      a.href = blobURL;
      a.style = 'display: none';

      if (name && name.length) a.download = name;
      document.body.appendChild(a);
      a.click();

      await delay(100);
      a.remove();
    })
    .catch(() => console.error('fetch url error'));
}

export async function downloadMultiFiles(files) {
  try {
    files.forEach(async (file, idx) => {
      await download(file, idx);
    });
  } catch (err) {
    console.error(err);
  }
}
