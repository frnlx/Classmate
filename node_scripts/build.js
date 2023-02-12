import fs from "fs/promises";



const start = (new Date()).getTime();
const { result, commands } = concurrently(
  [ // Commands
    {
      name: chalk.blue('Back-end'),
      command: 'cd src/server && npm run build',
    },
    {
      name: chalk.yellow('Front-end'),
      command: 'cd src/client && npm run build',
    }
  ],
  { // Options
    restartTries: 0,
  }
)

result.then(
  () => { // on successful run
    const finish = (new Date()).getTime();
    console.log(`\nProduction build takes ${Math.round(finish - start) / 1000}s\n\n`);
  },
  () => { // on event closed
    
  }
).catch(
  (err) => {
    console.log('Error occured, catched at concurrently script.');
    console.log(err);
    process.exit(0);
  }
)