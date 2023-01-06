import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { GrayContentBox } from './gray-content-box';

const Story: ComponentMeta<typeof GrayContentBox> = {
  component: GrayContentBox,
  title: 'GrayContentBox',
};
export default Story;

const Template: ComponentStory<typeof GrayContentBox> = (args) => (
  <GrayContentBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  location: '',
};
