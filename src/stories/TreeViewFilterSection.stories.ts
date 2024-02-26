import type { Meta, StoryObj } from "@storybook/react";

import TreeViewFilterSection from "../components/FilterMenu/TreeViewFilterSection";
import FilterMenuSectionDecorator from "../../.storybook/decorators/FilterMenuSectionDecorator";

const meta = {
  title: "Filter Menu Components/TreeViewFilterSection",
  component: TreeViewFilterSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [FilterMenuSectionDecorator],
} satisfies Meta<typeof TreeViewFilterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

const treeData = [
  {
    nodeValue: { valueLabel: "Helse Nord RHF", value: "Helse Nord RHF" },
    children: [
      {
        nodeValue: {
          valueLabel: "Finnmarkssykehuset HF",
          value: "Finnmark HF",
        },
        children: [
          {
            nodeValue: {
              valueLabel: "Alta",
              value: "Alta",
            },
          },
          {
            nodeValue: {
              valueLabel: "Hammerfest",
              value: "Hammerfest",
            },
          },
        ],
      },
      {
        nodeValue: {
          valueLabel: "Helgelandssykehuset HF",
          value: "Helgeland HF",
        },
      },
    ],
  },
];

export const Primary: Story = {
  args: {
    sectionid: "behandlingsenheter",
    sectiontitle: "Behandlingsenheter",
    filterkey: "treeviewfiltersection",
    treedata: treeData,
  },
};

export const SingleSelect: Story = {
  args: {
    sectionid: "behandlingsenheter",
    sectiontitle: "Behandlingsenheter",
    filterkey: "selected_treatment_units",
    multiselect: false,
    treedata: treeData,
  },
};

export const InitialSelections: Story = {
  args: {
    sectionid: "behandlingsenheter",
    sectiontitle: "Behandlingsenheter",
    filterkey: "treeviewfiltersection",
    initialselections: [
      {
        valueLabel: "Hammerfest",
        value: "Hammerfest",
      },
    ],
    treedata: treeData,
    accordion: "false",
  },
};

export const MaxiumNumberOfSelections: Story = {
  args: {
    sectionid: "behandlingsenheter",
    sectiontitle: "Behandlingsenheter",
    filterkey: "treeviewfiltersection",
    maxselections: 2,
    treedata: treeData,
  },
};
