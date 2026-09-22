/* eslint-disable react-hooks/exhaustive-deps,jsx-a11y/alt-text */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { animate, motion, useMotionValue } from "framer-motion";
import { delayed, randomIntegerInRange } from "src/common/helpers";
import circleTypes from "src/features/whoInMyOrbit/constants/circleTypes";
import { OrbitCircleItem } from "src/features/whoInMyOrbit/components/OrbitGamePlay/OrbitCircleItem";
import { LastMinuteInstruction } from "src/features/whoInMyOrbit/components/OrbitGamePlay/LastMinuteInstruction";
import { PromptMessage } from "src/features/whoInMyOrbit/components/OrbitGamePlay/PromptMessage";
import { addDraggedMember } from "src/reducers/orbitGamePlay.slice";
import { OrbitMember } from "src/features/whoInMyOrbit/components/OrbitGamePlay/OrbitMember";
import { FinishRoundModal } from "src/components/FinishRoundModal";

const introContainer = {
  hidden: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const introItem = {
  hidden: { opacity: 0, translateY: "-20%" },
  show: { opacity: 1, translateY: 0 },
};

const circleContainer = {
  hidden: {
    transition: {
      staggerChildren: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  show: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const OrbitCircle = ({ playNextRound }) => {
  const orbitGamePlayData = useSelector(
    (state) => state.orbitGamePlay,
    shallowEqual
  );
  const correctMessages = [
    "Excellent",
    "Superb",
    "Great",
    "Fantastic",
    "Good job ",
  ];
  const [showIntro, setShowIntro] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const [showCircleItem, setShowCircleItem] = useState(false);
  const circleItemRefs = useRef({});
  const circleBoundaries = useRef({});
  const memberRef = useRef();
  const draggedTypeRef = useRef([]);
  const player = useSelector((state) => state.player);
  const top = useMotionValue("50%");
  const left = useMotionValue("50%");
  const scale = useMotionValue(0);
  const translateX = useMotionValue("-50%");
  const translateY = useMotionValue("-50%");
  const memberDragScale = useMotionValue(1);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [showLastInstruction, setShowLastInstruction] = useState(false);
  const [showPromptMessage, setShowPromptMessage] = useState(false);
  const [consentMessage, setConsentMessage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const memberPositionRef = useRef({});

  const getCurrentRoundData = useMemo(() => {
    if (orbitGamePlayData.currentRound === 1) {
      return orbitGamePlayData.firstRound;
    } else {
      return orbitGamePlayData.secondRound;
    }
  }, [orbitGamePlayData]);

  const getRoundMemberData = useMemo(() => {
    if (orbitGamePlayData.currentRound === 1) {
      return getCurrentRoundData[currentMemberIndex];
    } else {
      return getCurrentRoundData[currentMemberIndex];
    }
  }, [getCurrentRoundData, currentMemberIndex]);

  useEffect(() => {
    (async () => {
      await delayed(250);
      setShowIntro(true);
      await delayed(2000);
      setShowIntro(false);
      await delayed(750);
      setShowCircle(true);
      animate(scale, 2);
      await delayed(500);
      animate(scale, 1, { duration: 0.5 });
      setShowCircleItem(true);
      await delayed(1200);
      animate(left, "90%", {
        duration: 1,
        ease: [0.5, 0, 0.75, 0],
        onComplete: async () => {
          await delayed(250);
          for (const circleItemRef of Object.values(circleItemRefs.current)) {
            if (circleItemRef) {
              const { type, boundary } = circleItemRef.calculateBoundary();
              circleBoundaries.current = {
                ...circleBoundaries.current,
                [type]: boundary,
              };
            }
          }

          setShowLastInstruction(true);
        },
      });
    })();
  }, []);

  const onConfirmLastInstruction = async () => {
    setShowLastInstruction(false);
    setShowMember(true);
  };

  const calculateCircleDistance = () => {
    const { x, y, width, height } = memberRef.current.getBoundingClientRect();

    return Object.keys(circleBoundaries.current).reduce((acc, circleType) => {
      const circleRef = circleBoundaries.current[circleType];

      const circleX = circleRef.x + circleRef.width / 2;
      const circleY = circleRef.y + circleRef.height / 2;
      const dx = circleX - (x + width / 2);
      const dy = circleY - (y + height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const CIRCLE_GAP = width;

      const isEnter =
        distance <= circleRef.width / 2 + width / 2 &&
        distance > circleRef.width / 2 - CIRCLE_GAP;

      if (isEnter) {
        acc.push(circleType);
      }

      return acc;
    }, []);
  };

  const onDrag = () => {
    const draggedType = calculateCircleDistance();

    Object.values(circleTypes).forEach((value) => {
      circleItemRefs.current[value].setActive(draggedType.includes(value));
    });
  };

  const onDragEnd = async () => {
    try {
      let draggedType = calculateCircleDistance();
      draggedType = draggedType.map((item) =>
        item.replace("_", "-").toLowerCase()
      );
      draggedTypeRef.current = draggedType;

      if (!draggedType.length) return;

      let consentQuestion;

      if (
        getRoundMemberData.levelOfTouch &&
        getRoundMemberData.levelOfTouch.length
      ) {
        const filterLevelOfTouch = getRoundMemberData.levelOfTouch.filter(
          (item) => {
            return draggedType.includes(
              item.level_of_touch_for_member?.label.toLowerCase()
            );
          }
        );

        const incorrectOrbit = filterLevelOfTouch.find((item) => {
          return item.check_level_of_touch_for_member?.value === "no";
        });

        const correctOrbit = filterLevelOfTouch.find((item) => {
          return (
            item.check_level_of_touch_for_member?.value === "yes" &&
            !!item.question_member
          );
        });

        if (incorrectOrbit) {
          if (incorrectOrbit.question_member) {
            consentQuestion = {
              ...incorrectOrbit,
              type: "prompt",
              incorrect: true,
            };
          } else {
            consentQuestion = {
              ...incorrectOrbit,
              type: "alert",
              incorrect: true,
            };
          }

          setConsentMessage(consentQuestion);
          setShowPromptMessage(true);
        } else if (correctOrbit) {
          consentQuestion = {
            ...correctOrbit,
            type: "prompt",
          };
          setConsentMessage(consentQuestion);
          setShowPromptMessage(true);
        } else {
          setSuccessMessage(
            `${
              getRoundMemberData?.text_correct_orbit ||
              correctMessages[
                randomIntegerInRange(0, correctMessages.length - 1)
              ]
            } ${player.name}!`
          );
          setShowSuccess(true);

          dispatch(
            addDraggedMember({
              member: {
                ...getRoundMemberData,
                draggedTypes: draggedTypeRef.current,
              },
            })
          );
        }
      } else {
        setSuccessMessage(
          `${
            correctMessages[randomIntegerInRange(0, correctMessages.length - 1)]
          } ${player.name}!`
        );
        setShowSuccess(true);

        dispatch(
          addDraggedMember({
            member: {
              ...getRoundMemberData,
              draggedTypes: draggedTypeRef.current,
            },
          })
        );
      }

      memberDragScale.set(0);
      setTimeout(() => {
        animate(memberDragScale, 1);
      }, 500);

      Object.values(circleItemRefs.current).forEach((item) =>
        item.setActive(false)
      );

      await delayed(2000);

      if (!consentQuestion) {
        if (currentMemberIndex < getCurrentRoundData.length - 1) {
          setCurrentMemberIndex(currentMemberIndex + 1);
        } else {
          setShowFinish(true);
          setCurrentMemberIndex(0);
        }

        setShowSuccess(false);
        setSuccessMessage("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setShowArrow(true);
    }
  };

  const onAddMemberToOrbit = (member) => {
    setShowPromptMessage(false);
    setConsentMessage(null);

    if (member) {
      dispatch(
        addDraggedMember({
          member: {
            ...member,
            draggedTypes: draggedTypeRef.current,
          },
        })
      );

      if (currentMemberIndex < getCurrentRoundData.length - 1) {
        setCurrentMemberIndex(currentMemberIndex + 1);
      } else {
        setShowFinish(true);
        setCurrentMemberIndex(0);
      }
    }
  };

  const onRetry = () => {
    setShowPromptMessage(false);
    setConsentMessage(null);
  };

  const renderIntro = () => {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <motion.div
          variants={introContainer}
          initial="hidden"
          animate={showIntro ? "show" : "hidden"}
          className="flex flex-col items-center justify-center"
        >
          <motion.h1
            variants={introItem}
            className="text-[2.375rem] font-sans font-bold text-white"
          >
            Hi {player.name}, this is you!
          </motion.h1>
          <motion.div
            variants={introItem}
            className="h-[160px] w-[160px] bg-white rounded-full border-1 border-white flex items-center justify-center mt-4"
          >
            {player.isCustomAvatar ? (
              <div className="relative h-[120px] w-[120px]">
                <div className="w-full h-full avatar-clipper">
                  <img
                    src={player.avatar}
                    className="w-full h-full object-cover"
                  />
                </div>
                <img
                  src="/game-orbit/default-avatar/helmet-1@2x.png"
                  className="absolute top-0 right-0 bottom-0 left-0 h-full w-full"
                />
              </div>
            ) : (
              <img
                src={player.avatar}
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const renderCircle = () => {
    return (
      <motion.div
        variants={circleContainer}
        initial="hidden"
        animate={showCircleItem ? "show" : "hidden"}
        className="absolute -translate-y-[50%] -translate-x-[50%]"
        style={{ top, left }}
      >
        {Object.keys(circleTypes)
          .reverse()
          .map((type) => (
            <OrbitCircleItem
              key={`ORBIT_TYPE_${type}`}
              ref={(ref) =>
                Object.assign(circleItemRefs.current, { [type]: ref })
              }
              type={type}
            />
          ))}

        <OrbitMember
          onInitItem={(member) => {
            for (let key of member.keys) {
              let initialMember = memberPositionRef.current[key];

              if (!initialMember) {
                initialMember = new Set([member.arc]);
              } else {
                initialMember.add(member.arc);
              }

              memberPositionRef.current = {
                ...memberPositionRef.current,
                [key]: initialMember,
              };
            }
          }}
          getMemberPosition={() => memberPositionRef.current}
          getCircleRefs={() => circleBoundaries.current}
        />

        <motion.div
          style={{ scale, translateX, translateY }}
          className="absolute xl:w-[100px] xl:h-[100px] md:w-[70px] md:h-[70px] bg-white rounded-full border-1 border-white flex items-center justify-center"
        >
          {player.isCustomAvatar ? (
            <div className="relative xl:w-[80px] xl:h-[80px] md:w-[50px] md:h-[50px]">
              <div className="w-full h-full avatar-clipper">
                <img
                  src={player.avatar}
                  className="w-full h-full object-cover"
                />
              </div>
              <img
                src="/game-orbit/default-avatar/helmet-1@2x.png"
                className="absolute top-0 right-0 bottom-0 left-0 h-full w-full"
              />
            </div>
          ) : (
            <img
              src={player.avatar}
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="w-full h-full relative select-none lg:scale-[1] md:scale-[0.9]">
        {!showCircle ? renderIntro() : renderCircle()}

        {showMember &&
          !!getRoundMemberData &&
          !showPromptMessage &&
          !showLastInstruction &&
          !showFinish && (
            <>
              <div className="flex flex-column items-center justify-center absolute -translate-y-[calc(50%)] -translate-x-[50%] top-[50%] left-[15%] select-none">
                <div className="lg:max-w-[300px] xl:max-w-[400px] mb-[3rem]">
                  {showSuccess ? (
                    <h1 className="text-center text-white font-bold font-sans lg:text-lg xl:text-[1.875rem]">
                      {successMessage || "Fantastic!"}
                    </h1>
                  ) : (
                    <h1 className="text-center text-white font-bold font-sans lg:text-lg xl:text-[1.875rem]">
                      What orbit is the right type of touch for...
                    </h1>
                  )}
                </div>

                <div className="flex items-center">
                  <motion.div
                    ref={memberRef}
                    drag={!showSuccess && !showPromptMessage}
                    dragMomentum={false}
                    dragSnapToOrigin
                    whileDrag={{ height: 100, width: 100 }}
                    style={{ scale: memberDragScale }}
                    onDragStart={() => {
                      setShowArrow(false);
                    }}
                    onDrag={onDrag}
                    onDragEnd={onDragEnd}
                    className="w-[220px] h-[220px] rounded-full ml-[100px] border-[4px] border-white"
                  >
                    {showSuccess ? (
                      <img
                        key="/game-orbit/common/thumbs-up@2x.png"
                        id="thumb-up"
                        src="/game-orbit/common/thumbs-up@2x.png"
                        className="w-full h-full object-cover rounded-full pointer-events-none"
                        alt="icon-thumb-up"
                      />
                    ) : (
                      <img
                        key={getRoundMemberData.image}
                        id="dragable-member-avatar"
                        src={getRoundMemberData.image}
                        className="w-full h-full object-cover rounded-full pointer-events-none"
                        alt={player.name}
                      />
                    )}
                  </motion.div>
                  <div className="pointer-events-none w-[100px] h-[100px]">
                    {showArrow && !showSuccess && (
                      <img
                        src="/game-orbit/common/arrows.png"
                        className="w-full h-full object-cover pointer-events-none"
                        alt="arrow"
                      />
                    )}
                  </div>
                </div>

                {!showSuccess && (
                  <h1 className="lg:text-lg xl:text-[1.875rem] text-white font-sans fold-bold text-center mt-5">
                    {getRoundMemberData.name}
                  </h1>
                )}
              </div>
            </>
          )}
      </div>

      <LastMinuteInstruction
        visible={showLastInstruction}
        onConfirm={onConfirmLastInstruction}
      />

      <PromptMessage
        member={getRoundMemberData}
        consentMessage={consentMessage}
        onRetry={onRetry}
        visible={showPromptMessage}
        onNext={onAddMemberToOrbit}
      />

      <FinishRoundModal
        visible={showFinish}
        title={orbitGamePlayData.gamePlayInfo?.title_popup_result_round}
        currentRound={orbitGamePlayData.currentRound}
        content={orbitGamePlayData.gamePlayInfo?.description_popup_result_round}
        contentGameOver={orbitGamePlayData.gamePlayInfo?.description_game_over}
        image={orbitGamePlayData.gamePlayInfo?.icon_popup_result_round?.url}
        isEndGame={orbitGamePlayData.currentRound === 2}
        otherGames={orbitGamePlayData.gamePlayInfo?.play_games_other}
        onPlayNextRound={playNextRound}
        onExit={() => {}}
      />
    </>
  );
};
