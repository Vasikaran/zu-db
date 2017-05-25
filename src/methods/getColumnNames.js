import fs from 'fs';
import path from 'path';

let getColumnNames = function(tbName){
	let dbPath = path.resolve(this.dbPath + '/' + this.dbName + '.txt');
	let db = fs.readFileSync(dbPath).toString();
	db = JSON.parse(db);
	let tableNames = db['tableNames'];
	let columns = tableNames.filter(table=>{
		return table.__name === tbName
	})
	return columns
}

export default getColumnNames;