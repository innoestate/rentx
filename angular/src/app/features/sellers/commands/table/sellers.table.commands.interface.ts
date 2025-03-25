import { UiTableRowSellers } from "../../adapters/sellers.table.adapter.type"

export interface SellersTableCommands {
  delete: (row: UiTableRowSellers) => void
}