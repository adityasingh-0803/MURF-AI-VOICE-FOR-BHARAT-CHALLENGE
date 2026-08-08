import { useState } from "react";

import { Bot, Info } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AgentStateCard from "./components/AgentStateCard";
import StateTimeline from "./components/StateTimeline";
import SpeakerIndicator from "./components/SpeakerIndicator";
import Conversation from "./components/Conversation";
import Objectives from "./components/Objectives";
import Guardrails from "./components/Guardrails";
import MicrophoneError from "./components/MicrophoneError";
import TipCard from "./components/TipCard";

import {
  AGENT_STATES
} from "./data/agent";

import {
  requestMicrophone
} from "./services/voice";

import "./App.css";


export default function App() {

  const [state, setState] =
    useState(
      AGENT_STATES.READY
    );


  const [micError, setMicError] =
    useState("");


  async function startConversation() {

    setMicError("");

    try {

      await requestMicrophone();


      setState(
        AGENT_STATES.CONNECTING
      );


      window.setTimeout(
        () => {

          setState(
            AGENT_STATES.LISTENING
          );

        },
        1200
      );


    } catch (error) {

      setMicError(
        error.message
      );

    }

  }


  function simulateSpeaking() {

    if (
      state !==
      AGENT_STATES.LISTENING
    ) {

      return;

    }


    setState(
      AGENT_STATES.SPEAKING
    );


    window.setTimeout(
      () => {

        setState(
          AGENT_STATES.LISTENING
        );

      },
      2600
    );

  }


  function endCall() {

    setState(
      AGENT_STATES.ENDED
    );

  }


  function restart() {

    setMicError("");

    setState(
      AGENT_STATES.READY
    );

  }


  return (

    <div className="app-shell">

      <Sidebar />


      <main className="main">

        <Header />


        <section className="hero-grid">


          <div className="hero-card">

            <div>

              <h2>
                Hello, Aditya! 👋
              </h2>

              <p>
                I'm ShikshaSaathi,
                your AI Voice Tutor.
              </p>

              <p>
                Let's learn something
                new today!
              </p>

            </div>


            <div className="hero-bot">

              <Bot size={72} />

            </div>

          </div>


          <AgentStateCard

            state={state}

            onStart={startConversation}

            onEnd={endCall}

            onRestart={restart}

          />

        </section>


        <StateTimeline
          current={state}
        />


        <section className="content-grid">


          <Conversation
            onSimulateSpeaking={
              simulateSpeaking
            }
          />


          <div className="right-column">


            <div className="card speaker-card">

              <div className="card-title">

                <h3>
                  Who's speaking?
                </h3>

                <Info size={17} />

              </div>


              <SpeakerIndicator

                label="You"

                active={
                  state ===
                  AGENT_STATES.LISTENING
                }

              />


              <SpeakerIndicator

                label="ShikshaSaathi"

                active={
                  state ===
                  AGENT_STATES.SPEAKING
                }

              />

            </div>


            <div className="two-col">

              <Objectives />

              <Guardrails />

            </div>


            <MicrophoneError

              message={micError}

              onRetry={
                startConversation
              }

              onClose={() =>
                setMicError("")
              }

            />


            {!micError && (

              <TipCard />

            )}

          </div>

        </section>


        <footer>

          <span>
            Made with 💜 for
            every learner in India
          </span>

          <span>
            #VoiceForBharat •
            Powered by Murf AI
          </span>

        </footer>

      </main>

    </div>

  );

}
