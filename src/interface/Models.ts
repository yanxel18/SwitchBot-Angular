export interface machineQR{
  machineQR: string
}
export interface WorkerToken  {
  WorkerToken: {
    ScanInfo: MachineUserInfo | null,
    Noket: string | null
  }
}
export interface WorkerInfo{
  ID: number,
  FullName: string,
  AccLvl: number,
  UserQR: string,
  GIDFull: string
}


export interface MessageInfo {
  messages: [EMessages]
}
export interface EMessages {
  eventMSGID: number
  eventMSG: string
}

export interface EventMessages{
  EventMsg: MessageInfo
}
export interface MachineList extends MachineType,Switchbot,Raspi {}

export interface MachineUserInfo extends MachineList{
    UInfo: WorkerInfo[]
}
export interface MachineType {
    machineID: number,
    machineName: string,
    machineModel: string
}

export interface Switchbot {
    switchbotID?: number,
    switchbotName?: string,
    switchbotMac?: string
}

export interface Raspi {
    raspiID: number,
    raspiName: string,
    raspiServer: string
}

export interface EventParam {
  msgID: number
}

export interface CreateEventLogs {
  createEventLogs: string
}


export interface SwitchbotState {
  WorkerInfo : WorkerInfo[] | []
}

export interface CreateSwitchBotForm {
  macAddressTxt: string,
  switchbotTxt: string
}
export interface ResponseCreateSwitchBot {
  createSwitchBot: string
}
