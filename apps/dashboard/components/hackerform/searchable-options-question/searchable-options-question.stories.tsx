import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchableOptionsInput } from './searchable-options-question';

const Story: ComponentMeta<typeof SearchableOptionsInput> = {
  component: SearchableOptionsInput,
  title: 'SearchableOptionsInput',
};
export default Story;

const Template: ComponentStory<typeof SearchableOptionsInput> = (args) => (
  <SearchableOptionsInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
