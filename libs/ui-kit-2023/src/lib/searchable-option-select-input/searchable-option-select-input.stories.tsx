import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchableOptionSelectInput } from './searchable-option-select-input';

const Story: ComponentMeta<typeof SearchableOptionSelectInput> = {
  component: SearchableOptionSelectInput,
  title: SearchableOptionSelectInput.name,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof SearchableOptionSelectInput> = (args) => (
  <SearchableOptionSelectInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  options: [
    {
      value: 'option-1',
      displayName: 'option-1',
    },
    {
      value: 'option-2',
      displayName: 'option-2',
    },
    {
      value: 'option-3',
      displayName: 'option-3',
    },
  ],
};
