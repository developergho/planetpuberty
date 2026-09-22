import { GameModeItem } from "src/components/GameModeItem";

export const GameModeItemContainer = ({ mode, onClickMode }) => {
  return (
    <GameModeItem
      onClick={onClickMode}
      icon={mode?.icon_gamemode?.url}
      title={mode.heading_gamemode}
      description={mode.description_gamemode}
    />
  );
};
