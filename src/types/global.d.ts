export {};

declare global {
  interface Window {
    electron: {
      saveFile: (buffer: Buffer, fileName: string) => void;
      onSaveFileSuccess: (callback: (saveDir: string) => void) => void;
      openFolder: (path: string) => void;
    };
  }
}