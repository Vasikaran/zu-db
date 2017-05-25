'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getValues = function getValues(tbName, keys) {
	var condition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'All';

	var tbPath = _path2.default.resolve(this.dbPath + '/' + tbName + '.txt');
	var table = _fs2.default.readFileSync(tbPath).toString();
	table = JSON.parse(table);
	var columnNames = Object.keys(table).filter(function (key) {
		return key.search('__') === -1;
	});
	if (columnNames.length > 0) {
		if (condition === 'All') {
			var columns = columnNames.map(function (name) {
				table[name]['column'];
			});
			return columns;
		} else if (condition === 'byKeyName') {
			var paths = keys.split('.');
			if (columnNames.indexOf(paths[0]) !== -1) {
				var column = table[paths[0]]['column'];
				var index = -1;
				value = JSON.stringify(value);
				for (var i = 0; i < column.length; i++) {
					if (value === JSON.stringify(column[i])) {
						index = i;
					}
				}
				if (index !== -1) {
					var datas = columnNames.reduce(function (datas, name) {
						datas.push(table[name]['column'][index]);
					}, []);
					return datas;
				} else {
					var err = 'Value not found.';
					throw new Error(err);
				}
			} else {
				var _err = 'Column ' + columnName + ' not found.';
				throw new Error(_err);
			}
		}
	}
	return "Column doesn't exist.";
};

exports.default = getValues;