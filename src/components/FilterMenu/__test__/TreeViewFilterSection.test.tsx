import { vi, describe, it, expect } from "vitest";
import { findFilterSettingValue } from "../TreeViewFilterSection";

describe("TreeViewFilterSection", () => {
  describe("findFilterSettingValue", () => {
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
});
