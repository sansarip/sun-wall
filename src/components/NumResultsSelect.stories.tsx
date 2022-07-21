import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import NumResultsSelect, { SelectableNumber } from "./NumResultsSelect";

export default {
  title: "Components/NumResultsSelect",
  component: NumResultsSelect,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof NumResultsSelect>;

const Template: ComponentStory<typeof NumResultsSelect> = () => {
  const [value, setValue] = useState<SelectableNumber>(100);
  return (
    <NumResultsSelect onSelect={(number) => setValue(number)} value={value} />
  );
};

export const Component = Template.bind({});
