import { vi, describe, it, expect } from "vitest";
import {
  flattenTreeValues,
  handleSelect,
  initFilterSettingsValuesMap,
} from "../TreeViewFilterSection";
import { FilterSettingsActionType } from "../FilterSettingsReducer";
import exp from "constants";

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

  describe("flattenTreeValues()", () => {
    it("should return an array of all node values", () => {
      const result = flattenTreeValues([], treeData);
      expect(result).toEqual([
        { value: "rootValue", valueLabel: "Root Value", parentIds: [] },
        {
          value: "childValue-0-0",
          valueLabel: "Child 0-0",
          parentIds: ["rootValue"],
        },
        {
          value: "childValue-0-1",
          valueLabel: "Child 0-1",
          parentIds: ["rootValue"],
        },
        {
          value: "childValue-0-1-0",
          valueLabel: "Child 0-1-0",
          parentIds: ["rootValue", "childValue-0-1"],
        },
        { value: "rootValue2", valueLabel: "Root Value 2", parentIds: [] },
      ]);
    });
  });

  describe("initFilterSettingsValuesMap()", () => {
    it("should return a map with of all node values", () => {
      const result = initFilterSettingsValuesMap(treeData);

      expect(Array.from(result.entries())).toEqual([
        [
          "rootValue",
          [{ value: "rootValue", valueLabel: "Root Value", parentIds: [] }],
        ],
        [
          "childValue-0-0",
          [
            {
              value: "childValue-0-0",
              valueLabel: "Child 0-0",
              parentIds: ["rootValue"],
            },
          ],
        ],
        [
          "childValue-0-1",
          [
            {
              value: "childValue-0-1",
              valueLabel: "Child 0-1",
              parentIds: ["rootValue"],
            },
          ],
        ],
        [
          "childValue-0-1-0",
          [
            {
              value: "childValue-0-1-0",
              valueLabel: "Child 0-1-0",
              parentIds: ["rootValue", "childValue-0-1"],
            },
          ],
        ],
        [
          "rootValue2",
          [{ value: "rootValue2", valueLabel: "Root Value 2", parentIds: [] }],
        ],
      ]);
    });
  });

  describe("handleSelect()", () => {
    const idToValueMap = initFilterSettingsValuesMap(treeData);

    it("should work with a string, non-array nodeId", () => {
      const mockDispatch = vi.fn();

      handleSelect("filterkey", "rootValue", idToValueMap, mockDispatch);

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

      handleSelect("filterkey", "childValue-0-1", idToValueMap, mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: "filterkey",
          values: [
            {
              value: "childValue-0-1",
              valueLabel: "Child 0-1",
            },
          ],
        },
      });
    });
  });
});
