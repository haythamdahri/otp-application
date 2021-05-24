import { Injectable } from "@angular/core";
import { Page } from "../page";
import { Pageable } from "../pageable";

@Injectable({
  providedIn: "root",
})
export class CustomPaginationService {
  constructor() {}

  public getNextPage(pageCopy: Page<any>): Pageable {
    const  page = JSON.parse(JSON.stringify(pageCopy));
    if (!page.last) {
      page.pageable.pageNumber = page.pageable.pageNumber + 1;
    }
    return page.pageable;
  }

  public getPreviousPage(pageCopy: Page<any>): Pageable {
    const  page = JSON.parse(JSON.stringify(pageCopy));
    if (!page.first) {
      page.pageable.pageNumber = page.pageable.pageNumber - 1;
    }
    return page.pageable;
  }

  public getPageInNewSize(pageCopy: Page<any>, pageSize: number): Pageable {
    const  page = JSON.parse(JSON.stringify(pageCopy));
    page.pageable.pageSize = pageSize;
    page.pageable.pageNumber = Pageable.FIRST_PAGE_NUMBER;
    return page.pageable;
  }
}
