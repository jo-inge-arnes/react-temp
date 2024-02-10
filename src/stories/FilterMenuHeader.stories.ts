import type { Meta, StoryObj } from '@storybook/react';

import FilterMenuHeader from '../components/FilterMenu/FilterMenuHeader';
import FilterMenuSectionDecorator from '../../.storybook/decorators/FilterMenuSectionDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Example/FilterMenuHeader',
    component: FilterMenuHeader,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
      // backgroundColor: { control: 'color' },
    },
    decorators: [
      FilterMenuSectionDecorator
    ],
  } satisfies Meta<typeof FilterMenuHeader>;
  
  export default meta;

  type Story = StoryObj<typeof meta>;
  
  // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
  export const Primary: Story = {
    args: {
      sectionid: 'Section 1',
      sectiontitle: 'Section Title',
      filterkey: 'filterkey1',
    },
  };
