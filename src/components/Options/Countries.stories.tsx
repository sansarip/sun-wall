import { ComponentStory, ComponentMeta } from "@storybook/react";
import { getName } from "country-list";
import { useState } from "react";
import Countries from "./Countries";

export default {
  title: "Components/Filters/Countries",
  component: Countries,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Countries>;

const Template: ComponentStory<typeof Countries> = () => {
  const [value, setValue] = useState<string>("" + getName("US"));
  return <Countries value={value} onSelect={(name) => setValue(name)} />;
};

export const Component = Template.bind({});
