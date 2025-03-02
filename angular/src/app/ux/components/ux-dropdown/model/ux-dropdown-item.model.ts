import { Command } from "src/app/estates/commands/command.interface";
import { UxItem } from "src/app/ux/models/ux-item.model";

export interface UxDropdownItem<T> extends UxItem {
  label: string;
  readonly target: T;
  command?: () => boolean | Command;
}
