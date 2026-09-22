/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { shallowEqual, useSelector } from "react-redux";
import { AvatarDefaultItem } from "src/features/whoInMyOrbit/components/AvatarUploader/AvatarDefaultItem";
import { ORBIT_GAME_MODE } from "src/reducers/orbitGamePlay.slice";

export const AvatarUploader = forwardRef(
  ({ onPressTakePhoto, customAvatar, onSelectAvatar }, ref) => {
    const player = useSelector((state) => state.player);
    const defaultAvatars = useSelector(
      (state) => state.orbitGamePlay.defaultAvatars
    );
    const gameMode = useSelector(
      (state) => state.orbitGamePlay.gameMode,
      shallowEqual
    );
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const isSelectedCustomAvatar = useMemo(() => {
      return selectedAvatar === 4;
    }, [selectedAvatar]);

    const onSelectedAvatar = (_, index, uploadedAvatar) => {
      setSelectedAvatar(index);

      if (index < 4) {
        onSelectAvatar({
          avatar: defaultAvatars[index].avatar_default?.url,
          isCustomAvatar: false,
        });
      } else {
        onSelectAvatar({
          avatar: uploadedAvatar,
          isCustomAvatar: true,
        });
      }
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          onSelectedAvatar,
        };
      },
      [customAvatar]
    );

    const renderDefaultAvatar = (item, index) => {
      return (
        <div className="col-3" key={`AVATAR_ITEM_${index}`}>
          <AvatarDefaultItem
            id={item.id}
            onSelectedAvatar={() => onSelectedAvatar(item, index)}
            index={index}
            title={item.avatar_default?.title}
            url={item.avatar_default?.url}
            isActive={index === selectedAvatar}
            activeText={player.name}
          />
        </div>
      );
    };

    return (
      <div className="flex flex-col">
        <h2 className="text-game1-secondary font-sans font-bold text-3xl text-center">
          Choose your avatar
        </h2>

        <div className="row flex justify-center mt-4">
          {defaultAvatars.map(renderDefaultAvatar)}
          {gameMode === ORBIT_GAME_MODE.CUSTOM_PERSONALIZE && (
            <div className="col-3">
              <div
                onClick={
                  customAvatar
                    ? () => onSelectedAvatar(null, 4)
                    : onPressTakePhoto
                }
                role="button"
                className="flex-col flex items-center"
              >
                <div className="relative w-full ratio-square">
                  <div className="absolute top-0 w-full h-full bg-orbit-primary rounded-full flex items-center justify-center p-4">
                    <div
                      className={`z-10 duration-500 transition-[transform] bg-orbit-primary ${
                        isSelectedCustomAvatar ? "scale-0" : "scale-100"
                      } absolute w-full h-full rounded-full`}
                    />
                    <div className="absolute w-full h-full rounded-full bg-game1-secondary" />

                    <div className="relative h-full w-full z-10">
                      {!!customAvatar && (
                        <div className="absolute w-full h-full avatar-clipper">
                          <img
                            src={customAvatar}
                            className="w-full h-full object-cover"
                            alt="avatar"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0">
                        <img
                          key={
                            customAvatar
                              ? "CUSTOMER_AVATAR_1"
                              : "CUSTOM_AVATAR_2"
                          }
                          src={
                            !!customAvatar
                              ? "/game-orbit/default-avatar/helmet-1@3x.png"
                              : "/game-orbit/default-avatar/avatar-helmet.png"
                          }
                          className="h-full w-full"
                          alt="helmet"
                        />
                      </div>

                      {!!customAvatar && (
                        <div
                          role="button"
                          onClick={onPressTakePhoto}
                          className="absolute top-full left-1/2 -translate-x-[50%] -translate-y-[20%] flex items-center justify-center"
                        >
                          <div className=" flex items-center justify-center h-16 w-16 rounded-full shadow-button-primary-1 bg-orbit-primary">
                            <img
                              src="/game-orbit/common/camera.png"
                              alt="camera"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!customAvatar ? (
                  <p className="font-sans text-xl text-white mt-8">
                    Take a photo
                  </p>
                ) : (
                  isSelectedCustomAvatar && (
                    <p className="font-sans text-xl text-center text-game1-secondary mt-8">
                      {player.name}
                    </p>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
