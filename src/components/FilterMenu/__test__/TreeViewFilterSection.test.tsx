import { vi, describe, it, expect } from "vitest";
import { findFilterSettingValue, handleSelect } from "../TreeViewFilterSection";
import { FilterSettingsActionType } from "../FilterSettingsReducer";

describe("TreeViewFilterSection", () => {
  const treeData = [
    {
      nodeValue: {
        value: "rootValue",
        valueLabel: "Root Value",
      },
      children: [
        {
          nodeValue: {
            value: "childValue-0-0",
            valueLabel: "Child 0-0",
          },
          children: [],
        },
        {
          nodeValue: {
            value: "childValue-0-1",
            valueLabel: "Child 0-1",
          },
          children: [
            {
              nodeValue: {
                value: "childValue-0-1-0",
                valueLabel: "Child 0-1-0",
              },
            },
          ],
        },
      ],
    },
    {
      nodeValue: {
        value: "rootValue2",
        valueLabel: "Root Value 2",
      },
    },
  ];

  describe("findFilterSettingValue()", () => {
    it("should return the correct FilterSettingsValue for a root nodeId", () => {
      const result = findFilterSettingValue("0", treeData);
      expect(result).toEqual({
        value: "rootValue",
        valueLabel: "Root Value",
      });
    });
    it("should return the correct FilterSettingsValue for second root nodeId", () => {
      const result = findFilterSettingValue("1", treeData);
      expect(result).toEqual({
        value: "rootValue2",
        valueLabel: "Root Value 2",
      });
    });
    it("should throw error for nodeId at non-existing level", () => {
      expect(() => findFilterSettingValue("1-2", treeData)).toThrowError();
    });
    it("should throw error for nodeId at non-existing index", () => {
      expect(() => findFilterSettingValue("2", treeData)).toThrowError();
    });
    it("should return correct child of a child node", () => {
      const result = findFilterSettingValue("0-1-0", treeData);
      expect(result).toEqual({
        value: "childValue-0-1-0",
        valueLabel: "Child 0-1-0",
      });
    });
  });

  describe("handleSelect()", () => {
    it("should work with a string, non-array nodeId", () => {
      const mockDispatch = vi.fn();

      handleSelect("filterkey", "0", treeData, mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: "filterkey",
          values: [treeData[0].nodeValue],
        },
      });
    });

    it("should work with array of nodeIds", () => {
      const mockDispatch = vi.fn();

      handleSelect("filterkey", ["0", "0-1"], treeData, mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: "filterkey",
          values: [treeData[0].nodeValue, treeData[0].children?.[1].nodeValue],
        },
      });
    });
  });
});
