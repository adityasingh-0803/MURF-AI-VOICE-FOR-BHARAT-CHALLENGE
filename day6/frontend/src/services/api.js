const API =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";


export async function makeCall(
  phoneNumber
) {

  const response =
    await fetch(

      `${API}/calls/outbound`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          phone_number:
            phoneNumber,

          user_id:
            "user_001"

        })

      }

    );


  if (!response.ok) {

    throw new Error(
      "Could not start call"
    );

  }


  return response.json();

}


export async function getCalls() {

  const response =
    await fetch(
      `${API}/calls`
    );


  return response.json();

}
