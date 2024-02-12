import type { Meta, StoryObj } from "@storybook/react";

import SelectedFilterSection from "../components/FilterMenu/SelectedFiltersSection";
import FilterMenuSectionDecorator from "../../.storybook/decorators/FilterMenuSectionDecorator";

const meta = {
  title: "Filter Menu Components/SelectedFilterSection",
  component: SelectedFilterSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [FilterMenuSectionDecorator],
} satisfies Meta<typeof SelectedFilterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sectionid: "selectedfilters",
    sectiontitle: "Valgte filtre",
    filterkey: "selectedfilters",
  },
};
