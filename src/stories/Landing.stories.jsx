// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React from "react";
import { Landing } from "src/components/Landing";

export default {
  title: "Components/LandingPage",
  component: Landing,
  argTypes: {
    onPressTakePhoto: { action: "clicked" },
  },
};

const Template = (args) => (
  <div className="absolute inset-0">
    <Landing {...args} />
  </div>
);

export const AvatarUploaderComponent = Template.bind({});
AvatarUploaderComponent.args = {};
