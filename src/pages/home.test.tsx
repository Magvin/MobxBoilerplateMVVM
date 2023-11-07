import { act, screen } from "@testing-library/react";
import AppStore from "../stores/app";
import { renderWithMobx } from "../testUtils";
import HomePage from "./home";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";

const server = setupServer(
  rest.get("/posts", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json([]));
  }),
  rest.get("/users", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json([]));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home page", () => {
  test("Renders loading", async () => {
    const store = new AppStore();

    renderWithMobx({
      children: <HomePage />,
      appStore: store,
    });

    await act(async () => {
      /* fire events that update state */

      const text = await screen.findByText("loading...");
      expect(text).toBeInTheDocument();
    });
  });
  test("Renders todo list", async () => {
    const store = new AppStore();
    server.use(
      rest.get("/posts", (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(
          ctx.json([
            {
              id: 1,
              title: "Title",
              body: "Description",
            },
          ])
        );
      })
    );
    renderWithMobx({
      children: (
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      ),
      appStore: store,
    });
    const text = screen.queryByTestId("loading");
    expect(text).toBeInTheDocument();
    const postH1 = await screen.findByText("Posts");
    const descriptionText = await screen.findByText("Description");

    expect(postH1).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });
});
