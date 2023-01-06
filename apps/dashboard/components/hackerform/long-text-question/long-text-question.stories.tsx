import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { LongTextQuestion } from './long-text-question';

const Story: ComponentMeta<typeof LongTextQuestion> = {
  component: LongTextQuestion,
  title: 'LongTextQuestion',
};
export default Story;

const Template: ComponentStory<typeof LongTextQuestion> = (args) => (
  <LongTextQuestion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
