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
