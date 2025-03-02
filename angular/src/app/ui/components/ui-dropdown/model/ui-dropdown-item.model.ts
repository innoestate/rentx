import { Command } from "src/app/estates/commands/command.interface";
import { UiItem } from "src/app/ui/models/ui-item.model";

export interface UiDropdownItem<T> extends UiItem {
  label: string;
  readonly value: T;
  command?: () => boolean | Command;
}
