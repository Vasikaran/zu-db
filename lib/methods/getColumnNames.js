'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getColumnNames = function getColumnNames(tbName) {
	var dbPath = _path2.default.resolve(this.dbPath + '/' + this.dbName + '.txt');
	var db = _fs2.default.readFileSync(dbPath).toString();
	db = JSON.parse(db);
	var tableNames = db['tableNames'];
	var columns = tableNames.filter(function (table) {
		return table.__name === tbName;
	});
	return columns;
};

exports.default = getColumnNames;