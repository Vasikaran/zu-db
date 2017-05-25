import fs from 'fs';
import path from 'path';

let remove = function(tbName, columnName, value){
	let tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
	let table = fs.readFileSync(tbPath).toString();
	table = JSON.parse(table);
	let columnNames = Object.keys(table).filter(key=>{
		return key.search('__') === -1;
	})
	if(columnNames.length > 0){
		if (columnNames.indexOf(columnName) !== -1){
			let column = table[columnName]['column'];
			let index = -1;
			value = JSON.stringify(value);
			for (let i=0; i<column.length; i++){
				if (value === JSON.stringify(column[i])){
					index = i;
				}
			}
			if (index !== -1){
				columnNames.forEach(name=>{
					table[name]['column'].splice(index, 1);
				})
			}else{
				let err = 'Value not found.';
				throw new Error(err);
			}
			fs.writeFileSync(tbPath, JSON.stringify(table));
			return 'Data removed.';
		}else{
			let err = 'Column ' + columnName + ' not found.'
			throw new Error(err);
		}
	}
	return "Column doesn't exist.";
}

export default remove;