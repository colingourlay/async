function pack(promise) {
  return promise
  .then(result => [null, result])
  .catch(err => [err]);
}

export default pack;
