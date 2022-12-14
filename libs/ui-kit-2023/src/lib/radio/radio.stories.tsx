import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from './radio';

const Story: ComponentMeta<typeof Radio> = {
  component: Radio,
  title: 'Radio',
};
export default Story;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: '',
};
