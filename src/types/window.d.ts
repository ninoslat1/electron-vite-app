import { ElectronAPI } from './electron-api';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}