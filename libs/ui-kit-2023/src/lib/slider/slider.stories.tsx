import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Slider } from './slider';

const Story: ComponentMeta<typeof Slider> = {
  component: Slider,
  title: 'Slider',
};
export default Story;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
