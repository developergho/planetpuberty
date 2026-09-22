// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React from "react";
import { PhotoCapture } from "src/features/whoInMyOrbit/components/AvatarUploader/PhotoCapture";

export default {
  title: "Components/AvatarUploader",
  component: PhotoCapture,
  argTypes: {
    onCapturePhoto: { action: "clicked" },
    onRequestClose: { action: "clicked" },
  },
};

const Template = (args) => (
  <div className="absolute top-0 left-0 right-0 bottom-0 p-4 bg-info">
    <PhotoCapture {...args} />
  </div>
);

export const PhotoCaptureComponent = Template.bind({});
PhotoCaptureComponent.args = {};
