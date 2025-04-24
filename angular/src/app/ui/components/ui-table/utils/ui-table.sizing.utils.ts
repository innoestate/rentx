import { ElementRef } from "@angular/core";
import { from, map, merge, Observable, of, take } from "rxjs";

export const getSizing = (elRef: ElementRef): Observable<number | undefined> => {
  return merge(of(10), calculate$(elRef));
}

const calculate$ = (elRef: ElementRef): Observable<number> => {
  return from(htmlRowsAreLoaded(elRef)).pipe(
    take(1),
    map(() => {
      const heights = getHeights(elRef);
      return calculateRowsPerPages(heights);
    })
  );
}

const getHeights = (elRef: ElementRef) => {

  const rows = elRef.nativeElement.querySelectorAll('.ant-table-row');

  const table = elRef.nativeElement.querySelector('.ant-table-wrapper')?.getBoundingClientRect().height || 0;
  const head = elRef.nativeElement.querySelector('.ant-table-thead')?.getBoundingClientRect().height || 0;
  const row = rows?.length ? rows[1]?.getBoundingClientRect().height : 40;
  const footer = elRef.nativeElement.querySelector('.ui-table-footer')?.getBoundingClientRect().height || 0;

  return { table, head, row, footer };
}

const calculateRowsPerPages = (heights: { table: number, head: number, row: number, footer: number }) => {
  const bodyHeight = heights.table - heights.head - heights.footer;
  const rowsPerPages = Math.floor(bodyHeight / heights.row);
  return rowsPerPages;
}

const hasRowsAfterHeader = (elRef: ElementRef) => {
  const rows = elRef.nativeElement.querySelectorAll('.ant-table-row');
  if (rows.length > 1) {
    return true;
  }
  return false;
}

const htmlRowsAreLoaded = (elRef: ElementRef) => {
  return new Promise(resolve => {
    const observer = new MutationObserver(() => {
      if (hasRowsAfterHeader(elRef)) {
        resolve(true)
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}