var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var user = {
	"user4":{
		"name" : "pavan",
		"password": "password4",
		"profession" : "intern",
		"id" : 4
	}
}

app.get('/listUsers',function(req,res){
	fs.readFile(__dirname+"/"+"users.json",'utf8',function(err,data){
		console.log(data);
		res.end(data);
	});
})

app.post('/addUser',function(req,res){
	fs.readFile(__dirname+"/"+"users.json",'utf8',function(err,data){
			data = JSON.parse(data);
			data["user4"] = user["user4"];
			console.log(data);
			res.end(JSON.stringify(data));
	});
})

app.get('/showUser/:id',function(req,res){
	fs.readFile(__dirname+"/"+"users.json",'utf8',function(err,data){
		var users = JSON.parse(data);
		var user = users["user"+req.params.id]
		console.log(user);
		res.end(JSON.stringify(user))
	});
})

app.delete('/deleteUser/:id', function(req,res){
	fs.readFile(__dirname+"/"+"users.json",'utf8',function(err,data){
		data = JSON.parse(data);
		delete data["user"+3];
		console.log(data);
		res.end(JSON.stringify(data));
	});
})

var server = app.listen(8081,function(){

	var host = server.address().address
	//console.log(host);
	var port = server.address().port
	//console.log(host);
	console.log("Example app listening at http://%s:%s",host,port)
})