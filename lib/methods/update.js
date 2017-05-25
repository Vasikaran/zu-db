'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var update = function update(tbName, columnName, value, condition) {
	var tbPath = _path2.default.resolve(this.dbPath + '/' + tbName + '.txt');
	var table = _fs2.default.readFileSync(tbPath).toString();
	table = JSON.parse(table);
	var column = table[columnName];
	if (column) {
		value = JSON.stringify(value);
		if (column.indexOf(value) !== -1) {
			column.splice(column.indexOf(value), 1);
			_fs2.default.writeFileSync(tbPath, JSON.stringify(table));
			return 'Data removed';
		}
		return 'Data not found';
	}
	return "Column doesn't exist.";
};

exports.default = update;