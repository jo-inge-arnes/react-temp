import type {} from "@mui/x-tree-view/themeAugmentation";
import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { FilterMenuSectionProps } from ".";
import {
  FilterSettingsContext,
  FilterSettingsValue,
} from "./FilterSettingsContext";
import { FilterSettingsDispatchContext } from "./FilterSettingsReducer";
import { FilterSettingsAction } from "./FilterSettingsReducer";
import { FilterSettingsActionType } from "./FilterSettingsReducer";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TreeViewFilterSectionItem } from "./TreeViewFilterSectionItem";

/**
 * The structure of a node in the tree data used with the TreeViewFilterSection component
 */
export type TreeViewFilterSectionNode = {
  nodeValue: FilterSettingsValue;
  children?: TreeViewFilterSectionNode[];
};

/**
 * Same as FilterSettingsValue with the addition of a property with the
 * parent ids.
 */
export type TreeViewFilterSettingsValue = FilterSettingsValue & {
  parentIds: string[];
};

/**
 * Props for the TreeViewFilterSection component, which extends the FilterMenuSectionProps
 * used with the FilterMenu component. Accepts the treeData prop, which is an array of
 * TreeViewFilterSectionNode objects that represent the tree structure of the filter options.
 * Also accepts the multiselect prop, which is a boolean that determines whether the filter
 * is single or multi-select.
 */
export type TreeViewSectionProps = FilterMenuSectionProps & {
  multiselect?: boolean;
  treedata: TreeViewFilterSectionNode[];
};

/**
 * Recursive function that builds the TreeView from the tree data one level at a time
 *
 * @param treeData The tree data with the TreeViewFilterSectionNode structure
 * @param filterKey The filter key for the section
 * @param prefix The hyphen-separated indices of the parent node's position in the tree
 * @returns A tree view item for the corrent node and its children
 */
const buildTreeLevel = (
  treeData: TreeViewFilterSectionNode[],
  filterKey: string,
  prefix: string,
  selectedIds: string[],
  handleCheckboxChange: (checked: boolean, value: string) => void,
) => {
  return treeData.map((node, index) => {
    const position = prefix ? `${prefix}-${index}` : `${index}`;

    return (
      <TreeViewFilterSectionItem
        key={`tree-view-item-${filterKey}-${node.nodeValue.value}`}
        filterKey={filterKey}
        labeledValue={node.nodeValue}
        selectedIds={selectedIds}
        handleCheckboxChange={handleCheckboxChange}
      >
        {node.children &&
          buildTreeLevel(
            node.children,
            filterKey,
            position,
            selectedIds,
            handleCheckboxChange,
          )}
      </TreeViewFilterSectionItem>
    );
  });
};

/**
 * Function that builds the TreeView from the tree data
 *
 * @param props
 * @returns The TreeItem components for the TreeView
 */
export const buildTreeView = (
  props: TreeViewSectionProps,
  selectedIds: string[],
  handleCheckboxChange: (checked: boolean, value: string) => void,
) => {
  return (
    <>
      {buildTreeLevel(
        props.treedata,
        props.filterkey,
        "",
        selectedIds,
        handleCheckboxChange,
      )}
    </>
  );
};

/**
 * Function used for updating the FilterMenu state when the user selects nodes in the TreeView
 *
 * @param filterKey The filter key for the section
 * @param nodeIds The nodeId or nodeIds of the selected nodes
 * @param idToValueMap The map used for looking up FilterSettingValues by values/nodeIds
 * @param filterSettingsDispatch The dispatch function for the filter settings reducer that manages changes to the filter settings state
 */
export const handleSelect = (
  filterKey: string,
  nodeIds: string[] | string,
  idToValueMap: Map<string, TreeViewFilterSettingsValue>,
  filterSettingsDispatch: React.Dispatch<FilterSettingsAction>,
) => {
  const selectedNodeIds = Array.isArray(nodeIds) ? nodeIds : [nodeIds];
  const selectedFilterSettingValues = selectedNodeIds
    .map((nodeId) => idToValueMap.get(nodeId))
    .filter((value) => value !== undefined)
    .flat() as TreeViewFilterSettingsValue[];

  filterSettingsDispatch({
    type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
    sectionSetting: {
      key: filterKey,
      values: selectedFilterSettingValues.map((value) => {
        return {
          value: value.value,
          valueLabel: value.valueLabel,
        };
      }),
    },
  });
};

/**
 * Function used to retrieve the selected values from the filter settings state
 *
 * @param values The FilterSettingsValue array for the section
 * @returns The selected values from the filter settings state or undefined
 */
export const getSelectedNodeIds = (
  values: FilterSettingsValue[] | undefined,
) => {
  if (!values) {
    return [];
  }

  return values.map((value) => value.value);
};

/**
 * Flattens the tree data into an array of FilterSettingsValues
 *
 * @param parent The parent node
 * @param treeData The tree data with the TreeViewFilterSectionNode structure
 * @returns A flat array of the tree's FilterSettingsValue objects
 */
export const flattenTreeValues = (
  parentIds: string[],
  treeData: TreeViewFilterSectionNode[],
) => {
  const flattenedValues: TreeViewFilterSettingsValue[] = [];

  treeData.forEach((node) => {
    const nodeWithParentIds = { ...node.nodeValue, parentIds: parentIds };
    flattenedValues.push(nodeWithParentIds);
    if (node.children) {
      flattenedValues.push(
        ...flattenTreeValues(
          [...parentIds, node.nodeValue.value],
          node.children,
        ),
      );
    }
  });

  return flattenedValues;
};

/**
 * Initialzes the map used for looking up FilterSettingValues by values/nodeIds
 *
 * @param treeData The TreeViewFilterSectionNode structure
 * @returns A map with the string values as keys and TreeViewFilterSettingsValue-objects as values
 */
export const initFilterSettingsValuesMap = (
  treeData: TreeViewFilterSectionNode[],
) => {
  const filterSettingsValuesMap = new Map<
    string,
    TreeViewFilterSettingsValue
  >();
  const treeValues = flattenTreeValues([], treeData);
  treeValues.forEach((value) => {
    filterSettingsValuesMap.set(value.value, value);
  });
  return filterSettingsValuesMap;
};

/**
 * Initializes the default expanded nodes for the TreeView
 *
 * @param selectedIds The selected node ids
 * @param filterSettingsValuesMap The map used for looking up FilterSettingValues by node ids
 * @returns A list of node ids that should be expanded by default
 */
export const initDefaultExpanded = (
  selectedIds: string[],
  filterSettingsValuesMap: Map<string, TreeViewFilterSettingsValue>,
) => {
  const defaultExpanded: string[] = [];

  selectedIds.forEach((id) => {
    const value = filterSettingsValuesMap.get(id);
    if (value && value.parentIds) {
      value.parentIds.forEach((parentId) => {
        if (!defaultExpanded.includes(parentId)) {
          defaultExpanded.push(parentId);
        }
      });
    }
  });

  return defaultExpanded;
};

/**
 * Component for use with the FilterMenu component, which uses a TreeView to display filter options.
 * The component can be used for either single or multi-select filters.
 *
 * @param props The props for the TreeViewFilterSection
 * @returns The TreeViewFilterSection component
 */
export function TreeViewFilterSection(props: TreeViewSectionProps) {
  /**
   * Handles the change events for the checkboxes in the TreeViewFilterSectionItems
   *
   * @param checked If the checkbox is checked
   * @param nodeId The value of the tree node with the checkbox
   */
  const handleCheckboxChange = (checked: boolean, nodeId: string) => {
    let updatedSelectedIds = selectedIds;

    if (checked) {
      if (isMultiSelect) {
        updatedSelectedIds = [...selectedIds, nodeId];
      } else {
        updatedSelectedIds = [nodeId];
      }
    } else {
      updatedSelectedIds = selectedIds.filter((id) => id !== nodeId);
    }

    handleSelect(
      filterKey,
      updatedSelectedIds,
      filterSettingsValuesMap,
      filterSettingsDispatch,
    );
  };

  const filterSettings = useContext(FilterSettingsContext);
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);
  const isMultiSelect = props.multiselect ?? true;
  const filterKey = props.filterkey;
  const treeData = props.treedata;
  const selectedIds = getSelectedNodeIds(filterSettings.map.get(filterKey));
  const [filterSettingsValuesMap] = useState(
    initFilterSettingsValuesMap(treeData),
  );
  const [defaultExpanded] = useState<string[]>(
    initDefaultExpanded(selectedIds, filterSettingsValuesMap),
  );

  return (
    <Box>
      <TreeView
        aria-label={`${props.sectiontitle} (TreeView)}`}
        data-testid={`tree-view-section-${props.sectionid}`}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        // multiSelect={isMultiSelect}
        // selected={selectedIds}
        defaultExpanded={defaultExpanded}
        // onNodeSelect={(event, nodeIds) =>
        //   handleSelect(
        //     filterKey,
        //     nodeIds,
        //     filterSettingsValuesMap,
        //     filterSettingsDispatch,
        //   )
        // }
      >
        {buildTreeView(props, selectedIds, handleCheckboxChange)}
      </TreeView>
    </Box>
  );
}

export default TreeViewFilterSection;
