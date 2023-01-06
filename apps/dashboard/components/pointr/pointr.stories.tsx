import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pointr } from './pointr';

const Story: ComponentMeta<typeof Pointr> = {
  component: Pointr,
  title: 'Pointr',
};
export default Story;

const Template: ComponentStory<typeof Pointr> = (args) => <Pointr {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
