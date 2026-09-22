// @flow
import { createSlice } from "@reduxjs/toolkit";

export type Member = {
  name: string,
  image: string,
  question: string,
  levelOfTouch: {
    value: number,
    label: string,
  }[],
  message: string,
  incorrectMessage: string,
  correctMessage: string,
};

export type State = {
  categories: any[],
};

export const initialState: State = {
  defaultMessageForCategories: [],
  categories: [],
};

const orbitPersonalizedCategoriesSlice = createSlice({
  name: "OrbitPersonalizedCategories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state = {
        ...state,
        categories: action.payload,
      };
      return state;
    },
    setCategoryMember(state, action) {
      const { categoryId, members }: { categoryId: string, members: Member[] } =
        action.payload;
      const currentCategoryIndex = state.categories.findIndex(
        (item) => item.id === categoryId
      );

      if (currentCategoryIndex !== -1) {
        state.categories[currentCategoryIndex] = {
          ...state.categories[currentCategoryIndex],
          members: members || [],
        };
      }

      return state;
    },
    updateMemberData(state, action) {
      const { memberId, categoryId, member } = action.payload;
      const currentCategoryIndex = state.categories.findIndex(
        (item) => item.id === categoryId
      );

      if (currentCategoryIndex !== -1) {
        const memberIndex = state.categories[
          currentCategoryIndex
        ].members.findIndex((item) => item.id === memberId);

        if (memberIndex !== -1) {
          state.categories[currentCategoryIndex].members[memberIndex] = {
            ...state.categories[currentCategoryIndex].members[memberIndex],
            ...member,
          };
        }
      }

      return state;
    },
    addMember(state, action) {
      const { categoryId, member } = action.payload;
      const currentCategoryIndex = state.categories.findIndex(
        (item) => item.id === categoryId
      );

      if (currentCategoryIndex !== -1) {
        const defaultLevel =
          state.categories[currentCategoryIndex].acf.data_member_default[0]
            .question_and_message_for_level;
        state.categories[currentCategoryIndex].members = [
          ...state.categories[currentCategoryIndex].members,
          {
            ...member,
            levelOfTouch: !!defaultLevel
              ? defaultLevel.map((item) => {
                  return {
                    ...item,
                    question_member: item.question_member_for_level,
                  };
                })
              : false,
          },
        ];
      }

      return state;
    },

    removeMember(state, action) {
      const { categoryId, memberId } = action.payload;
      const currentCategoryIndex = state.categories.findIndex(
        (item) => item.id === categoryId
      );

      if (currentCategoryIndex !== -1) {
        const memberIndex = state.categories[
          currentCategoryIndex
        ].members.findIndex((member) => {
          return member.id === memberId;
        });
        state.categories[currentCategoryIndex].members.splice(memberIndex, 1);
      }

      return state;
    },
  },
});

export const {
  setCategories,
  setCategoryMember,
  updateMemberData,
  addMember,
  removeMember,
} = orbitPersonalizedCategoriesSlice.actions;
export const categoryMembersSelector = (categoryId) => (state) => {
  return (
    state.personalized.categories.find((item) => item.id === categoryId)
      ?.members || []
  );
};
export default orbitPersonalizedCategoriesSlice.reducer;
