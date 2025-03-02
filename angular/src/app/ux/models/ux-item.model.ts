import { Command } from "src/app/estates/commands/command.interface";

export interface UxItem {
  label: string;
  icon?: string;
  command?: () => boolean | Command ;
}
