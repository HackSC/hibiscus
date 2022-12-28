import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackformIntroduction } from './hackform-introduction';

const Story: ComponentMeta<typeof HackformIntroduction> = {
  component: HackformIntroduction,
  title: 'HackformIntroduction',
};
export default Story;

const Template: ComponentStory<typeof HackformIntroduction> = (args) => (
  <HackformIntroduction {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
