import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { DropDown } from '../sponsor-portal/dropdown';

const Story: ComponentMeta<typeof DropDown> = {
  component: DropDown,
  title: 'DropDown',
};
export default Story;

const Template: ComponentStory<typeof DropDown> = (args) => (
  <DropDown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  userTag: '',
};
