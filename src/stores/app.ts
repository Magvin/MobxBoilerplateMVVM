import CommentStore from "./comment";
import PostStore from "./posts";
import UserStore from "./user";

export default class AppStore {
  user = new UserStore(this);
  post = new PostStore(this);
  comment = new CommentStore(this);
}
