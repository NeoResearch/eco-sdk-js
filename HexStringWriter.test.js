const HexStringWriter = require('./HexStringWriter').HexStringWriter;

test('constructor HexStringWriter("abcd") equals "abcd"', () => {
  expect(new HexStringWriter("abcd").valueOf()).toBe("abcd");
});

test('HexStringWriter("").WriteByte(0x09) equals "09"', () => {
  var hsw = new HexStringWriter("");
  hsw.WriteByte(0x09);
  expect(hsw.valueOf()).toBe("09");
});
