export default (method, url) => {
  return new Promise((resolve, reject) => {
      // ajax
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = data => {
      resolve(data);
    };
    xhr.send();
  });
};
