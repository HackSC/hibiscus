import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackformQuestionComponent } from './hackform-question';

const Story: ComponentMeta<typeof HackformQuestionComponent> = {
  component: HackformQuestionComponent,
  title: 'HackformQuestionComponent',
  argTypes: {
    saveResponse: { action: 'saveResponse executed!' },
    goNextQuestion: { action: 'goNextQuestion executed!' },
    goPreviousQuestion: { action: 'goPreviousQuestion executed!' },
    addErrorForQuestion: { action: 'addErrorForQuestion executed!' },
    resolveError: { action: 'resolveError executed!' },
  },
};
export default Story;

const Template: ComponentStory<typeof HackformQuestionComponent> = (args) => (
  <HackformQuestionComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  qi: 0,
  initialError: '',
};
