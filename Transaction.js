// Neo helper functions in js
// Igor M. Coelho, Copyleft 2018 - MIT License

(function(exports) {
"use strict";

const HexStringReader = require('./HexStringReader').HexStringReader;
const HexStringWriter = require('./HexStringWriter').HexStringWriter;

function Transaction(ttype, version, message, attributes = [], inputs = [], outputs = [], witnesses = [], fee = 0.0) {
	this._ttype = ttype; // transaction type: byte
	this._version = version; // byte
	this._message = message; // byte
	this._attributes = attributes; // array of hexstring
	this._inputs = inputs; // array of hexstring
	this._outputs = outputs; // array of hexstring
	this._witnesses = witnesses; // array of hexstring
	this._fee = fee; // network fee
}

Transaction._construct = function(ttype, version, message="") {
	return new Transaction(ttype, version, message);
};

// extracts real byte from hex string
Transaction.prototype.ReadByte=function(){
	return parseInt(this.ReadHexByte(), 16);
}

Transaction.SerializeExclusiveData = function(hexwriter) {
}

Transaction.prototype.valueOf = function() {
	var writer = new HexStringWriter();
	this.Serialize(writer);
	return writer.valueOf();
}

Transaction.prototype.Serialize = function(writer) {
	writer.WriteByte(this._ttype);
	writer.WriteByte(this._version);
	Transaction.SerializeExclusiveData(writer);
	for(var i=0; i<this._attributes.length; i++)
		this._attributes[i].Serialize(writer);
	for(var i=0; i<this._inputs.length; i++)
    this._inputs[i].Serialize(writer);
	for(var i=0; i<this._outputs.length; i++)
    this._outputs[i].Serialize(writer);

	return writer.valueOf();
}

//InvocationTransaction.prototype = new Transaction();


exports.Transaction = Transaction;
})(typeof exports !== 'undefined' ? exports : this);

//module.exports = csBigInteger;
