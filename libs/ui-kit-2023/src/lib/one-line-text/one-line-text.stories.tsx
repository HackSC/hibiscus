import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { OneLineText } from './one-line-text';

const Story: ComponentMeta<typeof OneLineText> = {
  component: OneLineText,
  title: 'OneLineText',
};
export default Story;

const Template: ComponentStory<typeof OneLineText> = (args) => (
  <OneLineText {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
