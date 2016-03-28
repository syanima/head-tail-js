var fs=require("fs");
var seperator = function(args) {
	var takeOptionsAndFiles={options:[],count:[],files:[]};
	var i=0;
	while(i<args.length){
		if(/-n\d|-c\d/.test(args[i])){
			takeOptionsAndFiles.options=args.slice(0,i+1);
			takeOptionsAndFiles.count=[takeOptionsAndFiles.options[i].slice(2)];
		}
		else{if(/-\d/.test(args[i])){
				takeOptionsAndFiles.options=args.slice(0,i+1);
				takeOptionsAndFiles.count=[takeOptionsAndFiles.options[i]];
				break;
			}
			else { 
				takeOptionsAndFiles.files=args.slice(i); 
				break;}
		} 		
		i++;
	}
	return takeOptionsAndFiles;
}
exports.seperator=seperator;

var makeEachDataFor_n = function(file,matter,lineToPrint){
	var result=[file,matter.split("\n").splice(0,lineToPrint).join("\n")];
	return result;
}
exports.makeEachDataFor_n = makeEachDataFor_n;

var makeEachDataFor_c = function(file,matter,lineToPrint) {
	var result=[file,matter.split("").splice(0,lineToPrint).join("")];
	return result;
}
exports.makeEachDataFor_c=makeEachDataFor_c;

var makeData = function(args) {
	if(seperator(args).files.length<1)
		return ["illegal command -- "+seperator(args).options.pop()];
	if(seperator(args).options.length<1)
		return ['illegal command -- -'];
	else{
		var files=seperator(args).files;
		var lineToPrint=Number(seperator(args).count);
		return files.map(function(eachFile){
			if(fs.existsSync(eachFile)){
				var matter=fs.readFileSync(eachFile,"utf8");
				if(seperator(args).count.length<1)
					return makeEachDataFor_n(eachFile,matter,10);
				if(/-n\d/.test(args[0]))
					return makeEachDataFor_n(eachFile,matter,lineToPrint);
				else if(/-c\d/.test(args[0]))
					return makeEachDataFor_c(eachFile,matter,lineToPrint);
			}
			else return ["file not exist"];
		});
	}
}
exports.makeData=makeData;