import fs from 'fs';
import path from 'path';

let createTable = function(tbName, desc){
	let dbPath = path.resolve(this.dbPath + '/' + this.dbName + '.txt');
	let db = fs.readFileSync(dbPath).toString();
	db = JSON.parse(db);
	let tb = db['tableNames'].filter(name=>{
		return name['__name'] === tbName;
 	})
	if (tb.length === 0){
		let obj = {
			__name: tbName,
			__columns: []
		}
		db['tableNames'].push(obj);
		fs.writeFileSync(dbPath, JSON.stringify(db));
		let table = {
			__name: tbName,
			__desc: desc,	
			__columns:[]
		}
		let filePath = path.resolve(this.dbPath + '/' + tbName + '.txt');
		fs.writeFileSync(filePath , JSON.stringify(table));
		return 'Table created.';
	}else{
		return 'Table already exist.'
	}
}

export default createTable;