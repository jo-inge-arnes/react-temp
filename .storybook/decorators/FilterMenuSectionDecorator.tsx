import React from "react";
import FilterMenu from "../../src/components/FilterMenu";
import { FilterSettingsValue } from "../../src/components/FilterMenu/FilterSettingsContext";

const initialState = () => {
  const filterkey = "example";
  const defaultValue = { valueLabel: "Default Value", value: "default-value" };
  const initialFilterSelections = new Map<string, FilterSettingsValue[]>();
  initialFilterSelections.set(filterkey, [
    defaultValue,
    { valueLabel: "Example 1", value: "example-1" },
    { valueLabel: "Example 2", value: "example-2" },
  ]);
  return {
    map: initialFilterSelections,
    defaults: new Map<string, FilterSettingsValue[]>([
      [filterkey, [defaultValue]],
    ]),
  };
};

export default function FilterMenuSectionDecorator(Story, context) {
  const { map, defaults } = initialState();
  return (
    <FilterMenu initialSelections={map} defaultValues={defaults}>
      <Story />
    </FilterMenu>
  );
}
