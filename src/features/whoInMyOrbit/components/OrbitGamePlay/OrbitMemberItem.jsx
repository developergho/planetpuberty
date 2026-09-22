/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import minBy from "lodash/minBy";
import { ARC_POSITION } from "src/common/constants";
import { randomIntegerInRange } from "src/common/helpers";
import circleTypes from "src/features/whoInMyOrbit/constants/circleTypes";
import maxBy from "lodash/maxBy";
import { useMediaQuery } from "react-responsive";

export const OrbitMemberItem = memo(
  ({ member, getCircleRefs, onInitItem, getMemberPosition }) => {
    const BASE_CIRCLE_SIZE = 50;
    const rotation = useMotionValue(0);
    const containerTranslateX = useMotionValue("-50%");
    const containerTranslateY = useMotionValue("-50%");
    const translateX = useMotionValue(0);
    const rotateChild = useMotionValue(90);
    const scale = useMotionValue(0);
    const height = useMotionValue(BASE_CIRCLE_SIZE);
    const width = useMotionValue(BASE_CIRCLE_SIZE);
    const memberRef = useRef();
    const isDesktop = useMediaQuery({ minWidth: 1280 });
    const isSmallTablet = useMediaQuery({ maxWidth: 600 });

    const onInit = () => {
      const { draggedTypes } = member;
      const circleRefs = getCircleRefs();
      const draggedTypeWidth = draggedTypes.map((item) => ({
        key: item.replace("-", "_").toUpperCase(),
        width: circleRefs[item.replace("-", "_").toUpperCase()]?.width,
      }));
      const [circumscribed, inscribed] = Object.values(circleRefs);
      const CIRCLE_GAP = circumscribed.width - inscribed.width;
      const { key, width: minWidth } = minBy(draggedTypeWidth, "width");
      const { scale: itemScale, hybridScale, positions } = ARC_POSITION[key];
      const otherMemberPositions = getMemberPosition();
      let arc;
      let positionKey =
        draggedTypes.length < 2 ? key : maxBy(draggedTypeWidth, "width").key;
      let isDuplicatedArc;
      let tried = 0;

      do {
        const unoccupiedPositions = positions.filter((item) => {
          const occupiedPositions = otherMemberPositions[key] || new Set();

          return !occupiedPositions.has(item);
        });
        if (tried >= 5) {
          arc = randomIntegerInRange(
            positions[0],
            positions[positions.length - 1]
          );
          break;
        }
        arc =
          unoccupiedPositions[
            randomIntegerInRange(0, unoccupiedPositions.length - 1)
          ];
        isDuplicatedArc =
          draggedTypes.length < 2
            ? otherMemberPositions[positionKey] &&
              otherMemberPositions[positionKey].has(arc)
            : (otherMemberPositions[positionKey] &&
                otherMemberPositions[positionKey].has(arc)) ||
              (otherMemberPositions[key] && otherMemberPositions[key].has(arc));
        tried++;
      } while (isDuplicatedArc);

      const MEMBER_SIZE =
        draggedTypes.length < 2 &&
        draggedTypes
          .map((item) => item.replace("-", "_").toUpperCase())
          .includes(circleTypes.KISS)
          ? 70
          : 50;
      rotation.set(arc);
      rotateChild.set(arc > 180 ? 360 - arc + 90 : 90 - arc);
      const CIRCLE_OFFSET = 20;
      const distance =
        draggedTypes.length > 1
          ? minWidth / 2
          : minWidth / 2 -
            (CIRCLE_GAP / 2 - MEMBER_SIZE) -
            (key === circleTypes.KISS && isDesktop ? CIRCLE_OFFSET : 0);
      const distanceScale = isSmallTablet ? 1.1 : 1;
      translateX.set(distance * distanceScale);
      const getScale = draggedTypes.length > 1 ? hybridScale : itemScale;

      height.set(BASE_CIRCLE_SIZE * getScale);
      width.set(BASE_CIRCLE_SIZE * getScale);

      onInitItem({
        keys: draggedTypeWidth.map((item) => item.key),
        id: member.id,
        arc,
      });
      animate(scale, 1);
    };

    useEffect(() => {
      onInit();
    }, []);

    return (
      <motion.div
        key={member.name}
        style={{
          rotate: 270,
          translateX: containerTranslateX,
          translateY: containerTranslateY,
        }}
        className="absolute -translate-y-[50%] -translate-x-[50%]"
      >
        <motion.div
          style={{
            rotate: rotation,
            translateX: containerTranslateX,
            translateY: containerTranslateY,
          }}
          className="absolute insect-0"
        >
          <motion.div
            ref={memberRef}
            style={{
              translateX,
              scale,
              height,
              width,
              rotate: rotateChild,
            }}
            className="rounded-full border-2 border-white bg-white"
          >
            <motion.img
              key={member.name}
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);
