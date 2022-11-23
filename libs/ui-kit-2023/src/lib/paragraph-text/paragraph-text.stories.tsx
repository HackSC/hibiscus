import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ParagraphText } from './paragraph-text';

const Story: ComponentMeta<typeof ParagraphText> = {
  component: ParagraphText,
  title: 'ParagraphText',
};
export default Story;

const Template: ComponentStory<typeof ParagraphText> = (args) => (
  <ParagraphText {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: '',
};
