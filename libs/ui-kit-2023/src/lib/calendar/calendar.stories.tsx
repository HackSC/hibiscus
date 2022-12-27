import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Calendar } from './calendar';

const Story: ComponentMeta<typeof Calendar> = {
  component: Calendar,
  title: Calendar.name,
  argTypes: {
    navigationColor: {
      control: { type: 'color', presetColors: ['#BFF0FF'] },
    },
    navigationShadowColor: {
      control: { type: 'color', presetColors: ['#76D3EF'] },
    },
  },
};
export default Story;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
