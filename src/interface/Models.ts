export interface machineQR{
  machineQR: string
}
export interface WorkerToken  {
  WorkerToken: {
    Noket: string | null,
    error: [ErrorMsg] | []
  }
}

export interface ErrorMsg {
  message: string | []
}

export interface MessageInfo {
  messages: [EMessages],
  error: [ErrorMsg]
}
export interface EMessages {
  eventMSGID: number
  eventMSG: string
}

export interface EventMessages{
  EventMsg: MessageInfo
}
