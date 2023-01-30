import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackerProfile } from '../sponsor-portal/hacker-profile';

const Story: ComponentMeta<typeof HackerProfile> = {
  component: HackerProfile,
  title: 'HackerProfile',
};
export default Story;

const Template: ComponentStory<typeof HackerProfile> = (args) => (
  <HackerProfile {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  userTag: '',
};
