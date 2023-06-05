
export class ServerFunctionError extends Error {
  constructor(msg: string, readonly code?: string) {
    super(msg)
    this.name = "ServerRenderError"
    this.stack = (<any>new Error()).stack
  }
}


type errorcode = "Unauthorized"
export class RuntimeError extends Error{
  constructor(name: errorcode, msg: string) {
    super(msg)
    this.name = name
    this.stack = (<any>new Error()).stack
  }
}
