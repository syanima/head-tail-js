var assert=require('assert');
var lib=require('./module3.js');
var test={};
exports.test=test;

test["Seperate options and files"] = function() {
	var exepected={options:["-3","-2"],count:["-2"],files:["file.txt"]}
	assert.deepEqual(exepected,lib.seperator(["-3","-2","file.txt"]))
}

test["Seperate options and files when there is no option"] = function() {
	var exepected={options:[],count:[],files:["3","2","file.txt"]}
	assert.deepEqual(exepected,lib.seperator(["3","2","file.txt"]))
}

test["Seperate options and files when num is given as file"] = function() {
	var exepected={options:["-3","-2"],count:["-2"],files:["4","file.txt"]}
	assert.deepEqual(exepected,lib.seperator(["-3","-2","4","file.txt"]))
}

test["Seperate options and files when illegal command is passed"] = function() {
	var exepected={options:["--3","-2"],count:["-2"],files:["file.txt"]}
	assert.deepEqual(exepected,lib.seperator(["--3","-2","file.txt"]))
}

test["Make complete data"]=function(){
	var expected=[["README.txt","Implement head and tail."]];
	assert.deepEqual(expected,lib.makeData(["-2","README.txt"]));
}

test["Make complete data if no option given"]=function(){
	var expected=[[ 'file not exist' ],["README.txt","Implement head and tail."]];
	assert.deepEqual(expected,lib.makeData(["2","README.txt"]));
}

test["Make complete data for wrong option"]=function(){
	var expected=["illegal command -- -"];
	assert.deepEqual(expected,lib.makeData(["--2","README.txt"]));
}

test["Make complete data for one file"]=function(){
	var expected=[["headAndTail.js","var m1=require('./module1.js');\nvar m2=require('./module2.js');"]];
	assert.deepEqual(expected,lib.makeData(["-2","headAndTail.js"]));
}

test["Make complete data for two files"]=function(){
	var expected= [['README.txt','Implement head and tail.'],['headAndTail.js',
    "var m1=require('./module1.js');\nvar m2=require('./module2.js');"]]
	assert.deepEqual(expected,lib.makeData(["-2","README.txt","headAndTail.js"]));
}