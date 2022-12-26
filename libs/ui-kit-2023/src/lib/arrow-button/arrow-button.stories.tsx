import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArrowButton } from './arrow-button';

const Story: ComponentMeta<typeof ArrowButton> = {
  component: ArrowButton,
  title: 'ArrowButton',
};
export default Story;

const Template: ComponentStory<typeof ArrowButton> = (args) => (
  <ArrowButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
