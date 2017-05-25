'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createColumn = function createColumn(columnName, tbName, isUnique) {
	var tbPath = _path2.default.resolve(this.dbPath + '/' + tbName + '.txt');
	var table = _fs2.default.readFileSync(tbPath).toString();
	table = JSON.parse(table);

	if (!table[columnName]) {
		var dbPath = _path2.default.resolve(this.dbPath + '/' + this.dbName + '.txt');
		var db = _fs2.default.readFileSync(dbPath).toString();
		db = JSON.parse(db);
		var tables = db['tableNames'];
		tables = tables.filter(function (table) {
			return table['__name'] === tbName;
		});
		var columns = tables[0]['__columns'];
		columns.push(columnName);
		_fs2.default.writeFileSync(dbPath, JSON.stringify(db));
		var data = {
			column: [],
			isUnique: isUnique
		};
		table[columnName] = data;
		_fs2.default.writeFileSync(tbPath, JSON.stringify(table));
		return 'Column created.';
	} else {
		return 'Column already exist.';
	}
};

exports.default = createColumn;