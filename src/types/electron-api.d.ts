export type ValidChannel = 
  | 'app:close'
  | 'app:minimize'
  | 'data:request'
  | 'data:response'

export interface ElectronAPI {
  send: (channel: ValidChannel, data: unknown) => void;
  receive: (channel: ValidChannel, callback: (...args: unknown[]) => void) => void;
}