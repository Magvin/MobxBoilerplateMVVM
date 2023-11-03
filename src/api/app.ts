import AppStore from "../stores/app";
import CommentApi from "./comment";
import PostApi from "./post";
import transport from "./transport";
import UserApi from "./user";

export default class AppApi {
  user: UserApi;
  post: PostApi;
  comment: CommentApi;

  client = transport();
  constructor(store: AppStore) {
    this.user = new UserApi(this, store);
    this.post = new PostApi(this, store);
    this.comment = new CommentApi(this, store);
  }
}
