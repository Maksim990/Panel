const request = require("request");
const colors = require("colors");
const Azip = require("adm-zip");

(async function(){
    let update = await new Promise(resolve => {
        request.get({url:"https://github.com/Maksim990/list-update/archive/refs/heads/main.zip", encoding: null},(err,res,body)=>{
            let zip = new Azip(body);
            let Lzip = zip.getEntries();

            Lzip.forEach((entry)=>{
                if(entry.entryName.match(/update.json/i)){
                    resolve(zip.readAsText(entry));
                };
            });
        });
    });

    let json = JSON.parse(update);
    if(json.Panel.version !== "1.0.0"){
        console.log("\nВышло новое обновление!".green.bold);
        console.log("Репозиторий:".green.bold + `${json.Panel.repository}`.yellow.bold);
        console.log("Новая версия:".green.bold + `${json.Panel.version}`.yellow.bold);
        console.log("Ссылка:".green.bold + `${json.Panel.url_repository}`.yellow.bold);
    };
})()