var http = require("http"),
 url = require("url"),
 superagent = require("superagent"),
 cheerio = require("cheerio"),
 async = require("async"),
 eventproxy = require('eventproxy'),
 fs = require('fs');
var endOfLine = require('os').EOL;

// 主start程序
function start(){
	function onRequest(req, res){
		var params = url.parse(req.url, true).query;
		
		writeToFile(params);
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end("fuck ing TMDS...");
	}

	http.createServer(onRequest).listen(3000);
}

function writeToFile(params) {
	
	var uid = params['uid'];
	var trkName = params['trkName'];
	var aTrkName = params['aTrkName'];
	var left = params['left'];
	var right = params['right'];
	var sub = params['sub'];
	if (uid) {
		var str = uid+","+trkName+","+aTrkName+","+left+","+right+","+sub+endOfLine;
		console.log("uid="+uid+", trkName="+trkName+", aTrkName="+aTrkName+", left="+left+", right="+right+", sub="+sub);
		fs.open('D://tmds.txt', 'a', function (err, fd) {
			var writeBuffer = new Buffer(str),
			offset = 0,
			len = writeBuffer.length,
			filePostion = null;

			fs.write(fd, writeBuffer, offset, len, filePostion, function(err, readByte){
				//console.log('写数据总数：'+readByte+' bytes' );
		    });

		    fs.close(fd, function(err){
    		});
		})
	}
}

exports.start = start;