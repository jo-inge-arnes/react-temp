import type { Meta, StoryObj } from "@storybook/react";

import RadioGroupFilterSection from "../components/FilterMenu/RadioGroupFilterSection";
import FilterMenuSectionDecorator from "../../.storybook/decorators/FilterMenuSectionDecorator";

const meta = {
  title: "Filter Menu Components/RadioGroupFilterSection",
  component: RadioGroupFilterSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [FilterMenuSectionDecorator],
} satisfies Meta<typeof RadioGroupFilterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    accordion: "false",
    sectionid: "fagomraader",
    sectiontitle: "Fagområder",
    filterkey: "indicator",
    defaultvalues: [{ valueLabel: "Alle fagområder", value: "all" }],
    radios: [
      { valueLabel: "Alle fagområder", value: "all" },
      { valueLabel: "Hjerte- og karsykdommer", value: "hjerte" },
      { valueLabel: "Kreft", value: "kreft" },
      { valueLabel: "Luftveier", value: "luft" },
    ],
  },
};

export const InitialSelectionWithoutDefault: Story = {
  args: {
    accordion: "false",
    sectionid: "indikatorer",
    sectiontitle: "Indikatorer",
    filterkey: "indikatorer",
    initialselections: [{ valueLabel: "Alle indikatorer", value: "all" }],
    radios: [
      { valueLabel: "Alle indikatorer", value: "all" },
      { valueLabel: "Hjerte- og karsykdommer", value: "hjerte" },
      { valueLabel: "Kreft", value: "kreft" },
      { valueLabel: "Luftveier", value: "luft" },
    ],
  },
};
