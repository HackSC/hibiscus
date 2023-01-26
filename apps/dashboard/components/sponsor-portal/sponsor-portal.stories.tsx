import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { SponsorPortal } from '../sponsor-portal/sponsor-portal';

const Story: ComponentMeta<typeof SponsorPortal> = {
  component: SponsorPortal,
  title: 'SponsorPortal',
};
export default Story;

const Template: ComponentStory<typeof SponsorPortal> = (args) => (
  <SponsorPortal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  userTag: '',
};
