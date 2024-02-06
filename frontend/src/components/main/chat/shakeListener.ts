async function setMotionListeners(callback: () => void) {
  window.addEventListener("devicemotion", (event) => {
    const { rotationRate } = event;
    if (!rotationRate) return;

    const { beta, alpha, gamma } = rotationRate;
    if (!beta || !alpha || !gamma) return;
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
