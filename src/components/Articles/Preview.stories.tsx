import { ComponentStory, ComponentMeta } from '@storybook/react';
import Preview from './Preview';

export default {
    title: 'Components/Articles/Preview',
    component: Preview,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof Preview>;

const Template: ComponentStory<typeof Preview> = (args) =>
    <Preview {...args} />;

export const Component = Template.bind({});
Component.args = {
    article: 'Article Title',
    rank: 1,
    views: 100,
}