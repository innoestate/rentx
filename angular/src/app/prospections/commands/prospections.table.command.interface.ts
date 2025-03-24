import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model"

export interface ProspectionsTableCommands {
  delete: (row: UiTableRow) => void
}