var ZuDatabase = require('../lib/zudb').ZuDatabase;

var db = new ZuDatabase();

// console.log(db.createDatabase('sample'))

db.createConnection('sample', function(err){
	console.log(db.createTable('table1', 'for sample'));
	console.log(db.createColumn('column1', 'table1'));
	console.log(db.insert('table1', 'column1', 'Vasi'));
})


// console.log(db.createTable('table1', 'for sample'))
// console.log(db.createColumn('column1', 'table1', true))
// console.log(db.createColumn('column2', 'table1', false))