import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import Post from "../components/post";

const HomePage = observer(() => {
  const { api, store } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await api.post.getAll();
        await api.user.getAll();
      } finally {
        setLoading(false);
      }
    })();
  }, [api]);

  if (loading) {
    return <div data-testid="loading">loading...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {store.post.all.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
});

export default HomePage;
