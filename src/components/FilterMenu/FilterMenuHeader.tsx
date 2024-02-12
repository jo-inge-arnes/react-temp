import { useState, useContext } from "react";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsActionType,
  FilterSettingsContext,
  FilterSettingsDispatchContext,
} from "./FilterSettingsContext";

const FilterMenuHeader = (props: FilterMenuSectionProps) => {
  const sectionKey = "test";
  const [count, setCount] = useState(0);
  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    const curValues = filterSettings.get(sectionKey) || [];
    const newValues = [
      ...curValues,
      { valueId: count.toString(), value: count.toString() },
    ];

    filterSettingsDispatch({
      type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
      sectionSetting: {
        key: sectionKey,
        values: newValues,
      },
    });
  };

  return (
    <>
      <button onClick={() => handleClick()}>Count</button>
      {filterSettings.get("test")?.map((v) => (
        <div key={v.valueLabel}>
          {v.valueLabel}: {v.value}
        </div>
      ))}
    </>
  );
};

export default FilterMenuHeader;
