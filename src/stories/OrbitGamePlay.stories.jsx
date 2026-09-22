// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React from "react";
import { OrbitGamePlay } from "src/features/whoInMyOrbit/components/OrbitGamePlay";

export default {
  title: "Components/OrbitGamePlay",
  component: OrbitGamePlay,
};

const Template = (args) => (
  <div className="w-full h-full p-4 bg-info">
    <OrbitGamePlay {...args} />
  </div>
);

export const OrbitGamePlayComponent = Template.bind({});
OrbitGamePlayComponent.args = {};
