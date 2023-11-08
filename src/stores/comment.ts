import { action, computed, makeObservable, observable } from "mobx";

import IComment from "../types/comment";
import Comment from "../models/comment";
import AppStore from "./app";

export default class CommentStore {
  byId = observable.map<number, Comment>();

  constructor(private store: AppStore) {
    makeObservable(this);
  }

  @action load(comments: IComment[]) {
    comments.forEach((it) => this.byId.set(it.id, new Comment(this.store, it)));
  }

  @computed get all() {
    return Array.from(this.byId.values());
  }

  newComment = (comment: IComment) => {
    this.byId.set(this.byId.size + 1, new Comment(this.store, comment));
  };
}
