import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ShortTextInput } from './short-text-input';

const Story: ComponentMeta<typeof ShortTextInput> = {
  component: ShortTextInput,
  title: 'ShortTextInput',
};
export default Story;

const Template: ComponentStory<typeof ShortTextInput> = (args) => (
  <ShortTextInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
