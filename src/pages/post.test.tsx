import { screen, waitFor } from "@testing-library/react";
import AppStore from "../stores/app";
import { renderWithMobx } from "../testUtils";
import PostPage from "./post";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Routes } from "react-router-dom";
import { MemoryRouter, Route } from "react-router-dom";
import { post as postFixture } from "../fixtures/posts";
import { comments as commentsFixture } from "../fixtures/comments";

const postId = "1";

const server = setupServer(
  rest.get(`/posts/${postId}`, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json([]));
  }),
  rest.get(`/posts/${postId}/comments`, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json([]));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Post page", () => {
  test("Renders loading and not found", async () => {
    const store = new AppStore();
    renderWithMobx({
      children: (
        <MemoryRouter initialEntries={[`/post/${postId}`]}>
          <Routes>
            <Route path="/post/:postId" element={<PostPage />} />
          </Routes>
        </MemoryRouter>
      ),
      appStore: store,
    });
    const text = screen.queryByText("loading...");
    const notFound = await screen.findByTestId("postNotFound");

    expect(text).toBeInTheDocument();
    await waitFor(() => expect(notFound).toBeInTheDocument());
  });

  test("Renders post with comments section", async () => {
    const store = new AppStore();
    server.use(
      rest.get(`/posts/${postId}`, (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(postFixture));
      }),
      rest.get(`/posts/${postId}/comments`, (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json([commentsFixture]));
      })
    );
    renderWithMobx({
      children: (
        <MemoryRouter initialEntries={[`/post/${postId}`]}>
          <Routes>
            <Route path="/post/:postId" element={<PostPage />} />
          </Routes>
        </MemoryRouter>
      ),
      appStore: store,
    });
    const post = await screen.findByTestId("post");
    expect(post).toBeInTheDocument();
    [commentsFixture].forEach((item) => {
      expect(screen.getByTestId("nameEmail").textContent).toEqual(
        `${item.name} • ${item.email}`
      );
    });
  });
});
