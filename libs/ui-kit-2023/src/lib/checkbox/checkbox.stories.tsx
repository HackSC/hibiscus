import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './checkbox';

const Story: ComponentMeta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
};
export default Story;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: '',
};
