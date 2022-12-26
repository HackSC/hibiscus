import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Calendar } from './index';

const Story: ComponentMeta<typeof Calendar> = {
  component: Calendar,
  title: Calendar.name,
};
export default Story;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
