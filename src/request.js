export const send = option => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(option.method, option.url, true);
    xhr.onload = function(data) {
      resolve(data);
    };
    xhr.send();
  });
};
