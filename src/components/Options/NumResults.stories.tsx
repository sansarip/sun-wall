import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import NumResults, { SelectableNumber } from "./NumResults";

export default {
  title: "Components/NumResults",
  component: NumResults,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof NumResults>;

const Template: ComponentStory<typeof NumResults> = () => {
  const [value, setValue] = useState<SelectableNumber>(100);
  return (
    <NumResults onSelect={(number) => setValue(number)} value={value} />
  );
};

export const Component = Template.bind({});
