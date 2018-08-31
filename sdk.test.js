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

test('HexStringReader("53xxx").ReadVarBytes(65536).length equals 166', () => {
  var x = '5308002d3101000000001486560ed990961f09eb70d90b2330c0de705afc8814fd8d0f84b8db897d6eebe3e0177ed5c5b47fc32253c1087472616e7366657267f9e6e770af783d809bd1a65e1bb5b6042953bcac000000000000000001f0063635393336330164a67ef47d986f88c30a76c5a5efc6948f893a4b9962b3884230deab0c59e69d54000001414099bf87de5037b7be6cef2f3a5b09edb1e3407d948b6ba2d6ee9510cdf5316b77a60451088ada6273b6b0381bc164ede1315e32d2839cdf1c9088a7baecd4c59723210202008015935b7c56e7af01559fb4fd5e05bb2713d91f25dd3dcac518fe006c1cac';
  expect(new HexStringReader(x).ReadVarBytes(65536).length).toBe(166);
});
