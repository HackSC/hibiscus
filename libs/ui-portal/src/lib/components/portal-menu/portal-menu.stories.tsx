import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { PortalMenu } from './portal-menu';
import React from 'react';

const Story: ComponentMeta<typeof PortalMenu> = {
  component: PortalMenu,
  title: 'PortalMenu',
};
export default Story;

const Template: ComponentStory<typeof PortalMenu> = (args) => (
  <PortalMenu {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
