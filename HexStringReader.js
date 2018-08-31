// Neo helper functions in js
// Igor M. Coelho, Copyleft 2018 - MIT License

(function(exports) {
"use strict";

function HexStringReader(hexstr) {
	var hs = hexstr.toString();
	this._hexstr =  HexStringReader.AddPadding(hs);
}

HexStringReader._construct = function(hexstr) {
	return new HexStringReader(hexstr);
};

HexStringReader.AddPadding = function(hexstr) {
	if(hexstr.length % 2 == 1)
		 return '0'+hexstr;
	return hexstr;
};

// extracts real byte from hex string
HexStringReader.prototype.ReadByte=function(){
	return parseInt(this.ReadHexByte(), 16);
}

// extracts hex string 'byte' from hex string
HexStringReader.prototype.ReadHexByte=function(){
	return this.ReadBytes(1);
}

// read a given number of bytes
HexStringReader.prototype.ReadBytes=function(nbytes){
	var ret = this._hexstr.substr(0, 2*nbytes);
	this._hexstr = this._hexstr.slice(2*nbytes);
	return ret;
}

HexStringReader.prototype.ReadUInt16  = function() {
	return -1;
}

HexStringReader.prototype.ReadUInt32 = function() {
	return -1;
}

HexStringReader.prototype.ReadUInt64 = function() {
	return -1;
}

//  max = 0x7fffffc7 = 2147483591 (assuming reading from Hex String, instead from bytearray... original is BinaryReader)
HexStringReader.prototype.ReadVarBytes = function (max = 0x7fffffc7) {
	 return this.ReadBytes(this.ReadVarInt(max));
}

// ulong.MaxValue: 0 to 18,446,744,073,709,551,615 (ulong 64-bit)
// fails Number.isSafeInteger(... )
// Number.MAX_SAFE_INTEGER is "only" (2^53 - 1): 9007199254740991
// will use it as limit! (not using external libs such as node-int-64, that also don't support uint64 unfortunately. TODO)
HexStringReader.prototype.ReadVarInt = function (max = Number.MAX_SAFE_INTEGER) {
			var fb = this.ReadByte(); // real byte
			var value = 0; // not ulong, but almost...
			if (fb == 0xFD)
					value = this.ReadUInt16();
			else if (fb == 0xFE)
					value = this.ReadUInt32();
			else if (fb == 0xFF)
					value = this.ReadUInt64();
			else
					value = fb;
			if (value > max) throw new FormatException();
			return value;
}

HexStringReader.prototype.valueOf = function() {
	return this._hexstr;
}

exports.HexStringReader = HexStringReader;
})(typeof exports !== 'undefined' ? exports : this);
