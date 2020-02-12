export default function request(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = data => {
            resolve(data);
        };
        xhr.send();
    });
}