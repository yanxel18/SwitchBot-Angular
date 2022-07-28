
interface ICEventsMsg {
  askTostartMachine: string,
  machineStarting: string,
  machineStarted: string
  error: string
}

interface IDAccountEditMsg {
  updateAccountTitle: string,
  askAccountUpdate: string,
  accountUpdated: string,
  accountExisting: string,
  error: string
}

interface IDAccountRegisterMsg {
  registerAccountTitle: string,
  askAccountRegister: string,
  accountRegistered: string,
  accountExisting: string,
  error: string
}

interface IDUpdateMachineMsg {
  updateMachineTitle: string,
  askMachineUpdate: string,
  machineUpdated: string,
  machineExisting: string,
  error: string
}

interface IDRegisterMachineMsg {
  registerMachineTitle: string,
  askMachineRegister: string,
  machineRegistered: string,
  machineExisting: string,
  error:string,
}

interface IDMachineViewMsg {
  deleteMachineTitle: string,
  askMachineDelete: string,
  machineDeleted: string,
  error: string
}

interface IDPasswordUpdateMsg {
  updatePasswordTitle: string,
  askPasswordUpdate: string,
  passwordUpdated: string,
  error: string
}

interface IDRaspiEditMsg {
  updateRaspiTitle: string,
  askRaspiUpdate: string,
  raspiUpdated: string,
  raspiExisting: string,
  error: string
}

interface IDTerminalEventMsg {
  updateTerminalTitle: string,
  askTerminalUpdate: string,
  TerminalUpdated: string,
  error: string
}
interface IDRaspiRegisterMsg {
  registerRaspiTitle: string,
  askRaspiRegister: string,
  raspiRegistered: string,
  raspiExisting: string,
  error: string
}

interface IDRaspiViewMsg {
  deleteRaspiTitle: string,
  askRaspiDelete: string,
  raspiDeleted: string,
  error: string
}

interface IDSwitchbotEditMsg {
  updateSwitchbotTitle: string,
  askSwitchbotUpdate: string,
  switchbotUpdated: string,
  switchbotExisting: string,
  error: string
}

interface IDSwitchbotRegisterMsg {
  registerSwitchbotTitle: string,
  askSwitchbotRegister: string,
  switchbotRegistered: string,
  switchbotExisting: string,
  error: string
}

interface IDSwitchbotViewMsg {
  deleteSwitchbotTitle: string,
  askSwitchbotDelete: string,
  switchbotDeleted: string,
  error: string
}
export const CEventsMsg: ICEventsMsg = {
  askTostartMachine: "設備を開始してよろしいですか？",
  machineStarting: "設備を起動しますので、しばらくお待ちください。",
  machineStarted: "設備起動が完了です！",
  error: "エラー発生！"
}

export const DAccountEditMsg: IDAccountEditMsg = {
  updateAccountTitle: "アカウント報告更新",
  askAccountUpdate: "アカウントを更新してよろしいですか？",
  accountUpdated: "アカウントを更新済みです！",
  accountExisting: "アカウントは既存があります！",
  error: "エラー発生！"
}

export const DAccountRegisterMsg: IDAccountRegisterMsg = {
  registerAccountTitle: "アカウント登録",
  askAccountRegister: "アカウントを登録してよろしいですか？",
  accountRegistered: "アカウントを登録済みです！",
  accountExisting: "アカウントは既存があります！",
  error: "エラー発生！"
}

export const DUpdateMachineMsg: IDUpdateMachineMsg = {
  updateMachineTitle:"設備情報編集",
  askMachineUpdate: "設備情報を編集してよろしいですか？",
  machineUpdated: "設備情報を編集済みです！",
  machineExisting: "設備情報は既存があります！",
  error: "エラー発生！"
}

export const DRegisterMachineMsg: IDRegisterMachineMsg = {
  registerMachineTitle: "設備情報登録",
  askMachineRegister: "設備情報を登録してよろしいですか？",
  machineRegistered: "設備情報を登録済みです！",
  machineExisting: "設備情報は既存があります！",
  error:"エラー発生！",
}

export const DMachineViewMsg: IDMachineViewMsg = {
  deleteMachineTitle: "設備情報削除",
  askMachineDelete: "設備情報を削除してよろしいですか？",
  machineDeleted: "設備情報を削除済みです！",
  error: "エラー発生！"
}

export const DPasswordUpdateMsg: IDPasswordUpdateMsg = {
  updatePasswordTitle: "パスワード変更",
  askPasswordUpdate: "パスワードを変更してよろしいですか？",
  passwordUpdated: "パスワードを変更済みです！",
  error: "エラー発生！",
}

export const DRaspiEditMsg: IDRaspiEditMsg = {
  updateRaspiTitle: "RASPI情報編集",
  askRaspiUpdate: "RaspiberryPi情報を編集してよろしいですか？",
  raspiUpdated: "RaspiberryPi情報を編集済みです！",
  raspiExisting: "RaspiberryPiサーバーはすでに存在しています！",
  error: "エラー発生！"
}

export const DRaspiRegisterMsg: IDRaspiRegisterMsg = {
  registerRaspiTitle: "RASPI登録",
  askRaspiRegister: "RaspiberryPi情報を登録してよろしいですか？",
  raspiRegistered: "RaspiberryPiを登録済みです！",
  raspiExisting: "RaspiberryPi情報は既存があります！",
  error: "エラー発生！"
}

export const DRaspiViewMsg: IDRaspiViewMsg = {
  deleteRaspiTitle: "RaspberryPi削除",
  askRaspiDelete: "RaspberryPiを削除してよろしいですか？",
  raspiDeleted: "RaspberryPiを削除しました！",
  error: "エラー発生！"
}

export const DSwitchbotEditMsg: IDSwitchbotEditMsg = {
  updateSwitchbotTitle: "スウィッチボット情報編集",
  askSwitchbotUpdate: "スウィッチボットを編集してよろしいですか？",
  switchbotUpdated: "スウィッチボットを編集済みです！",
  switchbotExisting: "スウィッチボット情報は既存があります！",
  error: "エラー発生！"
}

export const DSwitchbotRegisterMsg: IDSwitchbotRegisterMsg = {
  registerSwitchbotTitle: "スウィッチボット登録",
  askSwitchbotRegister: "スウィッチボットを登録してよろしいですか？",
  switchbotRegistered: "スウィッチボットを登録済みです！",
  switchbotExisting: "スウィッチボット情報は既存があります！",
  error: "エラー発生！"
}

export const DSwitchbotViewMsg: IDSwitchbotViewMsg = {
  deleteSwitchbotTitle: "スウィッチボット削除",
  askSwitchbotDelete: "スウィッチボットを削除してよろしいですか？",
  switchbotDeleted: "スウィッチボットを削除済みです！",
  error: "エラー発生！"
}

export const DTerminalEventMsg: IDTerminalEventMsg = {
  updateTerminalTitle: "端末イベント表示更新",
  askTerminalUpdate: "イベントを更新してよろしいですか？",
  TerminalUpdated: "イベント更新を更新済みです",
  error: "エラー発生！"
}
