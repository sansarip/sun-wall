import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FilterOption } from 'components';

export default {
  title: 'Components/FilterOption',
  component: FilterOption,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof FilterOption>;

const Template: ComponentStory<typeof FilterOption> = (args) =>
  <FilterOption {...args} />;

export const Component = Template.bind({});
Component.args = {
  label: 'Click me',
  children: `I'm baby skateboard etsy brunch shabby chic XOXO PBR&B raw denim VHS direct trade vice food truck heirloom normcore activated charcoal. Tilde trust fund meggings DSA sartorial PBR&B disrupt. Lumbersexual ugh brunch, woke YOLO affogato glossier heirloom jianbing. Chia raw denim adaptogen flannel, cred plaid keffiyeh prism la croix tilde pop-up bitters. Fixie disrupt fanny pack 8-bit truffaut bitters listicle retro lo-fi banjo blog deep v bushwick air plant.`,
}