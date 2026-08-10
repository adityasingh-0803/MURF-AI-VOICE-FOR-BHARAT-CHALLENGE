const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";


export async function getNextExercise({

  level,

  topic,

  userId

}) {

  const response =
    await fetch(

      `${API_URL}/tools/get-next-exercise`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          level,

          topic,

          user_id: userId

        })

      }

    );


  if (!response.ok) {

    throw new Error(
      "Tool request failed."
    );

  }


  return response.json();

}


export async function testFailure() {

  const response =
    await fetch(

      `${API_URL}/tools/failure-demo`,

      {

        method: "POST"

      }

    );


  return response.json();

}
