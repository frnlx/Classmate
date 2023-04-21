const env = (key: string) => {
  const val = process.env[key]
  if (!val)
    throw new Error(`Env var ${key} not found!`)
  if (val.length === 0)
    throw new Error(`Env var ${key} cannot be empty!`)
  if (val.startsWith('NEXT_PUBLIC_'))
    throw new Error(`Public var ${key} cannot be called here. Directly call process.env.`)
  else return val
}

export default env