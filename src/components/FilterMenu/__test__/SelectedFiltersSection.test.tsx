import { vi, describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import SelectedFiltersSection, {
  handleDelete,
} from "../SelectedFiltersSection";
import { FilterSettingsActionType } from "../FilterSettingsReducer";
import FilterMenu, { FilterMenuSectionProps } from "..";
import { FilterSettings, FilterSettingsValue } from "../FilterSettingsContext";

const filterSettingsDispatch = vi.fn();

describe("SelectedFiltersSection", () => {
  describe("handleDelete", () => {
    it("should corectly split the chipId into params passed to the dispatch function", () => {
      handleDelete("key---value", filterSettingsDispatch);
      expect(filterSettingsDispatch).toHaveBeenCalledWith({
        type: FilterSettingsActionType.DEL_SECTION_SELECTIONS,
        sectionSetting: {
          key: "key",
          values: [{ value: "value", valueLabel: "" }],
        },
      });
    });
  });

  describe("Rendered component", () => {
    const initialSelections = new Map<string, FilterSettingsValue[]>(
      Object.entries({
        testKey: [{ value: "initialValue", valueLabel: "Initial Selection" }],
      }),
    );

    const defaultValues = new Map<string, FilterSettingsValue[]>(
      Object.entries({
        testKey: [{ value: "defaultValue", valueLabel: "Default Selection" }],
      }),
    );

    it("should render a chip for each filter setting", () => {
      const filterSettings: FilterMenuSectionProps = {
        sectionid: "testSection",
        sectiontitle: "testTitle",
        filterkey: "testKey",
      };

      const result = render(
        <FilterMenu
          initialSelections={initialSelections}
          defaultValues={defaultValues}
        >
          <SelectedFiltersSection {...filterSettings} />
        </FilterMenu>,
      );

      expect(result.getByText("Initial Selection")).toBeInTheDocument();
    });
  });
});
