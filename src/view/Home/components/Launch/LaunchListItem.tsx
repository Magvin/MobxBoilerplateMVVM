import React from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Launches } from "../../../../viewModels/types";

dayjs.extend(advancedFormat);

export const LaunchItem = ({
  item,
  index,
}: {
  index: number;
  item: Launches;
}) => {
  const { flight_number, name, date_utc } = item;

  return (
    <li key={`${index}-${name}`} className="launch-list__item">
      <div className="launch-list__item-title">
        <h4>{`#${flight_number}`}</h4>
        <h3>{`${name}`}</h3>
      </div>
      <div>
        <span>{dayjs(date_utc).format("Do MMM YYYY")}</span>
      </div>
    </li>
  );
};
