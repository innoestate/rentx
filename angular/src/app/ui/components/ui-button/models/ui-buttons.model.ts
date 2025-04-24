export interface UiButton<T> {
  text: string;
  type: string;
  command?: (value: T) => void;
}
