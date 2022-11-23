import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { BlackButton } from './black-button';

const Story: ComponentMeta<typeof BlackButton> = {
  component: BlackButton,
  title: 'BlackButton',
};
export default Story;

const Template: ComponentStory<typeof BlackButton> = (args) => (
  <BlackButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: '',
};
