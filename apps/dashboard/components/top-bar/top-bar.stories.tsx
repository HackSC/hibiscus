import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { TopBar } from './top-bar';

const Story: ComponentMeta<typeof TopBar> = {
  component: TopBar,
  title: 'TopBar',
};
export default Story;

const Template: ComponentStory<typeof TopBar> = (args) => <TopBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  userTag: '',
};
