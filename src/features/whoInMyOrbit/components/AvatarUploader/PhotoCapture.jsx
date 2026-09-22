import { useEffect, useRef } from "react";

export const PhotoCapture = ({
  onCapturePhoto,
  onRequestClose,
  isShowHelmet = true,
}) => {
  const videoRef = useRef();
  const onInitialCamera = async () => {
    try {
      const permission = await navigator.permissions.query({ name: "camera" });
      if (permission.state === "denied") {
        alert("This game works best when used with camera");
        return onRequestClose();
      }
    } catch (e) {}

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((e) => {
        if (
          e.message === "Permission denied" ||
          e.toString().includes("NotAllowedError")
        ) {
          alert("This game works best when used with camera");
          onRequestClose();
        }
      });
  };

  useEffect(() => {
    onInitialCamera();
    const localVideoRef = videoRef.current;

    return () => {
      if (localVideoRef && localVideoRef.srcObject) {
        const stream = localVideoRef.srcObject;
        const tracks = stream.getTracks();

        for (let i = 0; i < tracks.length; i++) {
          const track = tracks[i];
          track.stop();
        }

        localVideoRef.srcObject = null;
      }
    };
  }, []);

  const onClickCapture = () => {
    const camera = document.getElementById("camera-view");
    const canvas = document.getElementById("avatar-capture");
    canvas.height = camera.videoHeight;
    canvas.width = camera.videoWidth;
    const context = canvas.getContext("2d");

    context.drawImage(camera, 0, 0, canvas.width, canvas.height);

    onCapturePhoto(canvas.toDataURL("image/jpeg"));
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <h2 className="font-sans text-game1-secondary text-center text-[1.75rem]">
          Take a photo
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col bg-white tablet-lg:max-w-[582px] tablet:max-w-[550px] w-full rounded-t-[1.875rem] ml-[4.5rem] border-feeling-primary border-4 border-bottom-0">
          <div className="w-full ratio-square relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 m-[1.25rem] rounded-[1.875rem] overflow-hidden">
              <video
                ref={videoRef}
                id="camera-view"
                autoPlay
                className="h-full w-full object-cover bg-gradient-primary"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4">
                <div className="relative h-full w-full">
                  <canvas
                    id="avatar-capture"
                    className="h-full w-full scale-[0.7] translate-y-[10%] bg-white hidden"
                  />

                  {isShowHelmet && (
                    <img
                      src="/game-orbit/default-avatar/helmet-1@3x.png"
                      className="absolute top-0 right-0 bottom-0 left-0 h-full w-full"
                      alt="helmet"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center px-4 pb-4">
            <button
              onClick={onClickCapture}
              className="rounded-full h-[5rem] w-[5rem] border-[6px] border-orbit-primary-1 bg-orbit-primary"
            />
          </div>
        </div>
        <button
          onClick={onRequestClose}
          className="rounded-full bg-white h-[3rem] w-[3rem] ml-4 shadow-white-1 pointer-events-auto"
        >
          <span>
            <i className="icon-close" />
          </span>
        </button>
      </div>
    </div>
  );
};
