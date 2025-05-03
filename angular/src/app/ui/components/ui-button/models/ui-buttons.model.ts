export interface UiButton<T> {
  text: string;
  type: string;
  keepEnableOnValidForm?: boolean;
  command?: (value: T) => void;
}
