import type {} from "@mui/x-tree-view/themeAugmentation";
import React, { useContext } from "react";
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

/**
 * The structure of a node in the tree data used with the TreeViewFilterSection component
 */
type TreeViewFilterSectionNode = {
  nodeValue: FilterSettingsValue;
  children?: TreeViewFilterSectionNode[];
};

/**
 * Props for the TreeViewFilterSection component, which extends the FilterMenuSectionProps
 * used with the FilterMenu component. Accepts the treeData prop, which is an array of
 * TreeViewFilterSectionNode objects that represent the tree structure of the filter options.
 * Also accepts the multiselect prop, which is a boolean that determines whether the filter
 * is single or multi-select.
 */
type TreeViewSectionProps = FilterMenuSectionProps & {
  multiselect?: boolean;
  treeData: TreeViewFilterSectionNode[];
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
) => {
  return treeData.map((node, index) => {
    const position = prefix ? `${prefix}-${index}` : `${index}`;

    return (
      <TreeItem
        key={`${filterKey}-${node.nodeValue.value}-${position}`}
        nodeId={position}
        label={node.nodeValue.valueLabel}
      >
        {node.children && buildTreeLevel(node.children, filterKey, position)}
      </TreeItem>
    );
  });
};

/**
 * Function that builds the TreeView from the tree data
 *
 * @param props
 * @returns The TreeItem components for the TreeView
 */
export const buildTreeView = (props: TreeViewSectionProps) => {
  return <>{buildTreeLevel(props.treeData, props.filterkey, "")}</>;
};

/**
 * Function used to retrieve the FilterSettingsValue for a node in the tree
 *
 * @param nodeId The hyphen-separated indices of the node's position in the tree
 * @param treeData The tree data
 * @returns The FilterSettingsValue for the node with the given nodeId
 */
export const findFilterSettingValue = (
  nodeId: string,
  treeData: TreeViewFilterSectionNode[],
) => {
  const nodeIndices = nodeId.split("-");

  let currentNode: TreeViewFilterSectionNode = treeData[Number(nodeIndices[0])];

  for (let i = 1; i < nodeIndices.length; i++) {
    if (!currentNode.children) {
      throw new Error(
        "The index is invalid because the node does not have children.",
      );
    }
    currentNode = currentNode.children[Number(nodeIndices[i])];
  }

  return currentNode.nodeValue;
};

/**
 * Function used for updating the FilterMenu state when the user selects nodes in the TreeView
 *
 * @param filterKey The filter key for the section
 * @param nodeIds The nodeId or nodeIds of the selected nodes
 * @param treeData The tree data with the TreeViewFilterSectionNode structure
 * @param filterSettingsDispatch The dispatch function for the filter settings reducer that manages changes to the filter settings state
 */
export const handleSelect = (
  filterKey: string,
  nodeIds: string[] | string,
  treeData: TreeViewFilterSectionNode[],
  filterSettingsDispatch: React.Dispatch<FilterSettingsAction>,
) => {
  const selectedNodeIds = Array.isArray(nodeIds) ? nodeIds : [nodeIds];
  const selectedFilterSettingValues = selectedNodeIds.map((nodeId) =>
    findFilterSettingValue(nodeId, treeData),
  );

  filterSettingsDispatch({
    type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
    sectionSetting: {
      key: filterKey,
      values: selectedFilterSettingValues,
    },
  });
};

/**
 * Component for use with the FilterMenu component, which uses a TreeView to display filter options.
 * The component can be used for either single or multi-select filters.
 *
 * @param props The props for the TreeViewFilterSection
 * @returns The TreeViewFilterSection component
 */
export default function TreeViewFilterSection(props: TreeViewSectionProps) {
  const filterSettingsDispatch = useContext(FilterSettingsDispatchContext);
  const multiSelect = props.multiselect ?? true;
  const filterKey = props.filterkey;
  const treeData = props.treeData;

  return (
    <Box>
      <TreeView
        aria-label={`${props.sectiontitle} (TreeView)}`}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect={multiSelect}
        onNodeSelect={(event, nodeIds) =>
          handleSelect(filterKey, nodeIds, treeData, filterSettingsDispatch)
        }
      >
        {buildTreeView(props)}
      </TreeView>
    </Box>
  );
}
