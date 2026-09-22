// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React from "react";
import { AvatarUploader } from "src/features/whoInMyOrbit/components/AvatarUploader";

export default {
  title: "Components/AvatarUploader",
  component: AvatarUploader,
  argTypes: {
    onPressTakePhoto: { action: "clicked" },
  },
};

const Template = (args) => (
  <div className="absolute top-0 left-0 right-0 bottom-0 p-4 bg-info">
    <AvatarUploader {...args} />
  </div>
);

export const AvatarUploaderComponent = Template.bind({});
AvatarUploaderComponent.args = {};
