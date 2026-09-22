/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addMember,
  updateMemberData,
} from "src/reducers/orbitPersonalizedCategories.slice";
import { OrbitCategoryItem } from "src/features/whoInMyOrbit/containers/OrbitCategory/orbitCategoryItem";
import { PhotoPickerContainer } from "src/features/whoInMyOrbit/containers/PhotoPicker";
import { nanoid } from "@reduxjs/toolkit";
import { motion } from "framer-motion";

const backDrop = {
  show: {
    opacity: 0.5,
  },
  hidden: {
    opacity: 0,
  },
};

export const OrbitCategoryContainer = ({ goBack, onNext }) => {
  const currentRound = useSelector(
    (state) => state.orbitGamePlay.currentRound,
    shallowEqual
  );
  const categories = useSelector((state) => state.personalized.categories);
  const dispatch = useDispatch();
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const selectedCategoryMemberRef = useRef();

  const onSelectAvatar = (category, member, isAddNew) => {
    if (isAddNew) {
      selectedCategoryMemberRef.current = {
        category,
        isAddNew,
      };
    } else {
      selectedCategoryMemberRef.current = {
        category,
        member,
      };
    }

    setShowPhotoPicker(true);
  };

  const onSubmitAvatar = (url) => {
    const { member, category, isAddNew } = selectedCategoryMemberRef.current;

    if (isAddNew) {
      dispatch(
        addMember({
          categoryId: category.id,
          member: {
            id: nanoid(),
            name: "New person",
            image: url,
            isAddNew,
          },
        })
      );
    } else {
      dispatch(
        updateMemberData({
          categoryId: category.id,
          memberId: member.id,
          member: {
            image: url,
          },
        })
      );
    }

    setShowPhotoPicker(false);
    selectedCategoryMemberRef.current = null;
  };

  const renderCategoryItem = (item) => {
    return (
      <div className="mt-[3.75rem]" key={item.id}>
        <OrbitCategoryItem category={item} onSelectAvatar={onSelectAvatar} />
      </div>
    );
  };

  return (
    <>
      <div className="-mx-[47px] overflow-auto">
        <div className="w-full px-4 pb-26 pb-[130px]">{categories.map(renderCategoryItem)}</div>

        <div className="flex items-center justify-center py-4 fixed bottom-0 left-0 right-0">
          {currentRound < 2 && (
            <button
              onClick={goBack}
              className="gho-btn-action gho-btn-action__back gho-icon-btn gho-icon-btn__left"
            >
              Back
            </button>
          )}
          <button
            onClick={onNext}
            className="gho-btn-action gho-btn-action__next gho-icon-btn gho-icon-btn__right"
          >
            Play game
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 bottom-0 right-0 ${
          showPhotoPicker ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <motion.div
          variants={backDrop}
          animate={showPhotoPicker ? "show" : "hidden"}
          initial="hidden"
          className="absolute inset-0 bg-orbit-primary pointer-events-none"
        />

        <PhotoPickerContainer
          isShowHelmet={false}
          visible={showPhotoPicker}
          onRequestClose={() => {
            setShowPhotoPicker(false);
            selectedCategoryMemberRef.current = null;
          }}
          onSubmitPhoto={onSubmitAvatar}
        />
      </div>
    </>
  );
};
