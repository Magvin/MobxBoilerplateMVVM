import { observer } from "mobx-react"
import * as React from "react"
import { TPost } from "../viewModels/types"
import useHomeViewModel from "../viewModels/useHomeViewModel"
export const Home = observer(() => {
  const { posts, getPosts } = useHomeViewModel()
  React.useEffect(() => {
    getPosts()
  }, [getPosts])

  if (!posts.length) {
    return <div data-testid="loading">Loading...</div>
  }
  return (
    <div data-testid="home-page">
      <h1>POSTS</h1>
      {posts.map((post: TPost) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
})
