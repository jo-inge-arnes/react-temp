import React, { useReducer } from "react";
import { 
    FilterSettingsContext,
    FilterSettingsDispatchContext,
    filterSettingsReducer,
    FilterSettingsValue
} from "../../src/components/FilterMenu/FilterSettingsContext";

const initialFilterSelections = () => {
    const initialFilterSelections = new Map<string, FilterSettingsValue[]>();
    initialFilterSelections.set("test", [{ valueLabel: "-1", value: "-100" }]);
    return initialFilterSelections;
  }

export default function FilterMenuSectionDecorator(Story, context) {
    const [filterSettings, dispatch] = useReducer(filterSettingsReducer, initialFilterSelections());

    return (
        <FilterSettingsContext.Provider value={filterSettings}>
            <FilterSettingsDispatchContext.Provider value={dispatch}>
                <Story />
            </FilterSettingsDispatchContext.Provider>
        </FilterSettingsContext.Provider>
    );
}