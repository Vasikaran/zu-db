var ZuDatabase = require('../lib/zudb').ZuDatabase;

var db = new ZuDatabase();

db.createConnection('sample', function(err){
	console.log(db.createTable('table1', 'for sample'));
	db.createColumn('column1', 'table1', true);
	db.createColumn('column2', 'table1', true);
	db.createColumn('column3', 'table1', true);
	var obj = {
		name: "Vasi",
		age: 20,
		kd:{
			lan: ['JS','Java']
		}
	}
	db.insert('table1', [obj, obj, obj]);
	db.remove('table1', 'column1', obj);
	db.insert('table1', [obj, obj, obj]);
	console.log(db.getValues('table1', 'key', 'All'));
	console.log(db.getValues('table1', 'column1.name=', 'byKeyName'));
	console.log(db.getValues('table1', 'column1.kd.lan', 'byKeyName'));
	console.log(db.getColumnNames('table1'));
})