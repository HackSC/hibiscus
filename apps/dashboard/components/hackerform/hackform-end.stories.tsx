import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackformEnding } from './hackform-end';

const Story: ComponentMeta<typeof HackformEnding> = {
  component: HackformEnding,
  title: 'HackformEnding',
};
export default Story;

const Template: ComponentStory<typeof HackformEnding> = (args) => (
  <HackformEnding {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
