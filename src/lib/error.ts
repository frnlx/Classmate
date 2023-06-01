
export class ServerFunctionError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = "ServerRenderError"
    this.stack = (<any>new Error()).stack
  }
}

