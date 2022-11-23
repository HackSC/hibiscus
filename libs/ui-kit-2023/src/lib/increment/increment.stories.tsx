import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Increment } from './increment';

const Story: ComponentMeta<typeof Increment> = {
  component: Increment,
  title: 'Increment',
};
export default Story;

const Template: ComponentStory<typeof Increment> = (args) => (
  <Increment {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
