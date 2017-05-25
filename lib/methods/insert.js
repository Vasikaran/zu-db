'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insert = function insert(tbName, values) {
	var tbPath = _path2.default.resolve(this.dbPath + '/' + tbName + '.txt');
	var table = _fs2.default.readFileSync(tbPath).toString();
	table = JSON.parse(table);
	var columnNames = Object.keys(table).filter(function (key) {
		return key.search('__') === -1;
	});
	if (columnNames.length > 0) {
		columnNames.forEach(function (name, idx) {
			var column = table[name]['column'];
			if (table[name]['isUnique']) {
				var index = -1;
				var value = JSON.stringify(values[idx]);
				for (var i = 0; i < column.length; i++) {
					if (value === JSON.stringify(column[i])) {
						index = i;
					}
				}
				if (index === -1) {
					column.push(JSON.parse(value));
				} else {
					var err = 'Dublicate entry in ' + name + ' column';
					throw new Error(err);
				}
			} else {
				column.push(values[idx]);
			}
		});
		_fs2.default.writeFileSync(tbPath, JSON.stringify(table));
		return 'Data added';
	}
	return "Column doesn't exist.";
};

exports.default = insert;