import type { ComponentStory, ComponentMeta } from '@storybook/react';
import OTPInput from './otp-input';

const Story: ComponentMeta<typeof OTPInput> = {
  component: OTPInput,
  title: 'OTPInput',
};
export default Story;

const Template: ComponentStory<typeof OTPInput> = (args) => (
  <OTPInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  userTag: '',
};
