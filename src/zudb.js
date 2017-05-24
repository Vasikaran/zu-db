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
		this.insert = this.insert.bind(this);
		this.remove = this.remove.bind(this);
		this.getValues = this.getValues.bind(this);
	}

	createConnection(dbName, callback){
		this.dbName = dbName;
		this.dbPath = path.resolve(__dirname, '../docs/db/' + dbName);
		this.createDatabase();
		return callback();
	}

	createDatabase(){
		if (!fs.existsSync(this.dbPath)){
			let dbObj = {
				name: this.dbName,
				tableNames: []
			};
		    fs.mkdirSync(this.dbPath);
			let dbPath = path.resolve(this.dbPath + '/' +this.dbName + '.txt');
			fs.writeFileSync(dbPath, JSON.stringify(dbObj));
			return 'Database created successfully.';
		}
	}

	createTable(tbName, desc){
		let dbPath = path.resolve(this.dbPath + '/' + this.dbName + '.txt');
		let db = fs.readFileSync(dbPath).toString();
		db = JSON.parse(db);
		db['tableNames'].push({
			name: tbName
		});
		fs.writeFileSync(dbPath, JSON.stringify(db));
		let table = {
			__name: tbName,
			__desc: desc
		}
		let filePath = path.resolve(this.dbPath + '/' + tbName + '.txt');
		let tablePath = fs.writeFileSync(filePath , JSON.stringify(table));
		return 'Table created.';
	}

	createColumn(columnName, tbName, isUnique){
		let tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
		let table = fs.readFileSync(tbPath).toString();
		table = JSON.parse(table);
		if (!table[columnName]){
			let data = [];
			table[columnName] = data;
			table['isUnique'] = isUnique;
			fs.writeFileSync(tbPath, JSON.stringify(table));
			return 'Column created.';
		}else{
			return 'Column already exist.'
		}
	}

	insert(tbName, columnName, value){
		let tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
		let table = fs.readFileSync(tbPath).toString();
		table = JSON.parse(table);
		let column = table[columnName];
		if(column){
			if (table['isUnique']){
				value = JSON.stringify(value);
				if (column.indexOf(value) === -1){
					column.push(JSON.stringify(value));
					fs.writeFileSync(tbPath, JSON.stringify(table));
					return 'Data added';
				}
				return 'Duplicate entry';
			}else if (!table['isUnique']){
				value = JSON.stringify(value);
				column.push(JSON.stringify(value));
				fs.writeFileSync(tbPath, JSON.stringify(table));
				return 'Data added';
			}
		}
		return "Column doesn't exist.";
	}

	remove(tbName, columnName, value){
		let tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
		let table = fs.readFileSync(tbPath).toString();
		table = JSON.parse(table);
		let column = table[columnName];
		if(column){
			value = JSON.stringify(value);
			if (column.indexOf(value) !== -1){
				column.splice(column.indexOf(value), 1);
				fs.writeFileSync(tbPath, JSON.stringify(table));
				return 'Data removed';
			}
			return 'Data not found';
		}
		return "Column doesn't exist.";
	}

	getValues(tbName, columnName, keys, condition = 'All'){
		let tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
		let table = fs.readFileSync(tbPath).toString();
		table = JSON.parse(table);
		let column = table[columnName];
		if(column){
			if (condition === 'All'){
				return column.map(value=>{
					return JSON.parse(JSON.parse(value));
				});
			}else if(condition === 'byKeyName'){
				keys = keys.split('.');
				let values = column.map(value=>{
					value = JSON.parse(JSON.parse(value));
					let val = keys.reduce((obj, key)=>{
						return obj[key]
					},value)
					return val;
				})
				return values;
			}
			return 'Data not found';
		}
		return "Column doesn't exist.";
	}
}