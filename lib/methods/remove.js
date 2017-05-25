'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var remove = function remove(tbName, columnName, value) {
	var tbPath = _path2.default.resolve(this.dbPath + '/' + tbName + '.txt');
	var table = _fs2.default.readFileSync(tbPath).toString();
	table = JSON.parse(table);
	var columnNames = Object.keys(table).filter(function (key) {
		return key.search('__') === -1;
	});
	if (columnNames.length > 0) {
		if (columnNames.indexOf(columnName) !== -1) {
			var column = table[columnName]['column'];
			var index = -1;
			value = JSON.stringify(value);
			for (var i = 0; i < column.length; i++) {
				if (value === JSON.stringify(column[i])) {
					index = i;
				}
			}
			if (index !== -1) {
				columnNames.forEach(function (name) {
					table[name]['column'].splice(index, 1);
				});
			} else {
				var err = 'Value not found.';
				throw new Error(err);
			}
			_fs2.default.writeFileSync(tbPath, JSON.stringify(table));
			return 'Data removed.';
		} else {
			var _err = 'Column ' + columnName + ' not found.';
			throw new Error(_err);
		}
	}
	return "Column doesn't exist.";
};

exports.default = remove;