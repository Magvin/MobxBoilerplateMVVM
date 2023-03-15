import dayjs from "dayjs";
import { observer } from "mobx-react";
import React from "react";
import LABEL from "../../../../constants/Labels";
import { Launches } from "../../../../viewModels/types";
import useHomeViewModel from "../../../../viewModels/useHomeViewModel";
import { LaunchItem } from "./LaunchListItem";

export const LaunchList = observer(
  ({ items, sort }: { items: Launches[]; sort: boolean }) => {
    const { filter, error } = useHomeViewModel();
    let filteredItems = [...items];
    let launches = [];
    launches = filteredItems?.sort((a, b) => {
      const x = a.flight_number;
      const y = b.flight_number;
      return sort ? y - x : x - y;
    });

    if (filter !== "") {
      launches = filteredItems.filter(
        (item) => dayjs(item.date_utc).year().toString() === filter
      );
    }

    if (launches.length <= 0 || error) {
      return error ? (
        <div className="launch-list--error">{error}</div>
      ) : (
        <div className="launch-list--loading" data-testid="loading">
          {LABEL.LOADING}
        </div>
      );
    }

    return (
      <ul className="launch-list">
        {launches.map((item, index) => {
          return <LaunchItem key={index} item={item} index={index} />;
        })}
      </ul>
    );
  }
);
