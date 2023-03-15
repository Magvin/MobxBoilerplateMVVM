import { ApiService } from "../services/apiServices";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { Launches, TCompaniesInfo } from "./types";
import dayjs from "dayjs";
import LABEL from "../constants/Labels";
export interface IHomeViewModel {
  companiesInformation: TCompaniesInfo | null;
  launches: Launches[];
  years: number[];
  getCompaniesData: () => void;
  getLaunchList: () => void;
  setFilter: (val: string) => void;
  filter: string;
  reloadData: () => void;
  error: null | string;
}

export class HomeViewModel implements IHomeViewModel {
  @observable.ref companiesInformation: TCompaniesInfo | null = null;
  @observable.ref launches: Launches[] = [];
  @observable.ref years: number[] = [];
  @observable filter = "";
  @observable error: string | null = null;

  static apiService: ApiService;
  constructor(private apiService: ApiService) {
    makeAutoObservable(this);
  }

  @action.bound
  setFilter = (val: string) => {
    this.filter = val;
  };

  @action.bound
  reloadData = async () => {
    this.filter = "";
    this.error = "";
    await this.getLaunchList();
  };

  @action.bound
  getCompaniesData = async () => {
    const response = await this.apiService.getCompaniesData();
    runInAction(() => {
      this.companiesInformation = response;
    });
  };
  @action.bound
  getLaunchList = async () => {
    const response = await this.apiService.getLaunches();
    runInAction(() => {
      if (response.status !== 200) {
        this.error = LABEL.ERROR;
      }
      const { data } = response;
      this.launches = data;
      this.years = data.reduce((acc, cur) => {
        const normalizedYear = dayjs(cur.date_utc).year();
        if (acc.find((item) => item === normalizedYear)) {
          return acc;
        }
        acc.push(normalizedYear);
        return acc;
      }, [] as number[]);
    });
  };
}
