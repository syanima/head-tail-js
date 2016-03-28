var fs=require("fs");

var seperator = function(args) {
	var takeOptionsAndFiles={options:[],count:[],files:[]};
	var i=0;
	while(i<args.length){
		if(/-\d/.test(args[i])){
			takeOptionsAndFiles.options=args.slice(0,i+1);
			takeOptionsAndFiles.count=[takeOptionsAndFiles.options[takeOptionsAndFiles.options.length-1]];
		}
		else{
			takeOptionsAndFiles.files=args.slice(i); 
			break; 
		} 		
		i++;
	}
	return takeOptionsAndFiles;
}
exports.seperator=seperator;

var makeEachData = function(file,matter,lineToPrint){
	var result=[file,matter.split("\n").splice(0,lineToPrint).join("\n")];
	return result;
}
exports.makeEachData = makeEachData;

var makeData = function(args) {
	if(seperator(args).files.length<1)
		return ["illegal command -- "+seperator(args).options.pop()];
	if(/--/.test(seperator(args).options.join('')))
		return ['illegal command -- -'];
	else{
		var files=seperator(args).files;
		var lineToPrint=Math.abs(seperator(args).count);
		return files.map(function(eachFile){
			if(fs.existsSync(eachFile)){
				var matter=fs.readFileSync(eachFile,"utf8");
				if(seperator(args).count.length<1 || seperator(args).count==[])
					return makeEachData(eachFile,matter,10);
				else
					return makeEachData(eachFile,matter,lineToPrint);
			}
			else return ["file not exist"];
		});
	}
}
exports.makeData=makeData;