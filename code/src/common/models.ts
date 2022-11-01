import { ReadVResult } from "fs";

export type Race = {
  lanes: Lane[];
}

export type Lane = {
  name: string;
  result?: number;
}

export type Student = {
  name: string;
}

