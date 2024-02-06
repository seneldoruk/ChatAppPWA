//https://stackoverflow.com/questions/70544832/detect-shake-event-with-javascript-with-all-major-browsers-devices-ios-androi
async function setMotionListeners(callback: () => void) {
  // MOTION LISTENER
  window.addEventListener("devicemotion", (event) => {
    console.log("Device motion event: %O", event);
    const { rotationRate } = event;
    if (!rotationRate) return;
    const { beta, alpha, gamma } = rotationRate;

    console.log();
    // SHAKE EVENT
    // Using rotationRate, which essentially is velocity,
    // we check each axis (alpha, beta, gamma) whether they cross a threshold (e.g. 256).
    // Lower = more sensitive, higher = less sensitive. 256 works nice, imho.
    if (!beta || !alpha || !gamma) return;
    console.log();

    if (alpha > 256 || beta > 256 || gamma > 256) {
      callback();
    }
  });
}

export async function checkPermissionAndListen(callback: () => void) {
  //eslint-disable-next-line
  if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
    //eslint-disable-next-line
    await (DeviceOrientationEvent as any)
      .requestPermission()
      .then((permissionState: string) => {
        if (permissionState === "granted") {
          setMotionListeners(callback);
        }
      });
  } else {
    await setMotionListeners(callback);
  }
}
