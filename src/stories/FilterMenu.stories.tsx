import type { Meta, StoryObj } from "@storybook/react";

import FilterMenu, {
  FilterMenuSelectionChangedHandler,
} from "../components/FilterMenu";

import RadioGroupFilterSection from "../components/FilterMenu/RadioGroupFilterSection";
import * as RadioStories from "./RadioGroupFilterSection.stories";
import { FilterSettingsValue } from "@/components/FilterMenu/FilterSettingsContext";

const meta = {
  title: "Filter Menu Components/FilterMenu",
  component: FilterMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [],
} satisfies Meta<typeof FilterMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: <RadioGroupFilterSection {...RadioStories.Primary.args} />,
    onSelectionChanged: (newVals, oldVals) => {
      console.log(newVals);
    },
  },
};
