export { };

declare global {
  interface Window {
    grained: (selector: string, options: Record<string, any>) => void;
  }
}