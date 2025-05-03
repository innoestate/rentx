import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { Prospection_Dto } from "../../models/prospection.dto.model";
import { UiTableColumn } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { Prospection } from "../../models/prospection.model";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsTableMiniAdapterService {

  constructor(private localization: LocalizationsService) { }

  createColumns(prospections: Prospection_Dto[]): UiTableColumn[] {
    return [
      {
        key: 'address',
        cell: {
          type: 'string',
          label: { title: { label: 'Adresse' } }
        }
      },
      {
        key: 'price',
        cell: {
          type: 'number',
          label: { title: { label: 'Prix' } }
        }
      },
      {
        key: 'seller',
        cell: {
          type: 'string',
          label: { title: { label: 'Vendeur' } }
        }
      }
    ]
  }

  createRows(prospections?: (Prospection | undefined)[] | undefined): UiTableRow[] {
    if(!prospections) return [];
    return prospections.filter(p => p !== undefined).map(
      prospection => ({
        data: { id: prospection.id || '' },
        cells: {
          address: {
            editable: true,
            type: 'string',
            label: { title: { label: prospection.address || '' } }
          },
          price: {
            editable: true,
            type: 'number',
            label: { title: { label: prospection.price?.toString() || '' } }
          },
          seller: {
            editable: true,
            type: 'string',
            label: { title: { label: prospection.seller?.name || '' } }
          }
        }
      })
    )
  }

  selectRow(row: UiTableRow) {}

}