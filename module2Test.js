var assert=require('assert');
var test={};
var lib=require('./module2.js');
exports.test=test;

test["Seperate options & commands"] = function() {
	var expected={options:["-n2"],count:["2"],files:["file1","file2"]};
	assert.deepEqual(expected,lib.seperator(["-n2","file1","file2"]));
}

test["Seperate options & commands for more arguments"] = function() {
	var expected={options:["-n2","-n3"],count:["3"],files:["file1","file2"]};
	assert.deepEqual(expected,lib.seperator(["-n2","-n3","file1","file2"]));
}

test["Seperate options & commands for c"] = function() {
	var expected={options:["-c2","-c3"],count:["3"],files:["file1","file2"]};
	assert.deepEqual(expected,lib.seperator(["-c2","-c3","file1","file2"]));
}

test["Seperate options & commands for wrong command"] = function() {
	var expected={options:["-n2","-n4","-3"],count:["-3"],files:[]};
	assert.deepEqual(expected,lib.seperator(["-n2","-n4","-3","file1","file2"]));
}

test["Seperate options & commands for more wrong command"] = function() {
	var expected={options:["-n2","--n4","-3"],count:["-3"],files:[]};
	assert.deepEqual(expected,lib.seperator(["-n2","--n4","-3","file1","file2"]));
}

test["make data of a file"]=function(){
	var expected=["file.txt","he"];
	assert.deepEqual(expected,lib.makeEachDataFor_n("file.txt","he\nhello\nhi",1));
}

test["print No. of chars"]=function(){
	var expected=["file.js","he"];
	assert.deepEqual(expected,lib.makeEachDataFor_c("file.js","he\nhello\nhi",2));
}

test["print No. of chars for \n"]=function(){
	var expected=["file.txt","he\nh"];
	assert.deepEqual(expected,lib.makeEachDataFor_c("file.txt","he\nhello\nhi",4));
}

test["Make complete data"]=function(){
	var expected=[["README.txt","Implement head and tail."]];
	assert.deepEqual(expected,lib.makeData(["-n1","README.txt"]));
}

test["Make complete data for wrong option"]=function(){
	var expected=["illegal command -- -"];
	assert.deepEqual(expected,lib.makeData(["--n","3","README.txt"]));
}

test["Make complete data for c"]=function(){
	var expected=[["README.txt","Im"]];
	assert.deepEqual(expected,lib.makeData(["-c2","README.txt"]));
}

test["Make complete data for c for large no. of words"]=function(){
	var expected=[["README.txt","Implement head and t"]];
	assert.deepEqual(expected,lib.makeData(["-c20","README.txt"]));
}

test["Make complete data for two files"]=function(){
	var expected=[['README.txt','Implement head and tail.'],['module1.js','var fs=require("fs");']];
	assert.deepEqual(expected,lib.makeData(["-n1","README.txt","module1.js"]));
}

test["Make complete data when two options are given"]=function(){
	var expected= [['README.txt','Implement head and tail.']];
	assert.deepEqual(expected,lib.makeData(["-n2","-n1","README.txt"]));
}

test["Make complete data if illegal command is passed"]=function(){
	var expected= [ 'illegal command -- -3' ];
	assert.deepEqual(expected,lib.makeData(["-n1","-n2","-3","closure.js","nModule.js"]));
}