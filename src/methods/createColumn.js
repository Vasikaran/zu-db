import fs from 'fs';
import path from 'path';

let createColumn = function(columnName, tbName, isUnique){
	let tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
	let table = fs.readFileSync(tbPath).toString();
	table = JSON.parse(table);

	if (!table[columnName]){
		let dbPath = path.resolve(this.dbPath + '/' + this.dbName + '.txt');
		let db = fs.readFileSync(dbPath).toString();
		db = JSON.parse(db);
		let tables = db['tableNames'];
		tables = tables.filter(table=>{
			return table['__name'] === tbName;
		})
		let columns = tables[0]['__columns'];
		columns.push(columnName);
		fs.writeFileSync(dbPath, JSON.stringify(db));
		let data = {
			column: [],
			isUnique: isUnique
		};
		table[columnName] = data;
		fs.writeFileSync(tbPath, JSON.stringify(table));
		return 'Column created.';
	}else{
		return 'Column already exist.'
	}
}

export default createColumn;