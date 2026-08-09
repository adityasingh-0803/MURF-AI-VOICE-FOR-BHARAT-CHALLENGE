import {
  useEffect,
  useState
} from "react";

import {
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  Info,
  Languages,
  Lightbulb,
  Lock,
  Mic,
  MicOff,
  Play,
  RotateCcw,
  ShieldCheck,
  Trash2,
  UserRound,
  Volume2,
  Waves,
  X,
  XCircle
} from "lucide-react";


import {
  AGENT_STATES,
  objectives,
  guardrails
} from "./data/agent";


import {
  lookupUser,
  saveUserMemory,
  deleteUserMemory,
  requestMicrophone
} from "./services/api";


import "./App.css";


export default function App() {

  const [state, setState] =
    useState(
      AGENT_STATES.READY
    );


  const [userId] =
    useState("student_001");


  const [user, setUser] =
    useState(null);


  const [loadingMemory, setLoadingMemory] =
    useState(true);


  const [micError, setMicError] =
    useState("");


  const [showConsent, setShowConsent] =
    useState(false);


  const [showMemory, setShowMemory] =
    useState(false);


  const [saveMessage, setSaveMessage] =
    useState("");


  const [newMemory, setNewMemory] =
    useState({
      name: "Aditya",
      language_preference:
        "Hindi + English",

      current_level:
        "Intermediate",

      topics_covered:
        ["Algebra"],

      common_mistakes:
        "Algebraic equations",

      learning_goal:
        "Improve Mathematics"
    });


  async function loadMemory() {

    try {

      setLoadingMemory(true);

      const result =
        await lookupUser(userId);


      if (result.found) {

        setUser(
          result.user
        );

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoadingMemory(false);

    }

  }


  useEffect(() => {

    loadMemory();

  }, []);


  async function startConversation() {

    setMicError("");

    try {

      await requestMicrophone();


      setState(
        AGENT_STATES.CONNECTING
      );


      setTimeout(() => {

        setState(
          AGENT_STATES.LISTENING
        );

      }, 1200);


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


    setTimeout(() => {

      setState(
        AGENT_STATES.LISTENING
      );

    }, 2600);

  }


  function endCall() {

    setState(
      AGENT_STATES.ENDED
    );

  }


  function restart() {

    setState(
      AGENT_STATES.READY
    );

  }


  function askToRemember() {

    setShowConsent(true);

  }


  async function confirmMemory() {

    try {

      const result =
        await saveUserMemory({

          user_id:
            userId,

          name:
            newMemory.name,

          language_preference:
            newMemory.language_preference,

          facts: {

            current_level:
              newMemory.current_level,

            topics_covered:
              newMemory.topics_covered,

            common_mistakes:
              newMemory.common_mistakes,

            learning_goal:
              newMemory.learning_goal

          }

        });


      setUser(
        result.user
      );


      setShowConsent(false);

      setSaveMessage(
        "Memory saved successfully."
      );


      setTimeout(() => {

        setSaveMessage("");

      }, 3000);


    } catch (error) {

      setSaveMessage(
        error.message
      );

    }

  }


  async function removeMemory() {

    try {

      await deleteUserMemory(
        userId
      );


      setUser(null);

      setShowMemory(false);

      setSaveMessage(
        "Your memory has been deleted."
      );


      setTimeout(() => {

        setSaveMessage("");

      }, 3000);


    } catch (error) {

      setSaveMessage(
        error.message
      );

    }

  }


  const topics =
    user?.facts?.topics_covered ||
    [];


  return (

    <div className="app-shell">


      <Sidebar
        user={user}
        showMemory={() =>
          setShowMemory(true)
        }
      />


      <main className="main">


        <header className="topbar">

          <div>

            <h1>
              {user
                ? `Hello, ${user.name}! 👋`
                : "Hello, Learner! 👋"}
            </h1>

            <p>

              {user
                ? "Welcome back to your learning journey."
                : "Your friendly AI Voice Tutor for learning."}

            </p>

          </div>


          <div className="header-actions">

            <div className="header-badge">

              <Languages size={17} />

              English • Hindi

            </div>


            <div className="online">

              <span className="online-dot" />

              Online

            </div>

          </div>

        </header>


        <section className="hero">

          <div>

            <span className="track-badge">

              <BookOpen size={16} />

              Learning & Literacy

            </span>


            <h2>

              {user
                ? "Let's continue from where we left off."
                : "Let's start your learning journey."}

            </h2>


            <p>

              {user
                ? `Last time, we worked on ${topics.join(", ") || "your learning goals"}.`
                : "Learn concepts, practise questions and build confidence through voice."}

            </p>

          </div>


          <div className="hero-bot">

            <Bot size={75} />

          </div>

        </section>


        <section className="top-grid">


          <MemoryCard

            user={user}

            loading={loadingMemory}

            onView={() =>
              setShowMemory(true)
            }

          />


          <VoiceCard

            state={state}

            onStart={
              startConversation
            }

            onEnd={
              endCall
            }

            onRestart={
              restart
            }

          />

        </section>


        <section className="content-grid">


          <Conversation

            state={state}

            onSpeak={
              simulateSpeaking
            }

          />


          <div className="right-column">


            <MemoryConsent

              user={user}

              newMemory={newMemory}

              setNewMemory={
                setNewMemory
              }

              onRemember={
                askToRemember
              }

              onConfirm={
                confirmMemory
              }

              showConsent={
                showConsent
              }

              setShowConsent={
                setShowConsent
              }

            />


            <MemorySummary
              user={user}
            />


            <PrivacyCard
              onManage={() =>
                setShowMemory(true)
              }
            />


          </div>

        </section>


        {micError && (

          <div className="error-banner">

            <MicOff size={21} />

            <div>

              <strong>
                Microphone Permission
              </strong>

              <p>
                {micError}
              </p>

              <button
                onClick={
                  startConversation
                }
              >
                Try Again
              </button>

            </div>


            <XCircle
              size={20}
              className="close-icon"
              onClick={() =>
                setMicError("")
              }
            />

          </div>

        )}


        {saveMessage && (

          <div className="toast">

            <CheckCircle2 size={19} />

            {saveMessage}

          </div>

        )}


        <footer>

          <span>
            Made with 💜 for every learner in India
          </span>

          <span>
            #VoiceForBharat • Powered by Murf AI
          </span>

        </footer>


      </main>


      {showMemory && (

        <MemoryModal

          user={user}

          onClose={() =>
            setShowMemory(false)
          }

          onDelete={
            removeMemory
          }

        />

      )}

    </div>

  );

}


/* SIDEBAR */

function Sidebar({
  user,
  showMemory
}) {

  return (

    <aside className="sidebar">


      <div className="brand">

        <div className="brand-avatar">

          🤖

        </div>


        <div>

          <h2>
            ShikshaSaathi
          </h2>

          <span>
            AI Voice Tutor
          </span>

        </div>

      </div>


      <div className="track-card">

        <BookOpen size={24} />

        <div>

          <strong>
            Learning & Literacy
          </strong>

          <small>
            Track
          </small>

        </div>

      </div>


      <nav>

        <button className="nav-item active">

          <BookOpen size={20} />

          Home

        </button>


        <button className="nav-item">

          <Mic size={20} />

          Voice Chat

        </button>


        <button className="nav-item">

          <BookOpen size={20} />

          Learn

        </button>


        <button
          className="nav-item"
          onClick={showMemory}
        >

          <BrainIcon />

          Memory

        </button>


        <button className="nav-item">

          📈

          Progress

        </button>


        <button className="nav-item">

          ⚙️

          Settings

        </button>

      </nav>


      <div className="sidebar-bottom">


        <div className="status-card">

          <small>
            Agent Status
          </small>

          <strong>

            <span className="dot" />

            Online

          </strong>

          <span>
            Ready to help you learn
          </span>

        </div>


        <div className="murf-card">

          <small>
            Powered by
          </small>

          <strong>
            Murf Falcon ⚡
          </strong>

          <span>
            The Fastest TTS API
          </span>

        </div>


        <div className="quote">

          ⭐ "Learning is a journey,
          let's grow together!" 🌱

        </div>

      </div>

    </aside>

  );

}


function BrainIcon() {

  return (
    <span
      style={{
        fontSize: "18px"
      }}
    >
      🧠
    </span>
  );

}


/* MEMORY CARD */

function MemoryCard({
  user,
  loading,
  onView
}) {

  if (loading) {

    return (

      <div className="card memory-card">

        <h3>
          🧠 Learner Memory
        </h3>

        <p>
          Loading memory...
        </p>

      </div>

    );

  }


  if (!user) {

    return (

      <div className="card memory-card empty-memory">

        <div className="card-title">

          <h3>
            🧠 Learner Memory
          </h3>

          <span className="disabled-badge">
            No Memory
          </span>

        </div>


        <div className="empty-content">

          <div className="empty-icon">
            🧠
          </div>

          <div>

            <strong>
              I don't know you yet.
            </strong>

            <p>
              Tell me something about yourself
              and I can ask for permission to remember it.
            </p>

          </div>

        </div>

      </div>

    );

  }


  return (

    <div className="card memory-card">


      <div className="card-title">

        <h3>
          🧠 Learner Memory
        </h3>

        <span className="memory-enabled">
          Memory Enabled
        </span>

      </div>


      <div className="profile-row">

        <div className="profile-avatar">

          {user.name
            .charAt(0)
            .toUpperCase()}

        </div>


        <div>

          <h3>
            {user.name}
          </h3>

          <span>
            {user.language_preference}
          </span>

        </div>


        <div className="level-box">

          <small>
            Current Level
          </small>

          <strong>
            {user.facts.current_level ||
              "Not set"}
          </strong>

        </div>

      </div>


      <div className="facts-grid">

        <div>

          <small>
            Topics Covered
          </small>

          <div className="chips">

            {(
              user.facts.topics_covered ||
              []
            ).map(topic => (

              <span
                className="chip"
                key={topic}
              >
                {topic}
              </span>

            ))}

          </div>

        </div>


        <div>

          <small>
            Learning Goal
          </small>

          <strong>
            {user.facts.learning_goal ||
              "Not set"}
          </strong>

        </div>

      </div>


      <button
        className="outline-btn full"
        onClick={onView}
      >

        View Full Memory

        <ChevronRight size={17} />

      </button>


    </div>

  );

}


/* VOICE CARD */

function VoiceCard({
  state,
  onStart,
  onEnd,
  onRestart
}) {

  return (

    <div className="card voice-card">


      <div className="card-title">

        <h3>
          🎙️ Voice Agent
        </h3>

        <span className="listening-badge">

          <span />

          {state}

        </span>

      </div>


      <div className="voice-center">


        <div className="wave-large">

          {Array
            .from({
              length: 16
            })
            .map(
              (_, index) => (
                <i key={index} />
              )
            )}

        </div>


        <div className="voice-circle">

          {state ===
          AGENT_STATES.SPEAKING ? (

            <Volume2 size={42} />

          ) : (

            <Mic size={42} />

          )}

        </div>


        <div className="wave-large reverse">

          {Array
            .from({
              length: 16
            })
            .map(
              (_, index) => (
                <i key={index} />
              )
            )}

        </div>

      </div>


      <div className="voice-text">

        <strong>

          {state ===
          AGENT_STATES.READY
            ? "Ready to learn"
            : state ===
              AGENT_STATES.CONNECTING
              ? "Connecting..."
              : state ===
                AGENT_STATES.SPEAKING
                ? "I'm speaking..."
                : state ===
                  AGENT_STATES.ENDED
                  ? "Call ended"
                  : "I'm listening..."}

        </strong>


        <p>

          {state ===
          AGENT_STATES.ENDED
            ? "Start again whenever you're ready."
            : "Speak naturally in English, Hindi, or mix both."}

        </p>

      </div>


      {state ===
        AGENT_STATES.READY && (

        <button
          className="primary-btn full"
          onClick={onStart}
        >

          <Play size={17} />

          Start Conversation

        </button>

      )}


      {(
        state ===
          AGENT_STATES.LISTENING ||
        state ===
          AGENT_STATES.SPEAKING
      ) && (

        <button
          className="danger-btn full"
          onClick={onEnd}
        >

          End Call

        </button>

      )}


      {state ===
        AGENT_STATES.ENDED && (

        <button
          className="primary-btn full"
          onClick={onRestart}
        >

          <RotateCcw size={17} />

          Start Again

        </button>

      )}

    </div>

  );

}


/* CONVERSATION */

function Conversation({
  state,
  onSpeak
}) {

  return (

    <div className="card conversation">


      <div className="card-title">

        <h3>
          💬 Conversation
        </h3>

        <span className="live-label">

          <span className="dot" />

          Live

        </span>

      </div>


      <Message
        type="user"
      >

        Mujhe algebra samajh nahi
        aa raha, can you help?

      </Message>


      <Message
        type="bot"
      >

        Bilkul! Chaliye step-by-step
        algebra ko simple examples ke
        saath samajhte hain.

      </Message>


      <Message
        type="user"
      >

        I'm currently learning Algebra.

      </Message>


      <Message
        type="bot"
      >

        Would you like me to remember
        that for our future conversations?

      </Message>


      <Message
        type="guard"
      >

        Your memory is always
        under your control. I ask
        before saving new information.

      </Message>


      <div className="input-row">

        <Mic size={19} />

        <input
          placeholder="Type your message..."
        />


        <button
          className="send-btn"
          onClick={onSpeak}
        >

          <ChevronRight size={22} />

        </button>

      </div>

    </div>

  );

}


function Message({
  type,
  children
}) {

  return (

    <div
      className={`message ${type}`}
    >

      <div className="message-avatar">

        {type === "user"
          ? <UserRound size={18} />
          : type === "guard"
            ? <ShieldCheck size={18} />
            : <Bot size={18} />}

      </div>


      <div>

        <strong>

          {type === "user"
            ? "You"
            : type === "guard"
              ? "ShikshaSaathi • Privacy"
              : "ShikshaSaathi"}

        </strong>


        <p>
          {children}
        </p>

      </div>

    </div>

  );

}


/* CONSENT */

function MemoryConsent({
  user,
  newMemory,
  setNewMemory,
  onRemember,
  onConfirm,
  showConsent,
  setShowConsent
}) {

  return (

    <div className="card consent-card">


      <div className="card-title">

        <h3>
          🧠 Memory
        </h3>

        <Lock size={18} />

      </div>


      {!showConsent ? (

        <>

          <div className="consent-icon">
            💡
          </div>


          <h3>
            {user
              ? "Learn something new?"
              : "Remember something about you?"}
          </h3>


          <p>

            ShikshaSaathi will always
            ask before saving new
            learning information.

          </p>


          <button
            className="outline-btn full"
            onClick={onRemember}
          >

            Remember this

          </button>

        </>

      ) : (

        <div className="consent-form">


          <h3>
            Do you want me to remember this?
          </h3>


          <p>

            You mentioned that you're
            currently learning:

          </p>


          <input
            value={
              newMemory.topics_covered[0]
            }
            onChange={(e) =>
              setNewMemory({
                ...newMemory,

                topics_covered: [
                  e.target.value
                ]
              })
            }
          />


          <div className="consent-buttons">

            <button
              className="yes-btn"
              onClick={onConfirm}
            >

              <CheckCircle2 size={17} />

              Yes, Remember

            </button>


            <button
              className="no-btn"
              onClick={() =>
                setShowConsent(false)
              }
            >

              <X size={17} />

              No, Don't Save

            </button>

          </div>

        </div>

      )}

    </div>

  );

}


/* MEMORY SUMMARY */

function MemorySummary({
  user
}) {

  const facts =
    user?.facts;


  const count = facts
    ? Object.values(facts)
        .filter(Boolean)
        .length
    : 0;


  return (

    <div className="card summary-card">

      <div className="card-title">

        <h3>
          📊 Memory Summary
        </h3>

        <span className="memory-number">
          {count}
        </span>

      </div>


      <div className="summary-row">

        <span>
          Topics
        </span>

        <strong>
          {facts?.topics_covered?.length ||
            0}
        </strong>

      </div>


      <div className="summary-row">

        <span>
          Learning Level
        </span>

        <strong>
          {facts?.current_level
            ? "1"
            : "0"}
        </strong>

      </div>


      <div className="summary-row">

        <span>
          Common Mistakes
        </span>

        <strong>
          {facts?.common_mistakes
            ? "1"
            : "0"}
        </strong>

      </div>


      <div className="summary-row">

        <span>
          Goals
        </span>

        <strong>
          {facts?.learning_goal
            ? "1"
            : "0"}
        </strong>

      </div>

    </div>

  );

}


/* PRIVACY */

function PrivacyCard({
  onManage
}) {

  return (

    <div className="card privacy-card">


      <div className="card-title">

        <h3>
          🔐 Your Privacy
        </h3>

      </div>


      <p>

        ShikshaSaathi asks before
        saving any new information.

      </p>


      <p>

        You can review or delete
        your memory anytime.

      </p>


      <button
        className="outline-btn full"
        onClick={onManage}
      >

        <Lock size={16} />

        Manage Memory

      </button>

    </div>

  );

}


/* MEMORY MODAL */

function MemoryModal({
  user,
  onClose,
  onDelete
}) {

  return (

    <div className="modal-overlay">


      <div className="modal">


        <div className="modal-header">

          <div>

            <h2>
              🧠 Learner Memory
            </h2>

            <p>
              Information ShikshaSaathi
              remembers with your consent.
            </p>

          </div>


          <button
            className="icon-btn"
            onClick={onClose}
          >

            <X />

          </button>

        </div>


        {!user ? (

          <div className="empty-modal">

            <div>
              🧠
            </div>

            <h3>
              No saved memory
            </h3>

            <p>
              ShikshaSaathi doesn't know
              anything about you yet.
            </p>

          </div>

        ) : (

          <>

            <div className="modal-profile">

              <div className="profile-avatar large">

                {user.name
                  .charAt(0)
                  .toUpperCase()}

              </div>


              <div>

                <h3>
                  {user.name}
                </h3>

                <p>
                  ID: {user.user_id}
                </p>

                <span>
                  {user.language_preference}
                </span>

              </div>

            </div>


            <div className="memory-list">


              <MemoryItem
                label="Current Level"
                value={
                  user.facts.current_level
                }
              />


              <MemoryItem
                label="Topics Covered"
                value={
                  user.facts
                    .topics_covered
                    ?.join(", ")
                }
              />


              <MemoryItem
                label="Common Mistakes"
                value={
                  user.facts.common_mistakes
                }
              />


              <MemoryItem
                label="Learning Goal"
                value={
                  user.facts.learning_goal
                }
              />


              <MemoryItem
                label="Last Interaction"
                value={
                  new Date(
                    user.last_interaction
                  ).toLocaleString()
                }
              />

            </div>


            <button
              className="delete-btn"
              onClick={onDelete}
            >

              <Trash2 size={17} />

              Delete All Memory

            </button>

          </>

        )}

      </div>

    </div>

  );

}


function MemoryItem({
  label,
  value
}) {

  return (

    <div className="memory-item">

      <small>
        {label}
      </small>

      <strong>
        {value || "Not set"}
      </strong>

    </div>

  );

}
