import { default as chalk } from 'chalk';
import nodemon from 'nodemon';
  
nodemon(
  {
    ext: "js, json, ts, env",
    exec: "ts-node ./src/main.ts --transpileOnly --swc",
    watch: ["src"],
    stdin: true,
    stdout: false,
  }
);


nodemon.on("stdout",
  (data) => {
    console.log(chalk.dim('out➜ ')+data);
  }
).on("log",
  (msg) => {
    if (msg.type === 'info')
      log(chalk.dim(msg.message))
    
    else if (msg.type === 'status')
      log(chalk.green(msg.message))
    
    else if (msg.type === 'fail')
      log(chalk.red(msg.message))
    
    else if (msg.type === 'error')
      log(chalk.bold.red(msg.message))
    
    else 
      log(chalk.dim(msg.message))
  }
).on('stdin', (data) => {
  data
})

process.stdin.on('data', data => {
  console.log("Inputted: "+data.split('\n')[0])
})

const log = (msg) => console.log(chalk.green(`Nodemon `) + msg);