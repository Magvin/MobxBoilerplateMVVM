import { observer } from "mobx-react";
import React from "react";
import useHomeViewModel from "../../../viewModels/useHomeViewModel";

export const Select = observer(({ label }: { label: string }) => {
  const { years, filter, setFilter } = useHomeViewModel();

  return (
    <select
      name={label}
      onChange={(event) => {
        setFilter(event.target.value);
      }}
      value={filter}
    >
      <>
        <option value="">{label}</option>
        {years &&
          years.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
      </>
    </select>
  );
});
