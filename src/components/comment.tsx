import { observer } from "mobx-react";
import CommentModel from "../models/comment";

const Comment: React.FC<{ comment: CommentModel }> = observer(({ comment }) => {
  return (
    <div data-testid="comments" key={comment.id}>
      <strong data-testid="nameEmail">
        {comment.name} • {comment.email}
      </strong>
      <p>{comment.body}</p>
      <br />
    </div>
  );
});

export default Comment;
