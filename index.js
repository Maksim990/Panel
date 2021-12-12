const functions = require("./functions.js");
const settings = require("./settings.json");
const readline = require("readline");
const colors = require("colors");
const fs = require("fs");

require("./module/update/index.js");
require("cache-require-paths");
//create manage terminal
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//welcome
console.log("\x1b[36m" + require("figlet").textSync(settings.welcome.name));
console.log("Выход с консоли командой exit".grey);
console.log("Авторы: Котик#9821 & E'ilas#9117".grey);
console.log("----------[Дополнительная  информация]----------".gray);
if(settings["welcome"].size_byte == false && settings["language"].list == false) console.log("(Отсутствует)".gray);
if(settings["welcome"].size_byte == true){
    console.log(`Размер ядра: ${size_byte(FileSize("."))}`.gray);
};
if(settings["language"].list == true){
    console.log("There is no language support, only Russian".red);
    settings["language"].list = false;
    fs.writeFileSync("./settings.json",JSON.stringify(settings,null,4));
};
//press ctrl+C the exit or command exit
process.openStdin().on("keypress",function(chunk,key){
    if(key && key.name === "c" && key.ctrl){
        console.log(`Вы вышли с ${"Panel".green.bold}`);
        process.exit(0);
    };
});

const readLine = () => {
    rl.question(`[${time()}]`.gray + "> ", (line) => {
        if(line.startsWith("exit")){
            console.log(`Вы вышли с ${"Panel".green.bold}`);
            setTimeout(() => {
                process.exit(1);
             }, 1000);
            return rl.close();
        };

        let command = line.split(" ")[0];
        let args = line.split(" ").slice(1);
        let commands = fs.readdirSync("./cmds/").map(fileName => fileName.slice(0, -3));
        if(!line) return readLine();
        if(!commands.includes(command)) console.log(`Команда ${command.bold} не найдена!`.red);
        
        commands.forEach(fileName => { 
            if(command == fileName){
                const temp = require(`./cmds/${fileName}`).run(args);
                temp ? console.log(temp) : "";
            };
        });

        setTimeout(() => readLine(), 10);
    });
};
readLine();