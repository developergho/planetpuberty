import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { OrbitMemberItem } from "src/features/whoInMyOrbit/components/OrbitGamePlay/OrbitMemberItem";

export const OrbitMember = memo(({ getCircleRefs, onInitItem, getMemberPosition }) => {
  const orbitMembers = useSelector(
    (state) => state.orbitGamePlay.memberAdded,
    shallowEqual
  );

  const renderMember = (member) => {
    return (
      <OrbitMemberItem
        key={member.id}
        getCircleRefs={getCircleRefs}
        member={member}
        onInitItem={onInitItem}
        getMemberPosition={getMemberPosition}
      />
    );
  };

  return orbitMembers.map(renderMember);
});
