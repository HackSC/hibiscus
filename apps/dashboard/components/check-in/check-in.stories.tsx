import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckIn } from './check-in';

const Story: ComponentMeta<typeof CheckIn> = {
  component: CheckIn,
  title: 'CheckIn',
};
export default Story;

const Template: ComponentStory<typeof CheckIn> = (args) => (
  <CheckIn {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
