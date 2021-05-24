import { Sort } from "./sort";
import { Pageable } from "./pageable";

export class Page<T> {
  public content?: T[];
  public pageable: Pageable;
  public last?: boolean;
  public totalPages?: number;
  public totalElements?: number;
  public first?: boolean;
  public sort?: Sort;
  public numberOfElements?: number;
  public size?: number;
  public number?: number;
  

  public constructor() {
    this.pageable = new Pageable();
  }
}
