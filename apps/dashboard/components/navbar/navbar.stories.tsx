import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { SidebarNav } from './navbar';

const Story: ComponentMeta<typeof SidebarNav> = {
  component: SidebarNav,
  title: 'SidebarNav',
};
export default Story;

const Template: ComponentStory<typeof SidebarNav> = (args) => (
  <SidebarNav {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
