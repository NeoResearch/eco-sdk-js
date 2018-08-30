const HexStringReader = require('./sdk').HexStringReader;

test('constructor HexStringReader("abcd") equals "abcd"', () => {
  expect(new HexStringReader("abcd").valueOf()).toBe("abcd");
});

test('HexStringReader("abcd").ReadHexByte() equals "ab"', () => {
  var hexreader = new HexStringReader("abcd");
  expect(hexreader.ReadHexByte()).toBe("ab");
});

test('HexStringReader("abcdef").ReadHexByte() equals "ab"', () => {
  var hexreader = new HexStringReader("abcdef");
  expect(hexreader.ReadHexByte()).toBe("ab");
});

test('HexStringReader("a").ReadByte() equals 10', () => {
  expect(new HexStringReader("a").ReadByte()).toBe(10);
});

test('HexStringReader("0a").ReadByte() equals 10', () => {
  expect(new HexStringReader("0a").ReadByte()).toBe(10);
});

test('HexStringReader("00a").ReadByte() equals 0', () => {
  expect(new HexStringReader("00a").ReadByte()).toBe(0);
});

test('HexStringReader("0").ReadHexByte() equals "00"', () => {
  expect(new HexStringReader("0").ReadHexByte()).toBe("00");
});

test('HexStringReader("0123456789").ReadBytes(2) equals "0123"', () => {
  expect(new HexStringReader("0123456789").ReadBytes(2)).toBe("0123");
});
