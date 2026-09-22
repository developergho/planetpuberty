// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React from "react";
import { PhotoCaptureConfirm } from "src/features/whoInMyOrbit/components/AvatarUploader/PhotoCaptureConfirm";

export default {
  title: "Components/AvatarUploader",
  component: PhotoCaptureConfirm,
  argTypes: {
    onConfirm: { action: "clicked" },
    onRetake: { action: "clicked" },
  },
};

const Template = (args) => (
  <div className="absolute top-0 left-0 right-0 bottom-0 p-4 bg-info">
    <PhotoCaptureConfirm {...args} />
  </div>
);

export const PhotoCaptureConfirmComponent = Template.bind({});
PhotoCaptureConfirmComponent.args = {
  source:
    "https://demo-res.cloudinary.com/image/upload/sample.jpg",
};
