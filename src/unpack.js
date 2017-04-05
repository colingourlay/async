import throws from './throws';

export default function unpack(packed, ignoreErrors) {
  return ignoreErrors ? packed[1] : throws(packed)[1];
}
