const env = (key: string) => {
  const val = process.env[key]
  if (!val) throw new Error(`Env var: ${key} not found!`)
  if (val.length === 0) throw new Error(`Env var: ${key} cannot be empty!`)
  else return val
}

export default env