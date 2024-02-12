import React, { createContext } from "react";

export enum FilterSettingsActionType {
  NOT_SET,
  SET_SECTION_SELECTIONS,
  DEL_SECTION_SELECTION,
}
export type FilterSettingsValue = { valueLabel: string; value: string };
export type FilterSettings = Map<string, FilterSettingsValue[]>;
export type FilterSettingsAction = {
  type: FilterSettingsActionType;
  sectionSetting: { key: string; values: FilterSettingsValue[] };
};

export function filterSettingsReducer(
  filterSettings: FilterSettings,
  action: FilterSettingsAction,
) {
  switch (action.type) {
    case FilterSettingsActionType.SET_SECTION_SELECTIONS: {
      const newFilterSettings = new Map<string, FilterSettingsValue[]>(
        filterSettings.entries(),
      );
      newFilterSettings.set(
        action.sectionSetting.key,
        action.sectionSetting.values,
      );
      return newFilterSettings;
    }

    case FilterSettingsActionType.DEL_SECTION_SELECTION: {
      const newFilterSettings = new Map<string, FilterSettingsValue[]>(
        filterSettings.entries(),
      );
      const sectionValues = newFilterSettings.get(action.sectionSetting.key);

      if (sectionValues !== undefined) {
        newFilterSettings.set(
          action.sectionSetting.key,
          sectionValues.filter(
            (selection) =>
              selection.value !== action.sectionSetting.values[0].value,
          ),
        );
      }
      return newFilterSettings;
    }

    default:
      return filterSettings;
  }
}

export const FilterSettingsContext = createContext<FilterSettings>(
  new Map<string, FilterSettingsValue[]>(),
);
export const FilterSettingsDispatchContext = createContext<
  React.Dispatch<FilterSettingsAction>
>(() => {});
