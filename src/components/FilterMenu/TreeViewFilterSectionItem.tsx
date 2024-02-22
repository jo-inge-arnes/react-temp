import React, { PropsWithChildren } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
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

  return (
    <TreeItem
      key={`tree-view-item-${filterKey}-${labeledValue.value}`}
      data-testid={`tree-view-item-${labeledValue.value}`}
      nodeId={labeledValue.value}
      onClick={(event) => {
        event.stopPropagation();
      }}
      label={
        <>
          <Checkbox
            key={`checkbox--${filterKey}-${labeledValue.value}`}
            data-testid={`checkbox--${filterKey}-${labeledValue.value}`}
            checked={selectedIds.includes(labeledValue.value)}
            onChange={(event) => {
              event.stopPropagation();
              handleCheckboxChange(event.target.checked, labeledValue.value);
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
