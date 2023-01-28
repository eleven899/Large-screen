import { MainDataState } from "./main/type";
export interface IMainStore {
  mainMoudle: MainDataState;
}
export interface IMainState {
  name: string;
}
export interface IRootStore {
  name: string;
  age: number;
}
