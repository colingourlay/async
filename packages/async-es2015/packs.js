import pack from './pack';

export default function packs(fn) {
  return (...args) => pack(fn(...args));
}