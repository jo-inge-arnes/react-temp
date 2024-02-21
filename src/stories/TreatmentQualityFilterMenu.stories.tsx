import type { Meta, StoryObj } from "@storybook/react";

import TreatmentQualityFilterMenu, {
  TreatmentQualityRadioGroupOptions,
  TreatmentQualityTreeViewOptions,
} from "../components/FilterMenu/TreatmentQualityFilterMenu";

import medicalFieldsJson from "./data/medicalfields.json";
import unitnames from "./data/unitnames.json";
import { TreeViewFilterSectionNode } from "@/components/FilterMenu/TreeViewFilterSection";

/**
 * Transforms a JSON obtained from the info/medicalFields API-endpoint to a
 * TreatmentQualityRadioGroupOptions object.
 */
const medicalFields: TreatmentQualityRadioGroupOptions = {
  options: [
    { value: "all", valueLabel: "Alle fagområder" },
    ...medicalFieldsJson.map((field) => {
      return {
        value: field.shortName,
        valueLabel: field.name,
      };
    }),
  ],
  default: { value: "all", valueLabel: "Alle fagområder" },
};

/**
 * Transforms a JSON obtained from the info/unitnames API-endpoint to a
 * TreatmentQualityTreeViewOptions array for tree view filter section.
 */
const treatmentUnitsOptions: TreatmentQualityTreeViewOptions = {
  defaults: [{ value: "Nasjonalt", valueLabel: "Nasjonalt" }],
  treedata: [
    { nodeValue: { value: "Nasjonalt", valueLabel: "Nasjonalt" } },
    ...unitnames.nestedUnitNames.map((unit) => {
      return {
        nodeValue: {
          value: unit.rhf,
          valueLabel: unit.rhf,
        },
        children: unit.hf.map((hf) => {
          return {
            nodeValue: {
              value: hf.hf,
              valueLabel: hf.hf_full,
            },
            children: hf.hospital.map((hospital) => {
              return {
                nodeValue: {
                  value: hospital,
                  valueLabel: hospital,
                },
              };
            }),
          };
        }),
      };
    }),
  ],
};

const meta = {
  title: "Filter Menu Components/TreatmentQualityFilterMenu",
  component: TreatmentQualityFilterMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [],
} satisfies Meta<typeof TreatmentQualityFilterMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    medicalfields: medicalFields,
    treatmentunitstree: treatmentUnitsOptions,
    onSelectionChanged: (newFilterSettings) => {
      console.log(newFilterSettings);
    },
  },
};
