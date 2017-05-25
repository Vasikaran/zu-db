import fs from 'fs';
import path from 'path';

let insert = function(tbName, values){
	let tbPath = path.resolve(this.dbPath + '/' + tbName + '.txt');
	let table = fs.readFileSync(tbPath).toString();
	table = JSON.parse(table);
	let columnNames = Object.keys(table).filter(key=>{
		return key.search('__') === -1;
	})
	if(columnNames.length > 0){
		columnNames.forEach((name, idx)=>{
			let column = table[name]['column'];
			if(table[name]['isUnique']){
				let index = -1;
				let value = JSON.stringify(values[idx]);
				for (let i=0; i<column.length; i++){
					if (value === JSON.stringify(column[i])){
						index = i;
					}
				}
				if (index === -1){
					column.push(JSON.parse(value));
				}else{
					let err = 'Dublicate entry in ' + name + ' column';
					throw new Error(err);
				}

			}else{
				column.push(values[idx]);
			}
		})
		fs.writeFileSync(tbPath, JSON.stringify(table));
		return 'Data added';
	}
	return "Column doesn't exist.";
}

export default insert;