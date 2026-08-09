const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";


export async function lookupUser(
  userId
) {

  const response = await fetch(
    `${API_URL}/api/memory/${userId}`
  );


  if (!response.ok) {

    throw new Error(
      "Unable to retrieve learner memory."
    );

  }


  return response.json();

}


export async function saveUserMemory(
  data
) {

  const response = await fetch(
    `${API_URL}/api/memory`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify(data)
    }
  );


  if (!response.ok) {

    const error =
      await response.json();

    throw new Error(
      error.detail ||
      "Unable to save memory."
    );

  }


  return response.json();

}


export async function deleteUserMemory(
  userId
) {

  const response = await fetch(
    `${API_URL}/api/memory/${userId}`,
    {
      method: "DELETE"
    }
  );


  if (!response.ok) {

    throw new Error(
      "Unable to delete memory."
    );

  }


  return response.json();

}


export async function requestMicrophone() {

  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {

    throw new Error(
      "Your browser does not support microphone access."
    );

  }


  try {

    const stream =
      await navigator.mediaDevices
        .getUserMedia({
          audio: true
        });


    stream
      .getTracks()
      .forEach(
        track => track.stop()
      );


    return true;

  } catch {

    throw new Error(
      "Microphone access is blocked. Please allow microphone permission in your browser settings and try again."
    );

  }

}
