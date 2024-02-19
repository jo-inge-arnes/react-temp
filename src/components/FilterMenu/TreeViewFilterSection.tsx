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

type TreeViewFilterSectionNode = {
  nodeValue: FilterSettingsValue;
  children?: TreeViewFilterSectionNode[];
};

type TreeViewSectionProps = FilterMenuSectionProps & {
  multiselect?: boolean;
  treeData: TreeViewFilterSectionNode[];
};

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

export const handleSelect = (
  filterKey: string,
  nodeIds: string[] | string,
  treeData: TreeViewFilterSectionNode[],
  filterSettingsDispatch: React.Dispatch<FilterSettingsAction>,
) => {
  filterSettingsDispatch({
    type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
    sectionSetting: {
      key: filterKey,
      values: [],
    },
  });
};

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
