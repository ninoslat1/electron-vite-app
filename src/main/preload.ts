import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ValidChannel } from '../types/electron-api';

interface ElectronAPI {
  send: (channel: ValidChannel, data: unknown) => void;
  receive: (channel: ValidChannel, callback: (...args: unknown[]) => void) => void;
}

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: ValidChannel, data: unknown) => {
    if (isValidChannel(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: ValidChannel, callback: (...args: unknown[]) => void) => {
    if (isValidChannel(channel)) {
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args));
    }
  }
} as ElectronAPI);

function isValidChannel(channel: string): channel is ValidChannel {
  const validChannels: ValidChannel[] = [
    'app:close', 
    'app:minimize', 
    'data:request', 
    'data:response'
  ];
  return validChannels.includes(channel as ValidChannel);
}