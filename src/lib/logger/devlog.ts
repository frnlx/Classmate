const veryVerbose = true;

export const devlog = process.env.NODE_ENV === 'development' ? console.log : () => { };
export const verboselog = process.env.NODE_ENV === 'development' && veryVerbose ? console.log : () => { };