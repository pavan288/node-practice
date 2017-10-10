var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/index.htm',function(req,res){
	res.sendFile( __dirname+"/"+"index.htm");
});

app.get('/totalRows',function(req,res){
	MongoClient.connect("mongodb://localhost:27017/test",function(err,db){
		db.collection('test').count(function(err,count){
			if (err) throw err
				console.log("Total Rows:" + count);
			response = {
				TotalRows: count
			}
			res.json(response);
		})
	})
})

app.post('/process_post', urlencodedParser, function(req,res){
	response = {
		first_name:req.body.first_name,
		last_name:req.body.last_name
	};
	MongoClient.connect("mongodb://localhost:27017/test",function(err,db){
		if (err) {
		 console.log("Could not connect to db!");
		 process.exit(1);
		}
		db.collection('test',function(err,collection){
			collection.insert({firstname: response.first_name,lastname: response.last_name});

			db.collection('test').count(function(err,count){
				if (err) throw err;

				console.log('Total rows: '+count)
			});
			db.collection('test').find().toArray(function(err,items){
				if(err) throw err;
				console.log(items);
			});
		});

	});
	console.log(response);
	res.send(JSON.stringify(response));
});

app.delete('/deleteUsers/:name',function(req,res){
	 res.send('Got a DELETE request at /user')
  MongoClient.connect("mongodb://localhost:27017/test",function(err,db){
		db.collection('test').remove({"firstname":req.params.name});

		db.collection('test').count(function(err,count){
				if (err) throw err;

				console.log('Total rows: '+count)
			});
	});
});
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
  MongoClient.connect("mongodb://localhost:27017/test",function(err,db){
		db.collection('test').remove({"firstname":"asdf"});

		db.collection('test').count(function(err,count){
				if (err) throw err;

				console.log('Total rows: '+count)
			});
	});
})

app.put('/updateFirstnameWith/:name',function(req,res){
	res.send('Got a DELETE request at /updateFirstnameWith')
	MongoClient.connect("mongodb://localhost:27017/test",function(err,db){
		db.collection('test').update({'firstname':'asdf'},{$set:{'firstname':'Pavan'}},function(err,result){
			if (err) throw err
				console.log('Doc updated successfully!');
		});
	})
})
var server = app.listen(8081,function(){
	var host =server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s",host,port)
})