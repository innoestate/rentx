import { NzTableSortFn } from "ng-zorro-antd/table";

export interface NzUxColumnConfig {
  key: string;
  label: string;
  type?: string;
  sort?: {
    fn: NzTableSortFn;
    priority: number;
  }
}
