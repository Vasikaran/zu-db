import fs from 'fs';
import path from 'path';

let getValues = function(tbName, keys, condition = 'All'){
	let tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
	let table = fs.readFileSync(tbPath).toString();
	table = JSON.parse(table);
	let columnNames = Object.keys(table).filter(key=>{
		return key.search('__') === -1;
	})
	if(columnNames.length > 0){
		if (condition === 'All'){
			let columns = columnNames.map(name=>{
				table[name]['column'];
			})
			return columns;
		}else if (condition === 'byKeyName'){
			let paths = keys.split('.');
			if (columnNames.indexOf(paths[0]) !== -1){
				let column = table[paths[0]]['column'];
				let index = -1;
				let value = JSON.stringify(value);
				for (let i=0; i<column.length; i++){
					if (value === JSON.stringify(column[i])){
						index = i;
					}
				}
				if (index !== -1){
					let datas = columnNames.reduce((datas, name)=>{
						datas.push(table[name]['column'][index])
					}, [])
					return datas;
				}else{
					let err = 'Value not found.';
					throw new Error(err);
				}
			}else{
				let err = 'Column ' + columnName + ' not found.'
				throw new Error(err);
			}
		}
	}
	return "Column doesn't exist.";
}

export default getValues;