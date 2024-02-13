import React, { useReducer } from "react";
import {
  FilterSettingsContext,
  FilterSettingsDispatchContext,
  filterSettingsReducer,
  FilterSettingsValue,
} from "../../src/components/FilterMenu/FilterSettingsContext";

const initialState = () => {
  const defaultValue = { valueLabel: "Default Value", value: "default-value" };
  const initialFilterSelections = new Map<string, FilterSettingsValue[]>();
  initialFilterSelections.set("example", [
    defaultValue,
    { valueLabel: "Example 1", value: "example-1" },
    { valueLabel: "Example 2", value: "example-2" },
  ]);
  return {
    map: initialFilterSelections,
    defaults: new Map<string, FilterSettingsValue[]>([
      ["example", [defaultValue]],
    ]),
  };
};

export default function FilterMenuSectionDecorator(Story, context) {
  const [filterSettings, dispatch] = useReducer(
    filterSettingsReducer,
    initialState(),
  );

  return (
    <FilterSettingsContext.Provider value={filterSettings}>
      <FilterSettingsDispatchContext.Provider value={dispatch}>
        <Story />
      </FilterSettingsDispatchContext.Provider>
    </FilterSettingsContext.Provider>
  );
}
