import fs from 'fs';
import path from 'path';

import createTable from './methods/createTable';
import createColumn from './methods/createColumn';
import insert from './methods/insert';
import remove from './methods/remove';
import update from './methods/update';
import getValues from './methods/getValues';
import getColumnNames from './methods/getColumnNames';

export class ZuDatabase{
	constructor(props) {
		this.createConnection = this.createConnection.bind(this);
		this.createDatabase = this.createDatabase.bind(this);
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
}

ZuDatabase.prototype.createTable = createTable;
ZuDatabase.prototype.createColumn = createColumn;
ZuDatabase.prototype.insert = insert;
ZuDatabase.prototype.remove = remove;
ZuDatabase.prototype.update = update;
ZuDatabase.prototype.getValues = getValues;
ZuDatabase.prototype.getColumnNames = getColumnNames;