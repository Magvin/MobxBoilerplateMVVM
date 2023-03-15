import { observer } from "mobx-react";
import * as React from "react";
import { Button } from "../../../common/components/Button";
import CONSTANTS from "../../../constants/Config";
import LABEL from "../../../constants/Labels";
import useHomeViewModel from "../../../viewModels/useHomeViewModel";

export const Header: React.FC = observer(() => {
  const {
    companiesInformation,
    getCompaniesData,
    reloadData,
  } = useHomeViewModel();
  React.useEffect(() => {
    getCompaniesData();
  }, [getCompaniesData]);
  const { name } = companiesInformation ?? {};
  return (
    <header className="app__header">
      <div className="app__logo">
        <img
          src={CONSTANTS.LOGO}
          className="app__logo-image"
          alt={name}
          data-testid={`${name}Img`}
        />
        <span className="app__logo-txt">{LABEL.LAUNCHES}</span>
      </div>
      <Button
        onClick={() => reloadData()}
        classes="button button--reload"
        label={LABEL.RELOAD}
      />
    </header>
  );
});
