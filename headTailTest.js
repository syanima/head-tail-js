var assert=require("assert");
var lib=require("./headAndTail.js");
var test={};
exports.test=test;

test["seperate options if options at last"] = function() {
	assert.deepEqual(["-n","-c"],lib.options(["-n","3","-c","2","file","-n"]))
}

test["seperate options"] = function() {
	assert.deepEqual(["-n","-c"],lib.options(["-n","2","-c","3","files"]))
}

test["combined options check"] = function() {
	assert.equal(true,lib.combinedOptions(["-n","-c","ReadMe.txt"]));
}

test["combined options check if options at last"] = function() {
	assert.equal(false,lib.combinedOptions(["-n","-n","ReadMe.txt","-c"]));
}

test["combined options check"] = function() {
	assert.equal(false,lib.combinedOptions(["-n","ReadMe.txt","-c"]));
}

test["combined options check opposite"] = function() {
	assert.equal(true,lib.combinedOptions(["-c","-n","ReadMe.txt"]));
}

test["combined options check with numbers"] = function() {
	assert.equal(true,lib.combinedOptions(["-n2","-c3","ReadMe.txt"]));
}

test["Prepare data"]=function(){
	assert.deepEqual( [['module1.js','va']],lib.prepareData(["-c2","module1.js"]))
}

test["Prepare data for one file"]=function(){
	assert.deepEqual([['module1.js','va' ]],lib.prepareData(["-c","2","module1.js"]))
}

test["Prepare data if options at last"]=function(){
	assert.deepEqual([['module1.js','va' ],['file not exist'],['file not exist']],lib.prepareData(["-c","2","module1.js","-c","3"]))
}

test["Prepare data for two files"]=function(){
	assert.deepEqual([['module1.js','va'],['headAndTail.js','va']],lib.prepareData(["-c","2","module1.js","headAndTail.js"]))
}


test["printing data for num of lines"] = function() {
	var expected=["var m1=require('./module1.js');"];
	assert.deepEqual(expected,lib.printingData(["-n1","headAndTail.js"]))
}

test["printing data for num of lines if directly number is given"] = function() {
	var expected=["var m1=require('./module1.js');"];
	assert.deepEqual(expected,lib.printingData(["-1","headAndTail.js"]))
}

test["printing data for num of lines if directly number is given without minus"] = function() {
	var expected=[ [ 'file not exist' ],'==> README.txt <==','Implement head and tail.' ]
	assert.deepEqual(expected,lib.printingData(["1","README.txt"]))
}

test["printing data for num of chars"] = function() {
	var expected=["var m1=require('./module1.js')"];
	assert.deepEqual(expected,lib.printingData(["-c30","headAndTail.js"]))
}

test["Print data for two different option"]=function(){
	assert.deepEqual(["head: can't combine line and byte counts"],lib.printingData(["-n","2","-c","2","module1.js"]))
}