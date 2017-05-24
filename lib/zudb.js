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
		this.readAndWrite = this.readAndWrite.bind(this);
		this.insert = this.insert.bind(this);
		this.read = this.read.bind(this);
	}

	_createClass(ZuDatabase, [{
		key: 'read',
		value: function read() {
			var instream = fs.createReadStream(this.dbPath);
			var outstream = new stream();
			var rl = readline.createInterface(instream, outstream);
			var db = void 0;
			rl.on('line', function (line) {
				db = line;
			});
			rl.on('close', function () {
				return db;
			});
		}
	}, {
		key: 'readAndWrite',
		value: function readAndWrite(logicFun, callback, message) {
			var instream = fs.createReadStream(this.dbPath);
			var outstream = new stream();
			var rl = readline.createInterface(instream, outstream);
			var dbPath = this.dbPath;
			var db = void 0;
			rl.on('line', function (line) {
				db = line;
			});
			rl.on('close', function () {
				db = logicFun(db);
				var wstream = fs.createWriteStream(dbPath);
				wstream.write(JSON.stringify(db));
				wstream.end(function (err) {
					if (!err) {
						callback(null, message);
					}
				});
			});
		}
	}, {
		key: 'createConnection',
		value: function createConnection(dbName, callback) {
			this.dbName = dbName;
			this.dbPath = path.resolve(__dirname, '../doc/db/' + dbName + '.txt');
			this.createDatabase();
			return callback();
		}
	}, {
		key: 'createDatabase',
		value: function createDatabase() {
			var dbObj = { name: this.dbName };
			fs.writeFileSync(this.dbPath, JSON.stringify(dbObj));
			return 'Database created successfully.';
		}
	}, {
		key: 'createTable',
		value: function createTable(tbName, desc, callback) {
			var db = fs.readFileSync(this.dbPath).toString();
			db = JSON.parse(db);
			db[tbName] = {
				__desc: desc
			};
			fs.writeFileSync(this.dbPath, JSON.stringify(db));
			return 'Table created.';
		}
	}, {
		key: 'createColumn',
		value: function createColumn(columnName, tbName, callback) {
			var db = fs.readFileSync(this.dbPath).toString();
			db = JSON.parse(db);
			if (db[tbName]) {
				var data = [];
				db[tbName][columnName] = data;
			}
			fs.writeFileSync(this.dbPath, JSON.stringify(db));
			return 'Column created.';
		}
	}, {
		key: 'insert',
		value: function insert(tbName, columnName, value, callback) {
			var db = fs.readFileSync(this.dbPath).toString();
			db = JSON.parse(db);
			if (db[tbName][columnName]) {
				db[tbName][columnName].push(value);
			}
			fs.writeFileSync(this.dbPath, JSON.stringify(db));
			return 'Value added';
		}
	}]);

	return ZuDatabase;
}();