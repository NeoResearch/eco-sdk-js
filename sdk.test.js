const SdkHelper = require('./sdk').SdkHelper;

test('constructor SdkHelper() equals ""', () => {
  expect(new SdkHelper().toString()).toBe("");
});
