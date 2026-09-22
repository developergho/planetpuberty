import { animate, motion, useMotionValue } from "framer-motion";

export const GameModeItem = ({ title, icon, description, onClick }) => {
  const top = useMotionValue("100%");
  const translateX = useMotionValue("-50%");
  return (
    <motion.div
      onClick={onClick}
      role="button"
      onHoverStart={() => {
        animate(top, "30%");
      }}
      onHoverEnd={() => {
        animate(top, "100%");
      }}
      className="flex flex-col rounded-[1.875rem] bg-white p-4 h-full relative overflow-hidden xl:w-[400px] md:w-[320px] z-0"
    >
      <motion.div
        style={{ top, translateX, left: "50%", position: 'absolute' }}
        className="bg-game1-secondary opacity-50 rounded-[50%] h-[150%] w-[250%] absolute z-0"
      />

      <div className="flex flex-col z-10">
        <div className="w-full flex items-center justify-center">
          <img className="w-full h-auto md:max-w-[280px] xl:max-w-[360px]" src={icon} alt={title} />
        </div>
        <h4 className="font-sans font-bold text-feeling-primary text-center text-[1.5rem] leading-[1.75rem]">
          {title}
        </h4>
        <div className='flex grow flex-col justify-start'>
          <p
              className="text-[1.375rem] font-roboto text-feeling-primary text-center mt-4 text-[1.375rem] leading-[1.625rem]"
              dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </motion.div>
  );
};
