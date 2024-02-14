import React from "react";
import FilterMenu, {
  FilterMenuSelectionChangedHandler,
} from "../../src/components/FilterMenu";
import { FilterSettingsValue } from "../../src/components/FilterMenu/FilterSettingsContext";

const createSettingsAndDefaults = () => {
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

const onSelectionChanged: FilterMenuSelectionChangedHandler = (
  newVals,
  oldVals,
  action,
) => {
  console.log(action);
  console.log(newVals);
};

export default function FilterMenuSectionDecorator(Story: any, context: any) {
  const { map, defaults } = createSettingsAndDefaults();

  return (
    <FilterMenu
      onSelectionChanged={onSelectionChanged}
      initialSelections={map}
      defaultValues={defaults}
    >
      {Story()}
    </FilterMenu>
  );
}
