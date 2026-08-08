import {
  ChevronRight,
  Mic,
  Play,
  Square,
  Volume2,
  Waves
} from "lucide-react";

import {
  AGENT_STATES,
  stateCopy
} from "../data/agent";


const icons = {

  Ready: Play,

  Connecting: Waves,

  Listening: Mic,

  Speaking: Volume2,

  "Call Ended": Square

};


export default function StateTimeline({
  current
}) {

  return (

    <section className="timeline card">

      {Object.values(
        AGENT_STATES
      ).map(
        (state, index, all) => {

          const Icon = icons[state];

          return (

            <div
              className={
                `timeline-item ${
                  state === current
                    ? "current"
                    : ""
                }`
              }
              key={state}
            >

              <div className="timeline-icon">

                <Icon size={19} />

              </div>


              <div>

                <strong>
                  {state}
                </strong>

                <span>
                  {stateCopy[state]}
                </span>

              </div>


              {index <
                all.length - 1 && (

                <ChevronRight
                  className="timeline-arrow"
                  size={19}
                />

              )}

            </div>

          );

        }
      )}

    </section>

  );

}
