import { Command } from "src/app/estates/commands/command.interface";

export interface UiItem {
  label: string;
  icon?: string;
  command?: (value?: any) => boolean | Command ;
}
