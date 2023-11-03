import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../context";
import Post from "../components/post";
import Comment from "../components/comment";

const PostPage = observer(() => {
  const { api, store } = useAppContext();

  const [loading, setLoading] = useState(false);

  const params = useParams<{ postId: string }>();

  const postId = Number(params.postId);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await api.post.getById(postId);
        await api.comment.getByPostId(postId);
      } finally {
        setLoading(false);
      }
    })();
  }, [api, postId]);

  if (loading) {
    return <div>loading...</div>;
  }

  const post = store.post.byId.get(Number(params.postId));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Post ellipsisBody={false} post={post} />
      <h2>Comments </h2>
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
});

export default PostPage;
