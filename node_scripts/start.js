import concurrently from 'concurrently';
import chalk from 'chalk';

const start = (new Date()).getTime();
const { result, commands } = concurrently(
  [ // Commands
    {
      name: chalk.blue('Back-end'),
      command: 'cd src/server && npm start',
    },
    {
      name: chalk.yellow('Front-end'),
      command: 'cd src/client && npm run dev',
    }
  ],
  { // Options
    prefix: `${chalk.dim('{time}')} {name} `,
    restartTries: 0,
    timestampFormat: 'HH:mm'
  }
)

result.then(
  () => { // on successful run
    const finish = (new Date()).getTime();
    console.log(`development was run for ${Math.round(finish - start) / 1000}s`);
    process.exit(0);
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