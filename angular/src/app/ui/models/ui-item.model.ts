import { Command } from "src/app/features/estates/commands/command.interface";

export interface UiItem {
  label: string;
  icon?: string;
  command?: (value?: any) => boolean | Command | void;
}
