import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { HackformBackNextWidget } from './hackform-backnext-widget';

const Story: ComponentMeta<typeof HackformBackNextWidget> = {
  component: HackformBackNextWidget,
  title: 'HackformBackNextWidget',
};
export default Story;

const Template: ComponentStory<typeof HackformBackNextWidget> = (args) => (
  <HackformBackNextWidget {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
