import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { BlueButton } from './blue-button';

const Story: ComponentMeta<typeof BlueButton> = {
  component: BlueButton,
  title: 'BlueButton',
};
export default Story;

const Template: ComponentStory<typeof BlueButton> = (args) => (
  <BlueButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: '',
};
