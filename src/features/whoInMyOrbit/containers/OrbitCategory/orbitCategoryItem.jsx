// @flow
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  categoryMembersSelector,
  removeMember,
  setCategoryMember,
} from "src/reducers/orbitPersonalizedCategories.slice";
import { getCategoryMembers } from "src/common/apis/game1";
import { useEffect, useMemo } from "react";
import { OrbitCategoryMember } from "src/features/whoInMyOrbit/components/OrbitCategories/OrbitCategoryMember";

export const OrbitCategoryItem = ({ category, onSelectAvatar }) => {
  const MAX_MEMBERS = 8;
  const members = useSelector(categoryMembersSelector(category.id));
  const dispatch = useDispatch();

  const isShowAddingButton = useMemo(() => {
    return MAX_MEMBERS - members.length > 0;
  }, [members]);

  const initialMembers = async () => {
    if (members.length) return;

    try {
      const { data: responseMembers } = await getCategoryMembers(category.id);
      const transformedMembers = responseMembers.map((item) => {
        const member = item.acf.data_member[0];
        return {
          id: item.id,
          name: member.name_member,
          image: member.image_member?.url,
          levelOfTouch: member.level_of_touch_and_question,
          ...member,
        };
      });

      dispatch(
        setCategoryMember({
          categoryId: category.id,
          members: transformedMembers,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initialMembers();
  }, []);

  const onRemoveMember = (category, member) => {
    if (category.members.length > 2) {
      dispatch(
        removeMember({
          categoryId: category.id,
          memberId: member.id,
        })
      );
    }
  };

  const renderMember = (member) => {
    return (
      <OrbitCategoryMember
        key={member.id}
        member={member}
        categoryId={category.id}
        isShowRemoveButton={category.members.length > 2}
        onRemoveMember={() => {
          const confirmed = window.confirm(
            `Are you sure want to delete ${member.name}?`
          );

          if (confirmed) {
            onRemoveMember(category, member);
          }
        }}
        onSelectAvatar={() => {
          onSelectAvatar(category, member);
        }}
      />
    );
  };

  return (
    <div className="d-flex flex-col items-center w-full">
      <h1 className="text-game1-secondary font-sans fold-bold text-[1.875rem] mb-3">
        {category.name}
      </h1>

      <div className="grid grid-cols-4 gap-4 max-w-[1100px]">
        {members.map(renderMember)}
        {isShowAddingButton && (
          <OrbitCategoryMember
            isAddNew
            onAddNew={() => {
              onSelectAvatar(category, null, true);
            }}
          />
        )}
      </div>
    </div>
  );
};
