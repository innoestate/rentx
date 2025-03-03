import { Command } from "src/app/estates/commands/command.interface";
import { UiTableRow } from "../components/ui-table/models/ui-table-row.model";

export interface UiItem {
  label: string;
  icon?: string;
  command?: (value?: any) => boolean | Command ;
}
