import { useApplication } from "../common/app/provider";
import { useRef } from "react";
import { HomeViewModel, IHomeViewModel } from "./homeViewModel";
import { HOME_SERVICE_KEY } from "../constants/application";

const useHomeViewModel = (homeViewModel?: HomeViewModel) => {
  const app = useApplication();
  const viewModel = useRef(
    homeViewModel || app.getService<any>(HOME_SERVICE_KEY)
  );
  return viewModel.current as IHomeViewModel;
};

export default useHomeViewModel;
