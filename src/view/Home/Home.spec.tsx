import * as React from "react";
import { Application } from "../../common/app/application";
import renderWithMobx from "../../testUtils";
import { initializeHome } from "../../viewModels/initHomeViewModel";
import { Home } from ".";
import { HOME_SERVICE_KEY } from "../../constants/application";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { IHomeViewModel, HomeViewModel } from "../../viewModels/homeViewModel";
import { launchesRequestMock } from "./fixtures/launches";
import { companiesInformation } from "./fixtures/companiesInformation";

describe("Home componet", () => {
  let app: Common.IApplication;
  beforeEach(() => {
    app = new Application();
    initializeHome(app);
  });
  it("should see if getCompaniesData have been called", async () => {
    const viewModel = app.getService(HOME_SERVICE_KEY) as IHomeViewModel;
    (viewModel as unknown as typeof HomeViewModel).apiService.getCompaniesData =
      jest.fn().mockResolvedValue(companiesInformation);

    const { getByTestId } = renderWithMobx({
      children: <Home />,
      application: app,
    });
    await waitFor(() => expect(getByTestId("SpaceXImg")).toBeInTheDocument());
  });
  it("should see if getLaunches have been calles", async () => {
    const viewModel = app.getService(HOME_SERVICE_KEY) as IHomeViewModel;
    (viewModel as unknown as typeof HomeViewModel).apiService.getLaunches = jest
      .fn()
      .mockResolvedValue({
        status: 200,
        data: launchesRequestMock,
      });
    const { getByTestId } = renderWithMobx({
      children: <Home />,
      application: app,
    });
    await waitForElementToBeRemoved(() => getByTestId("loading"));
    expect(viewModel.launches.length).toBe(launchesRequestMock.length);
  });
});
