import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { InformationEnter } from './information-enter';

const Story: ComponentMeta<typeof InformationEnter> = {
  component: InformationEnter,
  title: 'InformationEnter',
};
export default Story;

const Template: ComponentStory<typeof InformationEnter> = (args) => (
  <InformationEnter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: '',
};
