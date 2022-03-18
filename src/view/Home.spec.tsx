import * as React from "react"
import { Application } from "../common/app/application"
import renderWithMobx from "../testUtils"
import { initializeHome } from "../viewModels/initHomeViewModel"
import { Home } from "./Home"
import { HOME_SERVICE_KEY } from "../constants/application"
import { waitForElementToBeRemoved } from "@testing-library/react"
import { IHomeViewModel, HomeViewModel } from "../viewModels/homeViewModel"

describe("Home componet", () => {
  let app: Common.IApplication

  beforeEach(() => {
    app = new Application()
    initializeHome(app)
  })
  it("should see if getPosts have been called", async () => {
    const viewModel = app.getService(HOME_SERVICE_KEY) as IHomeViewModel
    ;(viewModel as unknown as typeof HomeViewModel).apiService.getPosts = jest
      .fn()
      .mockResolvedValue([{ id: 1, title: "test" }])
    const { getByTestId } = renderWithMobx({ children: <Home />, application: app })
    await waitForElementToBeRemoved(() => getByTestId("loading"))
    expect((viewModel as unknown as typeof HomeViewModel).apiService.getPosts).toHaveBeenCalled()
    expect(getByTestId("home-page")).toBeTruthy()
  })
})
