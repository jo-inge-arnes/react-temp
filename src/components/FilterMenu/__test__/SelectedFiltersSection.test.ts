import { vi, describe, it, expect } from "vitest";
import { handleDelete } from "../SelectedFiltersSection";
import { FilterSettingsActionType } from "../FilterSettingsReducer";

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
});
