import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackformQuestionComponent } from './hackform-question';

const Story: ComponentMeta<typeof HackformQuestionComponent> = {
  component: HackformQuestionComponent,
  title: 'HackformQuestionComponent',
};
export default Story;

const Template: ComponentStory<typeof HackformQuestionComponent> = () => (
  <HackformQuestionComponent />
);

export const Primary = Template.bind({});
Primary.args = {
  qi: 0,
  initialError: '',
};
