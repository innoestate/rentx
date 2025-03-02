import { Command } from "src/app/estates/commands/command.interface";
import { UiItem } from "src/app/ui/models/ui-item.model";

export interface UiDropdownItem<T> extends UiItem {
  label: string;
  readonly target: T;
  command?: () => boolean | Command;
}
