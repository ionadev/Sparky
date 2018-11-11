const inquirer = require("inquirer");
const fs = require("fs");

let baseConfig = fs.readFileSync("./setup_base.txt", "utf8");

let prompts = [

  {
    type: "input",
    name: "token",
    message: "Please enter the bot token from the application page:"
  },
  {
    type: "input",
    name: "ownerID",
    message: "Please enter the bot owner's User ID:"
  },
   {
    type: "input",
    name: "botstats",
    message: "Please enter the bot stats (WATCHING, PLAYING, LISTENING):"
  },
   {
    type: "input",
    name: "botstatus",
    message: "Please enter the bot stats (online, idle, dnd):"
  },
   {
    type: "input",
    name: "prefix",
    message: "Please enter the bot prefix:"
  }

];

(async function() {
  console.log("Setting Up SparkyBot Configuration...");
  
  const answers = await inquirer.prompt(prompts);

  baseConfig = baseConfig
    .replace("{{owner}}", `${answers.ownerID}`)
    .replace("{{prefix}}", `"${answers.prefix}"`)
    .replace("{{token}}", `"${answers.token}"`)
	 .replace("{{stats}}", `"${answers.botstats}"`)
	 .replace("{{status}}", `"${answers.botstatus}"`)
	 
  fs.writeFileSync("./botconfig.json", baseConfig);
  console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
  console.log("Configuration has been written, enjoy!");
}());