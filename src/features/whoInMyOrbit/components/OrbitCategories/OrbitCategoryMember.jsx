import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMemberData } from "src/reducers/orbitPersonalizedCategories.slice";

export const OrbitCategoryMember = ({
  categoryId,
  member,
  isAddNew,
  isShowRemoveButton = true,
  onSelectAvatar,
  onAddNew,
  onRemoveMember,
}) => {
  const [isEditName, setIsEditName] = useState(false);
  const [editName, setEditName] = useState("");
  const dispatch = useDispatch();

  const onChangeEditName = (e) => {
    setEditName(e.target.value);
  };

  const onSubmitEditName = (e) => {
    e.preventDefault();
    if (editName) {
      dispatch(
        updateMemberData({
          categoryId,
          memberId: member.id,
          member: { name: editName },
        })
      );
    }

    setEditName("");
    setIsEditName(false);
  };

  if (isAddNew) {
    return (
      <div
        role="button"
        onClick={onAddNew}
        className="flex flex-col bg-white rounded-[1.875rem] overflow-hidden"
      >
        <div className="p-4">
          <div className="rounded-2xl overflow-hidden">
            <div className="w-full ratio-220-310 relative bg-white-1 rounded-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img src="/game-orbit/common/add.png" alt="" />
                <span className="opacity-20 text-orbit-primary-1 font-sans text-lg mt-4 text-center">
                  Add new person
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-center pb-4 px-4 grow">
          <button className="group relative flex transition-[box-shadow] duration-500 hover:shadow-button-primary-1-hovered items-center justify-center border-solid shadow-button-primary-1 bg-orbit-pink py-2 rounded-[1.875rem] w-full">
            <span className="text-white font-sans text-xl group-hover:-translate-y-[2px] transition-[transform]">
              Add photo
            </span>
            <span className="absolute right-3 group-hover:translate-x-[2px] transition-[transform]">
              <i className="icon-camera text-white" />
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-[1.875rem] overflow-hidden z-0">
      <div className="p-4">
        <div className="rounded-2xl overflow-hidden flex items-center justify-center">
          <div
            className="w-full relative ratio-square min-w-[220px] bg-center bg-cover"
            style={{ backgroundImage: `url(${member.image})` }}
          />
        </div>

        <div className="flex items-center justify-center">
          <div
            role="button"
            onClick={onSelectAvatar}
            className="w-[3.75rem] h-[3.75rem] bg-orbit-primary-1 rounded-full mt-[-1.875rem] shadow-orbit-primary-3 flex items-center justify-center z-10"
          >
            <img src="/game-orbit/common/camera.png" alt="camera" />
          </div>
        </div>

        <div className="pt-4">
          {isEditName ? (
            <form
              onSubmit={onSubmitEditName}
              className="flex grow items-center"
            >
              <div className="flex items-center grow relative">
                <input
                  type="text"
                  onChange={onChangeEditName}
                  placeholder={member.name}
                  onBlur={onSubmitEditName}
                  className="font-sans h-[3.75rem] fold-bold text-orbit-primary-1 w-full outline-none text-center bg-orbit-primary-2 rounded-[1.875rem]"
                />
                <button type="submit" className="absolute right-3">
                  <span>
                    <i className="icon-edit text-lg" />
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div className="flex grow items-center relative">
              <p className="font-bold font-sans text-orbit-primary-1 text-center w-full xl:text-xl lg:text-lg">
                {member.name}
              </p>

              <button
                onClick={() => setIsEditName(true)}
                className="absolute right-0"
              >
                <span>
                  <i className="icon-edit text-lg" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end justify-center pb-4 px-4 grow">
        <button
          disabled={!isShowRemoveButton}
          onClick={onRemoveMember}
          className={`
          ${
            isShowRemoveButton ? "" : "opacity-50"
          } group relative transition-[box-shadow] duration-500 hover:shadow-button-primary-1-hovered flex items-center justify-center border-solid shadow-button-primary-1 bg-orbit-primary py-2 rounded-[1.875rem] w-full
          `}
        >
          <span className="absolute left-3 group-hover:-translate-x-[2px] transition-[transform]">
            <i className="icon-bin text-white" />
          </span>
          <span className="text-white font-sans xl:text-xl lg:text-lg group-hover:-translate-y-[2px] transition-[transform]">
            Remove
          </span>
        </button>
      </div>
    </div>
  );
};
