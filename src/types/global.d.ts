export {};

declare global {
  interface Window {
    electron: {
      saveFile: (buffer: Buffer, fileName: string) => void;
    };
  }
}