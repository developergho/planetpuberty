// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React, { useEffect } from "react";
import { OrbitCircle } from "src/features/whoInMyOrbit/components/OrbitGamePlay/OrbitCircle";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "src/reducers";
import { setPlayerData } from "src/reducers/player.slice";

export default {
  title: "Components/OrbitCircle",
  component: OrbitCircle,
  argTypes: {},
};

const store = configureStore({ reducer: rootReducer });
const Template = (args) => {
  useEffect(() => {
    store.dispatch(
      setPlayerData({
        name: "Player Name",
        avatar:
          "https://images.pexels.com/photos/9725715/pexels-photo-9725715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        isCustomAvatar: true,
      })
    );
  }, []);
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 p-4 bg-gradient-primary">
      <Provider store={store}>
        <OrbitCircle {...args} />
      </Provider>
    </div>
  );
};

export const OrbitCircleMemberComponent = Template.bind({});
OrbitCircleMemberComponent.args = {};
