import { Sort } from "./sort";

export class Pageable {
  public sort?: Sort;
  public pageSize: number;
  public pageNumber: number;
  public offset?: number;
  public unpaged?: boolean;
  public paged?: boolean;

  static readonly DEFAULT_PAGE_SIZE = 20;
  static readonly FIRST_PAGE_NUMBER = 0;

  public constructor() {
    this.pageSize = Pageable.DEFAULT_PAGE_SIZE;
    this.pageNumber = Pageable.FIRST_PAGE_NUMBER;
  }
}
