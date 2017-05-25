import fs from 'fs';
import path from 'path';

let update = function(tbName, columnName, value, condition){
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

export default update;