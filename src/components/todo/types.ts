export interface IToDo {
  task: string;
  done: boolean;
  id: string;
}

export enum EActions {
  delete = "delete",
  toggleDone = "toggleDone",
}
