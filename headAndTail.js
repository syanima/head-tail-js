var m1=require('./module1.js');
var m2=require('./module2.js');
var m3=require('./module3.js');
var c_n_withoutNum= /-n-c|-c-n/;
var c_n_withNum= /-n\d-c\d|-c\d-n\d/;

var searchOptions = function(args) {
	var files = m1.seperator(args).files || m2.seperator(args).files || m3.seperator(args).files;
		var optionsWithMinus = function(eachArg,index) {
			return eachArg[0]=="-" && index < args.indexOf(files[0]);
		}
	return optionsWithMinus;
}
exports.searchOptions=searchOptions;

var options = function(args) {
	var result=searchOptions(args)
	return args.filter(result);
}
exports.options=options;

var combinedOptions = function(args) {
	var option=(options(args).join(""))
	return c_n_withoutNum.test(option) || c_n_withNum.test(option);
}
exports.combinedOptions=combinedOptions;

var prepareData = function(args) {
	if(args[0]=="-n" || args[0]=="-c")
		var preparedData = m1.makeData(args);
	else if(/-n\d|-c\d/.test(args.join("")))
		var preparedData = m2.makeData(args);
	else if(/-\d|\d/.test(args.join("")))
		var preparedData = m3.makeData(args);
	return preparedData;
}
exports.prepareData=prepareData;

var printingData=function(args){
	var resultToPrint=[];
	if(combinedOptions(args))
		return ["head: can't combine line and byte counts"];
	if(prepareData(args).length==1){ 
		resultToPrint.push(prepareData(args)[0][1]);
		return resultToPrint;
	}
	else{
		prepareData(args).forEach(function(eachData){
		if(eachData.length<=1) resultToPrint.push(eachData);
		else{resultToPrint.push("==> "+eachData[0]+" <==",eachData[1])};
	});
	}
	return resultToPrint;
}
exports.printingData=printingData;
console.log(printingData(process.argv.slice(2)).join("\n"));