import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackerManager } from './hacker-manager';

const Story: ComponentMeta<typeof HackerManager> = {
  component: HackerManager,
  title: 'HackerManager',
};
export default Story;

const Template: ComponentStory<typeof HackerManager> = (args) => (
  <HackerManager {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
