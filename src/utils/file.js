export function formatFileSize(bytes, decimalPoint) {
  if (bytes == 0) return '0 Bytes';
  const dm = decimalPoint || 0;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, i)).toFixed(dm)) + ' ' + sizes[i];
}

function downloadFile(file, count) {
  var hiddenIFrameID = 'hiddenDownloader' + count;
  var iframe = document.createElement('iframe');
  iframe.id = hiddenIFrameID;
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  iframe.src = file.url;
}

function download(file, count) {
  var element = document.createElement('a');
  element.id = `hiddenDownloader${count}`;
  element.setAttribute('href', file.url);
  element.setAttribute('download', file.name);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export async function downloadMultiFiles2(files) {
  try {
    files.forEach((file, idx) => {
      // downloadFile(file, idx);
      download(file, idx);
    });
  } catch (err) {
    console.error(err);
  }
}

///
var saveData = (function () {
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  return function (data, fileName) {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();

function downloadBlob(url, blob, name = 'file.txt') {
  fetch(url)
    .then((json) => {
      // TODO: Convert JSON object to blob
      console.log('111 json=', json);
    })
    .catch((err) => console.error(err));

  if (window.navigator && window.navigator.msSaveOrOpenBlob)
    return window.navigator.msSaveOrOpenBlob(blob);

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = data;
  link.download = name;

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
    link.remove();
  }, 100);
}

export async function downloadMultiFiles(files) {
  var data = { x: 42, s: 'hello, world', d: new Date() },
    fileName = 'my-download.json';
  let jsonBlob = new Blob(['{"name": "test"}']);
  // saveData(data, fileName);
  downloadBlob(files[0].url, jsonBlob, 'myfile.json');
}
