import React from "react";

export const Landing = ({
  title,
  description,
  background,
  buttonTitle = "Enter",
  onNext,
}) => {
  return (
    <div
      className="absolute inset-0 flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container flex flex-col grow items-center justify-center">
        <h1 className="font-bold font-sans text-game1-secondary text-6xl text-center">
          {title}
        </h1>

        <p className="text-center font-roboto text-3xl text-white xl:max-w-[900px] md:max-w-[540px] mt-5">
          {description}
        </p>
      </div>

      <div className="text-center pb-4">
        <button
          onClick={() => onNext()}
          className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right f-20"
        >
          <span className="font-sans text-[1.5rem] font-bold text-white">
            {buttonTitle}
          </span>
        </button>
      </div>
    </div>
  );
};
