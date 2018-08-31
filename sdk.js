// Neo helper functions in js
// Igor M. Coelho, Copyleft 2018 - MIT License

(function(exports) {
"use strict";

// Helper functions inspired from: neo/IO/Helper.cs
const HexStringReader = require('./HexStringReader').HexStringReader;


function SdkHelper() {
}

SdkHelper._construct = function() {
	return new SdkHelper();
};

SdkHelper.prototype.toString = function() {
	return "";
}

exports.SdkHelper = SdkHelper;
})(typeof exports !== 'undefined' ? exports : this);

//module.exports = csBigInteger;
