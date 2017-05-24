'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');
var readline = require('readline');
var stream = require('stream');

var ZuDatabase = exports.ZuDatabase = function () {
	function ZuDatabase(props) {
		_classCallCheck(this, ZuDatabase);

		this.createConnection = this.createConnection.bind(this);
		this.createDatabase = this.createDatabase.bind(this);
		this.createTable = this.createTable.bind(this);
		this.createColumn = this.createColumn.bind(this);
		this.insert = this.insert.bind(this);
		this.remove = this.remove.bind(this);
		this.getValues = this.getValues.bind(this);
	}

	_createClass(ZuDatabase, [{
		key: 'createConnection',
		value: function createConnection(dbName, callback) {
			this.dbName = dbName;
			this.dbPath = path.resolve(__dirname, '../docs/db/' + dbName);
			this.createDatabase();
			return callback();
		}
	}, {
		key: 'createDatabase',
		value: function createDatabase() {
			if (!fs.existsSync(this.dbPath)) {
				var dbObj = {
					name: this.dbName,
					tableNames: []
				};
				fs.mkdirSync(this.dbPath);
				var dbPath = path.resolve(this.dbPath + '/' + this.dbName + '.txt');
				fs.writeFileSync(dbPath, JSON.stringify(dbObj));
				return 'Database created successfully.';
			}
		}
	}, {
		key: 'createTable',
		value: function createTable(tbName, desc) {
			var dbPath = path.resolve(this.dbPath + '/' + this.dbName + '.txt');
			var db = fs.readFileSync(dbPath).toString();
			db = JSON.parse(db);
			db['tableNames'].push({
				name: tbName
			});
			fs.writeFileSync(dbPath, JSON.stringify(db));
			var table = {
				__name: tbName,
				__desc: desc
			};
			var filePath = path.resolve(this.dbPath + '/' + tbName + '.txt');
			var tablePath = fs.writeFileSync(filePath, JSON.stringify(table));
			return 'Table created.';
		}
	}, {
		key: 'createColumn',
		value: function createColumn(columnName, tbName, isUnique) {
			var tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
			var table = fs.readFileSync(tbPath).toString();
			table = JSON.parse(table);
			if (!table[columnName]) {
				var data = [];
				table[columnName] = data;
				table['isUnique'] = isUnique;
				fs.writeFileSync(tbPath, JSON.stringify(table));
				return 'Column created.';
			} else {
				return 'Column already exist.';
			}
		}
	}, {
		key: 'insert',
		value: function insert(tbName, columnName, value) {
			var tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
			var table = fs.readFileSync(tbPath).toString();
			table = JSON.parse(table);
			var column = table[columnName];
			if (column) {
				if (table['isUnique']) {
					value = JSON.stringify(value);
					if (column.indexOf(value) === -1) {
						column.push(JSON.stringify(value));
						fs.writeFileSync(tbPath, JSON.stringify(table));
						return 'Data added';
					}
					return 'Duplicate entry';
				} else if (!table['isUnique']) {
					value = JSON.stringify(value);
					column.push(JSON.stringify(value));
					fs.writeFileSync(tbPath, JSON.stringify(table));
					return 'Data added';
				}
			}
			return "Column doesn't exist.";
		}
	}, {
		key: 'remove',
		value: function remove(tbName, columnName, value) {
			var tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
			var table = fs.readFileSync(tbPath).toString();
			table = JSON.parse(table);
			var column = table[columnName];
			if (column) {
				value = JSON.stringify(value);
				if (column.indexOf(value) !== -1) {
					column.splice(column.indexOf(value), 1);
					fs.writeFileSync(tbPath, JSON.stringify(table));
					return 'Data removed';
				}
				return 'Data not found';
			}
			return "Column doesn't exist.";
		}
	}, {
		key: 'getValues',
		value: function getValues(tbName, columnName, keys) {
			var condition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'All';

			var tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
			var table = fs.readFileSync(tbPath).toString();
			table = JSON.parse(table);
			var column = table[columnName];
			if (column) {
				if (condition === 'All') {
					return column.map(function (value) {
						return JSON.parse(JSON.parse(value));
					});
				} else if (condition === 'byKeyName') {
					keys = keys.split('.');
					var values = column.map(function (value) {
						value = JSON.parse(JSON.parse(value));
						var val = keys.reduce(function (obj, key) {
							return obj[key];
						}, value);
						return val;
					});
					return values;
				}
				return 'Data not found';
			}
			return "Column doesn't exist.";
		}
	}]);

	return ZuDatabase;
}();