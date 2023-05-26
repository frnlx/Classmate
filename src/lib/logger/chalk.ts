import chalk from "chalk"

export const color = {
  
  yellow: (o: any) => {
    if(process.env.NODE_ENV !== 'development') return
    console.log(chalk.yellow(o))
  },
  black: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.black(o))
  },
  red: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.red(o))
  },
  green: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.green(o))
  },
  blue: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.blue(o))
  },
  magenta: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.magenta(o))
  },
  cyan: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.cyan(o))
  },
  white: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.white(o))
  },
  blackBright: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.blackBright(o))
  },
  redBright: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.redBright(o))
  },
  greenBright: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.greenBright(o))
  },
  yellowBright: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.yellowBright  (o))
  },
  blueBright: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.yellow(o))
  },
  magentaBright: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.magentaBright(o))
  },
  cyanBright: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.cyanBright(o))
  },
  whiteBright: (o: any) => {
    if (process.env.NODE_ENV !== 'development') return
    console.log(chalk.whiteBright(o))
  }

}

