'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ZuDatabase = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _createTable = require('./methods/createTable');

var _createTable2 = _interopRequireDefault(_createTable);

var _createColumn = require('./methods/createColumn');

var _createColumn2 = _interopRequireDefault(_createColumn);

var _insert = require('./methods/insert');

var _insert2 = _interopRequireDefault(_insert);

var _remove = require('./methods/remove');

var _remove2 = _interopRequireDefault(_remove);

var _update = require('./methods/update');

var _update2 = _interopRequireDefault(_update);

var _getValues = require('./methods/getValues');

var _getValues2 = _interopRequireDefault(_getValues);

var _getColumnNames = require('./methods/getColumnNames');

var _getColumnNames2 = _interopRequireDefault(_getColumnNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ZuDatabase = exports.ZuDatabase = function () {
	function ZuDatabase(props) {
		_classCallCheck(this, ZuDatabase);

		this.createConnection = this.createConnection.bind(this);
		this.createDatabase = this.createDatabase.bind(this);
	}

	_createClass(ZuDatabase, [{
		key: 'createConnection',
		value: function createConnection(dbName, callback) {
			this.dbName = dbName;
			this.dbPath = _path2.default.resolve(__dirname, '../docs/db/' + dbName);
			this.createDatabase();
			return callback();
		}
	}, {
		key: 'createDatabase',
		value: function createDatabase() {
			if (!_fs2.default.existsSync(this.dbPath)) {
				var dbObj = {
					name: this.dbName,
					tableNames: []
				};
				_fs2.default.mkdirSync(this.dbPath);
				var dbPath = _path2.default.resolve(this.dbPath + '/' + this.dbName + '.txt');
				_fs2.default.writeFileSync(dbPath, JSON.stringify(dbObj));
				return 'Database created successfully.';
			}
		}
	}]);

	return ZuDatabase;
}();

ZuDatabase.prototype.createTable = _createTable2.default;
ZuDatabase.prototype.createColumn = _createColumn2.default;
ZuDatabase.prototype.insert = _insert2.default;
ZuDatabase.prototype.remove = _remove2.default;
ZuDatabase.prototype.update = _update2.default;
ZuDatabase.prototype.getValues = _getValues2.default;
ZuDatabase.prototype.getColumnNames = _getColumnNames2.default;