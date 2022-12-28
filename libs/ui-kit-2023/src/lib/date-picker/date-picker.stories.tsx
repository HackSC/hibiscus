import type { ComponentStory, ComponentMeta } from '@storybook/react';
import DatePicker from './date-picker';

const Story: ComponentMeta<typeof DatePicker> = {
  component: DatePicker,
  title: DatePicker.name,
};
export default Story;

const Template: ComponentStory<typeof DatePicker> = (args) => (
  <DatePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
