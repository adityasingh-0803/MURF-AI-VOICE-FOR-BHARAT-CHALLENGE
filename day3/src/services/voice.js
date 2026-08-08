export async function requestMicrophone() {

  if (!navigator.mediaDevices?.getUserMedia) {

    throw new Error(
      "Your browser does not support microphone access."
    );

  }

  try {

    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio: true
      });

    stream
      .getTracks()
      .forEach((track) => track.stop());

    return true;

  } catch (error) {

    throw new Error(
      "Microphone access is blocked. Please allow microphone permission in your browser settings and try again."
    );

  }

}
