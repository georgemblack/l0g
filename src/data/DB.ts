import Dexie, { Table } from "dexie";

import Bool from "./Types";

export interface Task {
  id?: number;
  type: "SHORT_TERM" | "LONG_TERM";
  description: string;
  completed: Bool.TRUE | Bool.FALSE;
  updated: Date;
}

export interface Meeting {
  id?: number;
  description: string;
  created: Date;
  tags: string[];
}

export class DB extends Dexie {
  tasks!: Table<Task>;
  meetings!: Table<Meeting>;

  constructor() {
    super("l0g");
    this.version(1).stores({
      tasks: "++id, completed",
      meetings: "++id",
    });
  }
}

export const db = new DB();
