import {Status} from "../enums/status.enum";

export interface WorkInterface {
  id: number;
  work: string;
  periodOfTime: number; // min
  price: number;
  status: Status;
}
