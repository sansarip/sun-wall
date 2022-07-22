import { ComponentStory, ComponentMeta } from '@storybook/react';
import Calendar from './Calendar';

export default {
  title: 'Components/Options/Calendar',
  component: Calendar,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) =>
  <Calendar {...args} />;

export const Component = Template.bind({});