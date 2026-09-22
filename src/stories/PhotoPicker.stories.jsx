// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React from "react";
import { PhotoPicker } from "src/features/whoInMyOrbit/components/AvatarUploader/PhotoPicker";

export default {
  title: "Components/AvatarUploader",
  component: PhotoPicker,
  argTypes: {
    onCapturePhoto: { action: "clicked" },
    onSelectFromLibrary: { action: "clicked" },
    onCancel: { action: "clicked" },
  },
};

const Template = (args) => (
  <div className="absolute top-0 left-0 right-0 bottom-0 p-4 bg-info">
    <PhotoPicker {...args} />
  </div>
);

export const PhotoPickerComponent = Template.bind({});
PhotoPickerComponent.args = {};
