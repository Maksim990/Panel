const path = require("path");
const fs = require("fs");

function time(){
    var data = new Date();
    var hour = data.getHours();
    var minute = data.getMinutes();
    let month = data.getMonth();
    let date = data.getDate();
    let year = data.getFullYear();
    if(month > 12){ var getmonth = month - 1 }else{ var getmonth = `${month}`; }
    if(month => 0){ var getmonth = month + 1; };

    if(hour == "1"){
        var hours = "01";
    }else if(hour == "2"){
        var hours = "02";
    }else if(hour == "3"){
        var hours = "03";
    }else if(hour == "4"){
        var hours = "04";
    }else if(hour == "5"){
        var hours = "05";
    }else if(hour == "6"){
        var hours = "06";
    }else if(hour == "7"){
        var hours = "07";
    }else if(hour == "8"){
        var hours = "08";
    }else if(hour == "9"){
        var hours = "09";
    }else{
    var hours = `${hour}`;
    }
    if(minute == "1"){
        var minutes = "01";
    }else if(minute == "2"){
        var minutes = "02";
    }else if(minute == "3"){
        var minutes = "03";
    }else if(minute == "4"){
        var minutes = "04";
    }else if(minute == "5"){
        var minutes = "05";
    }else if(minute == "6"){
        var minutes = "06";
    }else if(minute == "7"){
        var minutes = "07";
    }else if(minute == "8"){
        var minutes = "08";
    }else if(minute == "9"){
        var minutes = "09";
    }else{
        var minutes = `${minute}`;
    }
    var tim = `${hours}:${minutes}:${data.getSeconds()}`;
    var dat = `${date}.${getmonth}.${year}`;

    let time = `${tim}`;
    return time;
}
setInterval(() => { time() }, 1000);

function size_byte(text){
	var ram = text;
	if(!text) throw Error("Required is a input number");
	if(isNaN(text)) throw Error("Is not a input string/object");
    if(ram <= "1023"){
        var b = `${text}байт`;
    }else if(ram <= "1023948"){
        if(ram <= "102393"){
            var kb = `${(text / 1024).toFixed(2)}кб`;
        }else{
            var kb1 = `${(text / 1024).toFixed(1)}кб`;
        }
    }else if(ram <= "1048565760"){
        if(ram <= "104847360"){
            var mb = `${(text / 1024 / 1024).toFixed(2)}мб`;
        }else{
            var mb1 = `${(text / 1024 / 1024).toFixed(1)}мб`;
        }
    }else if(ram <= "1073727979520"){
        if(ram <= "1073727979520"){
            var gb = `${(text / 1024 / 1024 / 1024).toFixed(2)}гб`;
        }else{
            var gb1 = `${(text / 1024 / 1024 / 1024).toFixed(1)}гб`;
        }
    }else if(ram <= "1099465239121920"){
        if(ram <= "109947597619200"){
            var tb = `${(text / 1024 / 1024 / 1024 / 1024).toFixed(2)}тб`;
        }else{
            var tb1 = `${(text / 1024 / 1024 / 1024 / 1024).toFixed(1)}тб`;
        }
    }else if(ram <= "1125890113450967000"){
        if(ram <= "112584063703203840"){
            var pt = `${(text / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)}пт`;
        }else{
            var pt1 = `${(text / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(1)}пт`;
        }
    }else if(ram <= "1125884616071086100"){
        if(ram <= "112584063703203840"){
            var eb = `${(text / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2)}эб`;
        }else{
            var eb1 = `${(text / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(1)}эб`;
        }
    }else if(ram <= "991508710722078000000"){
        var zb = `${(text / 1024 / 1024 / 1024 / 2024 / 1024 / 1024 / 1024).toFixed(2)}зб`;
    }else{
        var stop = `Error bytes: ${text}`;
    }
    return b || kb || kb1
             || mb || mb1
             || gb || gb1
             || tb || tb1
             || pt || pt1
             || eb || eb1
             || zb || stop;
}
function FileSize(dirname){
    let size = 0;
    try{
        fs.readdirSync(dirname).map(
            e => path.join(dirname, e)
        ).map(
            e => {
                try{
                    return {
                        dirname: e,
                        stat: fs.statSync(e)
                    };
                }catch(err){
                    return null;
                }
        }).forEach(e => {
            if(e){
                if(e.stat.isDirectory()){
                    size += FileSize(e.dirname);
                }else if(e.stat.isFile()){
                    size += e.stat.size;
                }
            };
        });
    }catch(err){console.log(err)}
    return size;
};


global.FileSize = FileSize;
global.size_byte = size_byte;
global.time = time;