export default function throws(packed) {
  if (packed[0]) {
    throw packed[0];
  }

  return packed;
}
