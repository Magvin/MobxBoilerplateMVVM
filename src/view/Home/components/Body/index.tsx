import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Button } from "../../../../common/components/Button";
import { Select } from "../../../../common/components/Select";
import CONSTANTS from "../../../../constants/Config";
import LABEL from "../../../../constants/Labels";
import useHomeViewModel from "../../../../viewModels/useHomeViewModel";
import { LaunchList } from "../Launch/LaunchList";
import { toJS } from "mobx";
export const Body = observer(() => {
  const { launches, getLaunchList, filter } = useHomeViewModel();
  const [sort, setSort] = useState(false);

  useEffect(() => {
    getLaunchList();
  }, [getLaunchList]);

  return (
    <div className="app__body">
      <div>
        <img
          src={CONSTANTS.SPACE_X_IMAGE}
          srcSet={CONSTANTS.SPACE_X_RETINA_IMAGES}
          className="app__main-image"
          alt="Launch Home"
        />
      </div>
      <div className="app__launches">
        <div className="app__filters">
          <Select label={LABEL.FILTER_BY_YEAR} />
          <Button
            filter={filter}
            classes="button button--sort"
            onClick={() => setSort(!sort)}
            label={sort ? LABEL.ASC : LABEL.DESC}
          />
        </div>

        <LaunchList items={toJS(launches)} sort={sort} />
      </div>
    </div>
  );
});
