import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Combobox } from './combobox';

const Story: ComponentMeta<typeof Combobox> = {
  component: Combobox,
  title: Combobox.name,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof Combobox> = (args) => (
  <Combobox {...args} />
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
