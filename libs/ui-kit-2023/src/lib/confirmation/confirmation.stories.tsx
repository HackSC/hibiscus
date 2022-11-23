import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Confirmation } from './confirmation';

const Story: ComponentMeta<typeof Confirmation> = {
  component: Confirmation,
  title: 'Confirmation',
};
export default Story;

const Template: ComponentStory<typeof Confirmation> = (args) => (
  <Confirmation {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
