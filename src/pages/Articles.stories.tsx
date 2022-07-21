import { ComponentStory, ComponentMeta } from '@storybook/react';
import Articles from './Articles';

export default {
  title: 'Pages/Articles',
  component: Articles,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Articles>;

const Template: ComponentStory<typeof Articles> = () =>
  <Articles />;

export const Component = Template.bind({});