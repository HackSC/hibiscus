import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackformQuestionHeader } from './hackform-question-header';

const Story: ComponentMeta<typeof HackformQuestionHeader> = {
  component: HackformQuestionHeader,
  title: 'HackformQuestionHeader',
};
export default Story;

const Template: ComponentStory<typeof HackformQuestionHeader> = (args) => (
  <HackformQuestionHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
