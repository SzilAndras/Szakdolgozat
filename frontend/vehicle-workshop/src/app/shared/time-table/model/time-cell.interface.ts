import {CellStatus} from "./cell-status.enum";
import {CellType} from "./cell-type.enum";

export interface TimeCellInterface {
  status: CellStatus;
  type: CellType;
  time: string;
  index: number
  isCurrent?: boolean;
}
