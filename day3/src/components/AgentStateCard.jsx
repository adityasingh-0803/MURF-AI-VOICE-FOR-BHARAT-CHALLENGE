import {
  Info,
  Mic,
  RotateCcw,
  Square,
  Waves
} from "lucide-react";

import {
  AGENT_STATES,
  stateCopy
} from "../data/agent";


const icons = {

  Ready: Waves,

  Connecting: Waves,

  Listening: Mic,

  Speaking: Waves,

  "Call Ended": Square

};


export default function AgentStateCard({

  state,

  onStart,

  onEnd,

  onRestart

}) {

  const Icon = icons[state];


  return (

    <div className="state-card">

      <div className="state-head">

        <h3>
          Agent State
        </h3>

        <Info size={17} />

      </div>


      <div className="state-content">

        <div
          className={
            `state-icon state-${
              state
                .toLowerCase()
                .replaceAll(" ", "-")
            }`
          }
        >

          <Icon size={38} />

        </div>


        <div>

          <strong>
            {state}
          </strong>

          <p>
            {stateCopy[state]}
          </p>


          {state === AGENT_STATES.READY && (

            <button
              className="primary-btn"
              onClick={onStart}
            >

              <Mic size={17} />

              Start Conversation

            </button>

          )}


          {state === AGENT_STATES.CONNECTING && (

            <div className="connecting">

              <span />

              Connecting...

            </div>

          )}


          {(
            state === AGENT_STATES.LISTENING ||
            state === AGENT_STATES.SPEAKING
          ) && (

            <button
              className="danger-btn"
              onClick={onEnd}
            >

              <Square size={15} />

              End Call

            </button>

          )}


          {state === AGENT_STATES.ENDED && (

            <button
              className="primary-btn"
              onClick={onRestart}
            >

              <RotateCcw size={17} />

              Start Again

            </button>

          )}

        </div>

      </div>

    </div>

  );

}
