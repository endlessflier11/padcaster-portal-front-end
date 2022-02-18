import MediaTypes from '../types/MediaTypes';

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

async function downloadFile(file, count) {
  // const url = file.url;
  let url;
  if (count % 3 === 0)
    url =
      'https://static.wixstatic.com/media/51a970_86252556f0614bfea4cbb53c00050f9c~mv2.jpg';
  else if (count % 3 === 1)
    url =
      'https://corva-files-qa.s3.amazonaws.com/corva/1644497980/050707c7a4e8dbfaccde50d0f9f3f075.png?response-content-disposition=attachment%3B%20filename%3Dcorva%2F1644497980%2F050707c7a4e8dbfaccde50d0f9f3f075.png&X-Amz-Expires=900&X-Amz-Date=20220218T061532Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVGPDEUCO3URUF447%2F20220218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=cddbbb9d0defb18d5067b3fe2debd072c7d2f478b45a601ba88ae34d63a20641';
  else
    url =
      'https://corva-files-qa.s3.amazonaws.com/corva/1644497988/flushed-face_1f633.png?response-content-disposition=attachment%3B%20filename%3Dcorva%2F1644497988%2Fflushed-face_1f633.png&X-Amz-Expires=900&X-Amz-Date=20220218T061531Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVGPDEUCO3URUF447%2F20220218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=f8a1ab57c497709a12b9270a131195a9bb2f151f36b6c1344791536cc0510226';
  const name = file.name;
  if (!url) {
    throw new Error('Resource URL not provided! You need to provide one');
  }
  console.log('111 url=,', file.url, count);
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

async function downloadFolder(folder) {
  console.log('111 folder=', folder);
}

export async function downloadMultiFiles(allMedia) {
  try {
    allMedia.forEach(async (media, idx) => {
      if (media.type === MediaTypes.FOLDER) {
        await downloadFolder(media);
      } else {
        await downloadFile(media, idx);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
