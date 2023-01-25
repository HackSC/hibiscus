import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackerTab } from '../sponsor-portal/hacker-tab';

const Story: ComponentMeta<typeof HackerTab> = {
  component: HackerTab,
  title: 'HackerTab',
};
export default Story;

const Template: ComponentStory<typeof HackerTab> = (args) => (
  <HackerTab {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  userTag: '',
};
