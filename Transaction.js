// Neo helper functions in js
// Igor M. Coelho, Copyleft 2018 - MIT License

(function(exports) {
"use strict";

const HexStringReader = require('./HexStringReader').HexStringReader;
const HexStringWriter = require('./HexStringWriter').HexStringWriter;

const csBigInteger = require('csbiginteger').csBigInteger;
const csFixed8     = require('csbiginteger').csFixed8;

function Transaction(ttype, version, message, attributes = [], inputs = [], outputs = [], witnesses = [], netfee = new csFixed8(-0.00000001), systemfee = csFixed8.Zero) {
	this._ttype = ttype; // transaction type: byte
	this._version = version; // byte
	this._message = message; // byte
	this._attributes = attributes; // array of hexstring
	this._inputs = inputs; // array of hexstring
	this._outputs = outputs; // array of hexstring
	this._witnesses = witnesses; // array of hexstring
	this._netfee = netfee; // network fee
	this._systemfee = systemfee; // system fee
}

Transaction._construct = function(ttype, version, message="") {
	return new Transaction(ttype, version, message);
};

// extracts real byte from hex string
Transaction.prototype.ReadByte=function(){
	return parseInt(this.ReadHexByte(), 16);
}

Transaction.prototype.SerializeExclusiveData = function(hexwriter) {
}

Transaction.prototype.valueOf = function() {
	var writer = new HexStringWriter();
	this.Serialize(writer);
	return writer.valueOf();
}

Transaction.prototype.Serialize = function(writer) {
	writer.WriteByte(this._ttype);
	writer.WriteByte(this._version);
	this.SerializeExclusiveData(writer);
	for(var i=0; i<this._attributes.length; i++)
		this._attributes[i].Serialize(writer);
	for(var i=0; i<this._inputs.length; i++)
    this._inputs[i].Serialize(writer);
	for(var i=0; i<this._outputs.length; i++)
    this._outputs[i].Serialize(writer);

	return writer.valueOf();
}

// ====================================================
//               InvocationTransaction
// ====================================================

function InvocationTransaction(ttype, version, message, attributes = [], inputs = [], outputs = [], witnesses = [], netfee = 0.0, systemfee = 0.0, gas = new csFixed8(0.0)) {
	this._ttype = ttype; // transaction type: byte
	this._version = version; // byte
	this._message = message; // byte
	this._attributes = attributes; // array of hexstring
	this._inputs = inputs; // array of hexstring
	this._outputs = outputs; // array of hexstring
	this._witnesses = witnesses; // array of hexstring
	this._netfee = netfee; // network fee
	this._systemfee = systemfee; // system fee
}

InvocationTransaction._construct = function(ttype, version, message="") {
	return new InvocationTransaction(ttype, version, message);
};

InvocationTransaction.prototype = new Transaction();

Transaction.prototype.SerializeExclusiveData = function(hexwriter) {

}




exports.Transaction = Transaction;
})(typeof exports !== 'undefined' ? exports : this);

//module.exports = csBigInteger;
