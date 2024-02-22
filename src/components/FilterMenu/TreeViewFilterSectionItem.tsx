import React, { PropsWithChildren } from "react";
import Checkbox from "@mui/material/Checkbox";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FilterSettingsValue } from "./FilterSettingsContext";

type TreeViewFilterSectionItemProps = PropsWithChildren<{
  filterKey: string;
  labeledValue: FilterSettingsValue;
  selectedIds: string[];
  handleCheckboxChange: (checked: boolean, value: string) => void;
}>;

export const TreeViewFilterSectionItem = (
  props: TreeViewFilterSectionItemProps,
) => {
  const { filterKey, labeledValue, selectedIds, handleCheckboxChange } = props;
  const isSelected = selectedIds.includes(labeledValue.value);

  return (
    <TreeItem
      key={`tree-view-item-${filterKey}-${labeledValue.value}`}
      data-testid={`tree-view-item-${labeledValue.value}`}
      nodeId={labeledValue.value}
      label={
        <>
          <Checkbox
            key={`checkbox--${filterKey}-${labeledValue.value}`}
            data-testid={`checkbox--${filterKey}-${labeledValue.value}`}
            checked={isSelected}
            onClick={(event) => {
              handleCheckboxChange(!isSelected, labeledValue.value);
              event.stopPropagation();
            }}
          />
          {labeledValue.valueLabel}
        </>
      }
    >
      {props.children}
    </TreeItem>
  );
};

export default TreeViewFilterSectionItem;
