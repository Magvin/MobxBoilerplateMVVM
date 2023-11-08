import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../context";
import Post from "../components/post";
import Comment from "../components/comment";
import { Box, Button, Modal } from "@mui/material";
import styled from "@emotion/styled";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostPage = observer(() => {
  const { api, store } = useAppContext();
  const [model, setOpenModel] = useState(false);
  const [value, setCommentValue] = useState("");

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

  const handleNewComment = () => {
    setOpenModel(!model);
  };

  const handleSubmit = () => {
    store.comment.newComment({
      id: Math.random() * 1000,
      postId,
      name: "",
      email: "",
      body: value,
    });
  };

  if (loading) {
    return <div>loading...</div>;
  }

  const post = store.post.byId.get(Number(params.postId));

  if (!post) {
    return <div data-testid="postNotFound">Post not found</div>;
  }

  return (
    <div data-testid="post">
      <Post ellipsisBody={false} post={post} />
      <h2>Comments </h2>
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <Button onClick={handleNewComment}>New Comment</Button>
      <Modal open={model} onClose={handleNewComment}>
        <Box sx={style}>
          <input
            type="text"
            placeholder="Your comment"
            value={value}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
});

export default PostPage;
