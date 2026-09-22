import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import circleTypes from "src/features/whoInMyOrbit/constants/circleTypes";
import { motion, useMotionValue } from "framer-motion";

const circleItem = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

export const OrbitCircleItem = forwardRef(({ type }, ref) => {
  const translateX = useMotionValue("-50%");
  const translateY = useMotionValue("-50%");
  const [activeClass, setActiveClass] = useState("");
  const activeRef = useRef(false);
  const circleRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      calculateBoundary() {
        return {
          type,
          boundary: circleRef.current.getBoundingClientRect(),
        };
      },
      setActive(isActive) {
        if (activeRef.current !== isActive) {
          if (isActive) {
            let activeClassName = "";

            switch (type) {
              case circleTypes.HUG: {
                activeClassName = "drop-shadow-hug";
                break;
              }
              case circleTypes.KISS: {
                activeClassName = "drop-shadow-kiss";
                break;
              }
              case circleTypes.WAVE: {
                activeClassName = "drop-shadow-wave";
                break;
              }
              case circleTypes.HIGH_FIVE: {
                activeClassName = "drop-shadow-high-five";
                break;
              }
              case circleTypes.STRANGER: {
                activeClassName = "drop-shadow-stranger";
                break;
              }
              default:
                break;
            }

            setActiveClass(activeClassName);
          } else {
            setActiveClass("");
          }

          activeRef.current = isActive;
        }
      },
    };
  });

  const getClassName = useMemo(() => {
    switch (type) {
      case circleTypes.HUG: {
        return "xl:w-[500px] xl:h-[500px] md:w-[400px] md:h-[400px] bg-circle-hug";
      }
      case circleTypes.STRANGER: {
        return "xl:w-[1100px] xl:h-[1100px] md:w-[1000px] md:h-[1000px] bg-circle-stranger";
      }
      case circleTypes.KISS: {
        return "xl:w-[300px] xl:h-[300px] md:w-[200px] md:h-[200px] bg-circle-kiss";
      }
      case circleTypes.WAVE: {
        return "xl:w-[900px] xl:h-[900px] md:w-[800px] md:h-[800px] bg-circle-wave";
      }
      case circleTypes.HIGH_FIVE: {
        return "xl:w-[700px] xl:h-[700px] md:w-[600px] md:h-[600px] bg-circle-high-five";
      }
      default:
        return "";
    }
  }, [type]);

  return (
    <motion.div
      ref={circleRef}
      variants={circleItem}
      style={{
        translateX,
        translateY,
      }}
      className={`rounded-full absolute transition-[filter] ${getClassName} ${activeClass}`}
    >
      <div
        className={`absolute top-[50%] left-0 -translate-y-[50%] ${
          type === circleTypes.KISS ? "xl:w-[100px] md:w-[70px]" : "w-[100px]"
        } flex items-center justify-center`}
      >
        <h1 className="text-white font-sans font-bold text-uppercase text-center">
          {type.replace("_", "-")}
        </h1>
      </div>
    </motion.div>
  );
});
