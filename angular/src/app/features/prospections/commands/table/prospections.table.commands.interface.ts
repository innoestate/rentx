import { UiTableRowProspection } from "../../adapters/table/prospections.table.adapter.type"

export interface ProspectionsTableCommands {
  delete: (row: UiTableRowProspection) => void
}
