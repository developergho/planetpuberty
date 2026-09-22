import React, { useState } from "react";

export const AvatarDefaultItem = ({
  id,
  url,
  title,
  index,
  onSelectedAvatar,
  isActive = false,
  activeText,
}) => {
  const bgList = ["bg-error-1", "bg-info-1", "bg-success-3"];

  const [backgroundClass] = useState(bgList[index]);

  return (
    <div className="flex flex-col">
      <figure
        key={id}
        role="button"
        onClick={onSelectedAvatar}
        className="flex rounded-full overflow-hidden aspect-square w-full relative"
      >
        <div
          className={`${backgroundClass} z-10 duration-500 transition-[transform] 
         ${isActive ? "scale-0" : "scale-100"}
         absolute w-full h-full rounded-full`}
        />

        <div
          className={`absolute w-full h-full rounded-full bg-game1-secondary`}
        />

        <img
          className="w-full h-full rounded-full object-cover z-20"
          src={url}
          alt={title}
        />
      </figure>
      <p className={`font-sans text-xl text-center text-game1-secondary mt-8 ${isActive && !!activeText ? 'opacity-100' : 'opacity-0'}`}>
        {activeText || "Player name"}
      </p>
    </div>
  );
};
