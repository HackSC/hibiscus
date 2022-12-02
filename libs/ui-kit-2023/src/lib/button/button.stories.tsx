import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Button } from './button';

const Story: ComponentMeta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default Story;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Hello',
  color: 'black',
};
