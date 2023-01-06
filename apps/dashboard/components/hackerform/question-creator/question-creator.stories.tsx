import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { QuestionCreator } from './question-creator';

const Story: ComponentMeta<typeof QuestionCreator> = {
  component: QuestionCreator,
  title: 'QuestionCreator',
};
export default Story;

const Template: ComponentStory<typeof QuestionCreator> = (args) => (
  <QuestionCreator {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
