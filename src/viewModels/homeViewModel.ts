import { ApiService } from "../services/apiServices"
import { action, makeAutoObservable, observable, runInAction } from "mobx"
import { TPost } from "./types"
export interface IHomeViewModel {
  posts: TPost[]
  getPosts: () => void
}

export class HomeViewModel implements IHomeViewModel {
  @observable.ref posts: TPost[] = []
  static apiService: ApiService
  constructor(private apiService: ApiService) {
    makeAutoObservable(this)
  }

  @action.bound
  getPosts = async () => {
    const response = await this.apiService.getPosts()
    runInAction(() => {
      this.posts = response
    })
  }
}
