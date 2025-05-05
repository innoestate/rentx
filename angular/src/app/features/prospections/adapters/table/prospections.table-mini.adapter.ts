import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { Prospection_Dto } from "../../models/prospection.dto.model";
import { UiTableColumn } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { Prospection } from "../../models/prospection.model";
import { PROSPECTION_STATUS, ProspectionStatus } from "../../models/prospection.status.model";

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
      },
      {
        key: 'status',
        cell: {
          type: 'string',
          label: { title: { label: 'Statut' } }
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
            type: 'string',
            label: { title: { label: prospection.address || '' } }
          },
          price: {
            type: 'number',
            label: { title: { label: prospection.price?.toString() || '' } }
          },
          seller: {
            type: 'string',
            label: { title: { label: prospection.seller?.name || '' } }
          },
          status: {
            type: 'string',
            label: { icon: {
              name: this.getStatus(prospection)?.icon || '',
              size: 20,
              color: "var(--color-basic-100)",
            }, color: this.getStatus(prospection)?.color || '', title: { label: this.getStatus(prospection)?.shortLabel || '', color: "var(--color-basic-100)" } }
          }
        }
      })
    )
  }

  private getStatusShortLabel(prospection: Prospection): string {
    return PROSPECTION_STATUS.find(status => status.key === prospection.status)?.shortLabel || '';
  }

  private getStatus(prospection: Prospection): ProspectionStatus | undefined {
    return PROSPECTION_STATUS.find(status => status.key === prospection.status);
  }

  selectRow(row: UiTableRow) {}

}