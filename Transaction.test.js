const Transaction = require('./Transaction').Transaction;

test('constructor Transaction(0x80, 0x01) equals "8001"', () => {
  expect(new Transaction(0x80, 0x01).valueOf()).toBe("8001");
});
