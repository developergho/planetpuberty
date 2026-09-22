// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React from "react";
import { OrbitCategoryMember } from "src/features/whoInMyOrbit/components/OrbitCategories/OrbitCategoryMember";

export default {
  title: "Components/OrbitCategory",
  component: OrbitCategoryMember,
  argTypes: {
    member: { type: "object" },
  },
};

const Template = (args) => (
  <div className="absolute top-0 left-0 right-0 bottom-0 p-4 bg-info">
    <div className="grid grid-cols-4 gap-4">
      <OrbitCategoryMember {...args} />

      <OrbitCategoryMember isAddNew />
    </div>
  </div>
);

export const OrbitCategoryMemberComponent = Template.bind({});
OrbitCategoryMemberComponent.args = {
  member: {
    title: "Member title",
    photo:
      "https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg",
  },
};
