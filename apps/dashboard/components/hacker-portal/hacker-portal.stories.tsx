import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackerPortal } from '../hacker-portal/hacker-portal';

const Story: ComponentMeta<typeof HackerPortal> = {
  component: HackerPortal,
  title: 'HackerPortal',
};
export default Story;

const Template: ComponentStory<typeof HackerPortal> = (args) => (
  <HackerPortal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  userTag: '',
};
