export class Http {
  // "static" methods aren't called on instances of the class, instead they're called on the class itself. In essence, there's no instantiate of a class. Useful for utils.
  static fetchData(url) {
    return new Promise((resolve, reject) => {
      const HTTP = new XMLHttpRequest();
      HTTP.open('GET', url);
      HTTP.onreadystatechange = () => {
        if (HTTP.readyState === XMLHttpRequest.DONE && HTTP.status === 200) {
          const RESPONSE_DATA = JSON.parse(HTTP.responseText); // Parse HTTP's response into JavaScript object.
          resolve(RESPONSE_DATA); // Promise was successful, therefore resolve.
        } else if (HTTP.readyState === XMLHttpRequest.DONE) {
          reject('Something went wrong') // Promise was not successful, therefore reject.
        }
      }
      HTTP.send(); // Send request to the server.
    })
  }
}