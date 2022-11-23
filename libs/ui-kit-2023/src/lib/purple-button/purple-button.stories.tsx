import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { PurpleButton } from './purple-button';

const Story: ComponentMeta<typeof PurpleButton> = {
  component: PurpleButton,
  title: 'PurpleButton',
};
export default Story;

const Template: ComponentStory<typeof PurpleButton> = (args) => (
  <PurpleButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'UNCLICKED',
};
