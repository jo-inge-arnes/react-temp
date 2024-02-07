import { createContext } from 'react';

export type FilterSettingsAction = {
    type: string;
    sectionSetting: { key: string, values: string[] };
};

export type FilterSettings = Map<string, string[]>;

export function filterSettingsReducer(filterSettings: FilterSettings, action: FilterSettingsAction) {
    switch (action.type) {
        default:
            const newFilterSettings = new Map<string, string[]>(filterSettings.entries());
            newFilterSettings.set(action.sectionSetting.key, action.sectionSetting.values);
            return newFilterSettings;
    }
}

export const FilterSettingsContext = createContext<FilterSettings>(new Map<string, string[]>());
export const FilterSettingsDispatchContext = createContext<React.Dispatch<FilterSettingsAction> | null>(null);
