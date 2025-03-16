import { ComponentFixture } from "@angular/core/testing";
import { UiTableComponent } from "../../ui-table.component";
import { By } from "@angular/platform-browser";

export class UiTableHelper {

  constructor(private fixture: ComponentFixture<UiTableComponent>) {}

  observeChangeInTable = () => {
    return new Promise<void>((resolve) => {
      const observer = new MutationObserver((mutations, observer) => {
        resolve();
      });
      const table = this.fixture.debugElement.query(By.css('.ant-table-wrapper'));
      observer.observe(table.nativeElement, { childList: true, subtree: true });
      this.fixture.detectChanges();
    });
  }

  clickOnSortUp = async (sortColumnIndex = 0) => {
    const sortUpButton = this.fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    sortUpButton[sortColumnIndex].nativeElement.click();
    await this.observeChangeInTable();
  }

  expectFirstRowCellContentToBe = (columnIndex: number, content: string) => {
    const targetedCell = this.fixture.debugElement.queryAll(By.css(`body td:nth-child(${columnIndex})`));
    expect(targetedCell[0].nativeElement.textContent).toContain(content);
  }

}