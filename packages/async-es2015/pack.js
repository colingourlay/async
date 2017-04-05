export default function pack(promise) {
  return promise.then(result => [null, result]).catch(err => [err]);
}