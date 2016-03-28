var assert=require("assert");
var lib=require("./module1.js");
var test={};
exports.test=test;

test["seperator"]=function(){
	assert.deepEqual({options:["-n","2","-n","3"],count:["3"],files:["file"]},lib.seperator(["-n","2","-n","3","file"]));
}

test["seperator for only options having minus sign"]=function(){
	assert.deepEqual({options:["-2","-3","-4"],count:["-4"],files:["file"]},lib.seperator(["-2","-3","-4","3","file"]));
}

test["seperator if options at last"]=function(){
	assert.deepEqual({options:["-n","2","-n","3"],count:["3"],files:["file","-n3"]},lib.seperator(["-n","2","-n","3","file","-n3"]));
}

test["seperate for c"]=function(){
	assert.deepEqual({options:["-c","2","-c","3"],count:["3"],files:["file"]},lib.seperator(["-c","2","-c","3","file"]));
}

test["seperate for c for only one argument"]=function(){
	assert.deepEqual({options:["-c","3"],count:["3"],files:["file"]},lib.seperator(["-c","3","file"]));
}

test["seperator when no option"]=function(){
	assert.deepEqual({options:[],count:[],files:["file"]},lib.seperator(["file"]));
}

test["seperator when illegal option"]=function(){
	assert.deepEqual({options:["-n","2","-3"],count:["-3"],files:[]},lib.seperator(["-n","2","-3","file"]));
}

test["seperator when illegal option for c"]=function(){
	assert.deepEqual({options:["-c","2","-3"],count:["-3"],files:[]},lib.seperator(["-c","2","-3","file"]));
}

test["seperator when illegal option with two files"]=function(){
	assert.deepEqual({options:["-n","2","-3"],count:["-3"],files:[]},lib.seperator(["-n","2","-3","file1","file2"]));
}

test["seperator when num as file"]=function(){
	assert.deepEqual({options:["-n","2"],count:["2"],files:["4","3","file"]},lib.seperator(["-n","2","4","3","file"]));
}

test["make data of a file"]=function(){
	var expected=["file.txt","he"];
	assert.deepEqual(expected,lib.makeEachDataFor_n("file.txt","he\nhello\nhi",1));
}

test["print No. of chars"]=function(){
	var expected=["file.txt","he"];
	assert.deepEqual(expected,lib.makeEachDataFor_c("file.txt","he\nhello\nhi",2));
}

test["print No. of chars for \n"]=function(){
	var expected=["file.txt","he\nh"];
	assert.deepEqual(expected,lib.makeEachDataFor_c("file.txt","he\nhello\nhi",4));
}

test["Make complete data"]=function(){
	var expected=[["README.txt","Implement head and tail."]];
	assert.deepEqual(expected,lib.makeData(["-n","2","README.txt"]));
}

test["Make complete data for wrong option"]=function(){
	var expected=["illegal command -- -"];
	assert.deepEqual(expected,lib.makeData(["--n","2","README.txt"]));
}

test["Make complete data for c"]=function(){
	var expected=[["README.txt","Im"]];
	assert.deepEqual(expected,lib.makeData(["-c","2","README.txt"]));
}

test["Make complete data for c for large no. of words"]=function(){
	var expected=[["README.txt","Implement head and t"]];
	assert.deepEqual(expected,lib.makeData(["-c","20","README.txt"]));
}

test["Make complete data for two files"]=function(){
	var expected=[['README.txt','Implement head and tail.'],['module1.js','var fs=require("fs");']];
	assert.deepEqual(expected,lib.makeData(["-n","1","README.txt","module1.js"]));
}

test["Make complete data when two options are given"]=function(){
	var expected=[['README.txt','Implement head and tail.']];
	assert.deepEqual(expected,lib.makeData(["-n","2","-n","1","README.txt"]));
}

test["Make complete data if illegal command is passed"]=function(){
	var expected= [ 'illegal command -- -3' ];
	assert.deepEqual(expected,lib.makeData(["-n","2","-3","README.txt","module1.js"]));
}