import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Hackerform } from './hackform';

const Story: ComponentMeta<typeof Hackerform> = {
  component: Hackerform,
  title: 'Hackerform',
};
export default Story;

const Template: ComponentStory<typeof Hackerform> = (args) => (
  <Hackerform {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
