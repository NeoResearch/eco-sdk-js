// Igor M. Coelho, Copyleft 2018 - MIT License
// Neo helper functions in js

(function(exports) {
"use strict";

function HexStringWriter(hexstr = "", autopadding = true) {
	this._autopadd = autopadding;
	var hs = hexstr.toString();
  if(this._autopadd)
	 	hs = HexStringWriter.AddPadding(hs);
	this._hexstr = hs;
}

HexStringWriter._construct = function(hexstr) {
	return new HexStringWriter(hexstr);
};

HexStringWriter.AddPadding = function(hexstr) {
	if(hexstr.length % 2 == 1)
		 return '0'+hexstr;
	return hexstr;
};

// extracts real byte from hex string
HexStringWriter.prototype.WriteByte=function(b = 0x00){
	var sb = b.toString(16);
	if(this._autopadd)
		sb = HexStringWriter.AddPadding(sb);
	this._hexstr += sb;
}

HexStringWriter.prototype.WriteHexString=function(hexstring = ""){
	if(this._autopadd)
		hexstring = HexStringWriter.AddPadding(hexstring);
	this._hexstr += hexstring;
}

//HexStringWriter.prototype.WriteByteArray=function(bytearray = []){
	//return ;//this.ReadBytes(1);
//}

HexStringWriter.prototype.valueOf = function() {
	return this._hexstr;
}

HexStringWriter.prototype.toString = function() {
	return this._hexstr.toString();
}

exports.HexStringWriter = HexStringWriter;
})(typeof exports !== 'undefined' ? exports : this);
