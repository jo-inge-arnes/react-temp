import { createContext } from 'react';

export type FilterSettingsAction = {
    type: string;
};

export class FilterSettings {
    private readonly _selectedFilters: Map<string, string[]>;

    constructor() {
        this._selectedFilters = new Map<string, string[]>();
    }

    setFilterSelection(filterName: string, selectedValues: string[]) {
        this._selectedFilters.set(filterName, selectedValues);
    }

    get selectedFilters() {
        return this._selectedFilters;
    }
};

export function filterSettingsReducer(filterSettings: FilterSettings, action: FilterSettingsAction) {
    switch (action.type) {
        default:
            return filterSettings;
    }
}

export const FilterSettingsContext = createContext<FilterSettings | null>(null);
export const FilterSettingsDispatchContext = createContext<React.Dispatch<FilterSettingsAction> | null>(null);
