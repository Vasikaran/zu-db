'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTable = function createTable(tbName, desc) {
	var dbPath = _path2.default.resolve(this.dbPath + '/' + this.dbName + '.txt');
	var db = _fs2.default.readFileSync(dbPath).toString();
	db = JSON.parse(db);
	var tb = db['tableNames'].filter(function (name) {
		return name['__name'] === tbName;
	});
	if (tb.length === 0) {
		var obj = {
			__name: tbName,
			__columns: []
		};
		db['tableNames'].push(obj);
		_fs2.default.writeFileSync(dbPath, JSON.stringify(db));
		var table = {
			__name: tbName,
			__desc: desc,
			__columns: []
		};
		var filePath = _path2.default.resolve(this.dbPath + '/' + tbName + '.txt');
		_fs2.default.writeFileSync(filePath, JSON.stringify(table));
		return 'Table created.';
	} else {
		return 'Table already exist.';
	}
};

exports.default = createTable;