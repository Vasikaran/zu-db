var fs = require('fs');
var path = require('path');
var readline = require('readline');
var stream = require('stream');

export class ZuDatabase{
	constructor(props) {
		this.createConnection = this.createConnection.bind(this);
		this.createDatabase = this.createDatabase.bind(this);
		this.createTable = this.createTable.bind(this);
		this.createColumn = this.createColumn.bind(this);
		this.readAndWrite = this.readAndWrite.bind(this);
		this.insert = this.insert.bind(this);
		this.read = this.read.bind(this);
	}

	read(){
		let instream = fs.createReadStream(this.dbPath);
		let outstream = new stream;
		let rl = readline.createInterface(instream, outstream);
		let db;
		rl.on('line', function(line) {
			db = line;
		});
		rl.on('close', function() {
			return db;
		});
	}

	readAndWrite(logicFun, callback, message){
		let instream = fs.createReadStream(this.dbPath);
		let outstream = new stream;
		let rl = readline.createInterface(instream, outstream);
		let dbPath = this.dbPath;
		let db;
		rl.on('line', function(line) {
			db = line;
		});
		rl.on('close', function() {
			db = logicFun(db);
			let wstream = fs.createWriteStream(dbPath);
			wstream.write(JSON.stringify(db));
			wstream.end(function(err){
				if (!err){
					callback(null, message);
				}
			});
		});
	}

	createConnection(dbName, callback){
		this.dbName = dbName;
		this.dbPath = path.resolve(__dirname, '../doc/db/' + dbName + '.txt');
		this.createDatabase();
		return callback();
	}

	createDatabase(){
		let dbObj = {name: this.dbName};
		fs.writeFileSync(this.dbPath, JSON.stringify(dbObj));
		return 'Database created successfully.';
	}

	createTable(tbName, desc, callback){
		let db = fs.readFileSync(this.dbPath).toString();
		db = JSON.parse(db);
		db[tbName] = {
			__desc: desc
		}
		fs.writeFileSync(this.dbPath, JSON.stringify(db));
		return 'Table created.';
	}

	createColumn(columnName, tbName, callback){
		let db = fs.readFileSync(this.dbPath).toString();
		db = JSON.parse(db);
		if (db[tbName]){
			let data = [];
			db[tbName][columnName] = data;
		}
		fs.writeFileSync(this.dbPath, JSON.stringify(db));
		return 'Column created.';
	}

	insert(tbName, columnName, value, callback){
		let db = fs.readFileSync(this.dbPath).toString();
		db = JSON.parse(db);
		if(db[tbName][columnName]){
			db[tbName][columnName].push(value);
		}
		fs.writeFileSync(this.dbPath, JSON.stringify(db));
		return 'Value added';
	}
}