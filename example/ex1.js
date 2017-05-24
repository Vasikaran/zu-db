var ZuDatabase = require('../lib/zudb').ZuDatabase;

var db = new ZuDatabase();

// console.log(db.createDatabase('sample'))

db.createConnection('sample', function(err){
	db.createTable('table1', 'for sample');
	db.createColumn('column1', 'table1', false);
	var obj = {
		name: "Vasi",
		age: 20
	}
	db.insert('table1', 'column1', obj);
	// db.remove('table1', 'column1', obj);
	console.log(db.getValues('table1', 'column1', 'key', 'All'));
	console.log(db.getValues('table1', 'column1', 'name', 'byKeyName'));
})


// console.log(db.createTable('table1', 'for sample'))
// console.log(db.createColumn('column1', 'table1', true))
// console.log(db.createColumn('column2', 'table1', false))