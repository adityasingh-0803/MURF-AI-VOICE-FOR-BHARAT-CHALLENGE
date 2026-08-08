export const AGENT_STATES = {
  READY: "Ready",
  CONNECTING: "Connecting",
  LISTENING: "Listening",
  SPEAKING: "Speaking",
  ENDED: "Call Ended"
};

export const stateCopy = {

  Ready:
    "Click the button to start a conversation.",

  Connecting:
    "Please wait while we connect you.",

  Listening:
    "I'm listening to you.",

  Speaking:
    "ShikshaSaathi is speaking.",

  "Call Ended":
    "Conversation ended. You can start again."
};

export const objectives = [

  "Explain concepts clearly",

  "Encourage critical thinking",

  "Build learner confidence"

];

export const guardrails = [

  "Never shame a learner",

  "Never claim a child has a learning disability",

  "Never encourage cheating",

  "Escalate to a teacher or guardian when needed"

];
