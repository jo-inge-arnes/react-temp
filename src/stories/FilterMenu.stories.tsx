import type { Meta, StoryObj } from "@storybook/react";

import FilterMenu, {
  FilterMenuSelectionChangedHandler,
} from "../components/FilterMenu";

import RadioGroupFilterSection from "../components/FilterMenu/RadioGroupFilterSection";
import * as RadioStories from "./RadioGroupFilterSection.stories";

import SelectedFiltersSection from "../components/FilterMenu/SelectedFiltersSection";
import * as SelectedFiltersStories from "./SelectedFilterSection.stories";

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

const yearsArgs = {
  sectionid: "years",
  sectiontitle: "Årstall",
  filterkey: "years",
  radios: [
    { valueLabel: "2023", value: "2023" },
    { valueLabel: "2022", value: "2022" },
    { valueLabel: "2021", value: "2021" },
],
defaultValue: "2023", }

export const Primary: Story = {
  args: {
    children: [
      <SelectedFiltersSection
        {...SelectedFiltersStories.Primary.args}
        accordion="false"
        key="1"
      />,
      <RadioGroupFilterSection {...RadioStories.Primary.args} key="2" />,
      <RadioGroupFilterSection {...yearsArgs} key="3" />,

    ],
    onSelectionChanged: (newVals, oldVals) => {
      console.log(newVals);
    },
  },
};
