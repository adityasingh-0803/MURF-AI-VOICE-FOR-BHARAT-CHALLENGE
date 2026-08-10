import {
  CalendarDays,
  Database,
  Mic,
  ShieldCheck,
  Wrench
} from "lucide-react";

import {
  useState
} from "react";


import Sidebar
  from "./components/Sidebar";

import Conversation
  from "./components/Conversation";

import ToolResult
  from "./components/ToolResult";


import {
  getNextExercise,
  testFailure
} from "./services/api";


import "./App.css";


export default function App() {

  const [result, setResult] =
    useState({

      success: true,

      topic: "Algebra",

      level: "Intermediate",

      question:
        "Solve for x: 3x + 7 = 22. What is the value of x?",

      answer: "5",

      source:
        "ShikshaSaathi Exercise Bank",

      data_date:
        new Date()
          .toISOString()
          .slice(0, 10)

    });


  const [loading, setLoading] =
    useState(false);


  async function callTool() {

    setLoading(true);


    try {

      const data =
        await getNextExercise({

          level:
            "Intermediate",

          topic:
            "Algebra",

          userId:
            "user_001"

        });


      setResult(data);


    } catch {

      setResult({

        success: false

      });

    }


    setLoading(false);

  }


  async function failureDemo() {

    setLoading(true);


    const data =
      await testFailure();


    setResult(data);


    setLoading(false);

  }


  return (

    <div className="app">

      <Sidebar />


      <main className="main">


        <header>

          <div>

            <h1>
              Hello, Aditya! 👋
            </h1>

            <p>
              Your Learning & Literacy
              assistant now has tools.
            </p>

          </div>


          <div className="header-right">

            <span>
              📚 Learning & Literacy
            </span>

            <span className="online">
              ● Online
            </span>

          </div>

        </header>


        <section className="hero">

          <div className="welcome card">

            <div>

              <span className="eyebrow">
                DAY 5 • THE TOOLS
              </span>

              <h2>
                Learn with the right
                exercise, at the right level.
              </h2>

              <p>

                ShikshaSaathi can now call
                a learning tool when it needs
                real domain data.

              </p>

            </div>


            <div className="hero-icon">

              <Wrench size={55} />

            </div>

          </div>


          <div className="memory card">

            <div className="card-heading">

              <h3>
                🧠 Learner Memory
              </h3>

              <span>
                Memory Enabled
              </span>

            </div>


            <div className="profile">

              <div className="avatar">
                A
              </div>

              <div>

                <h3>
                  Aditya
                </h3>

                <p>
                  Hindi + English
                </p>

              </div>

            </div>


            <div className="facts">

              <div>

                <small>
                  Current Level
                </small>

                <b>
                  Intermediate
                </b>

              </div>


              <div>

                <small>
                  Topics
                </small>

                <b>
                  Algebra • Python
                </b>

              </div>


              <div>

                <small>
                  Goal
                </small>

                <b>
                  Improve Mathematics
                </b>

              </div>

            </div>

          </div>

        </section>


        <section className="main-grid">


          <Conversation
            onToolCall={callTool}
          />


          <div>


            <ToolResult
              result={result}
            />


            <div className="card tools">

              <div className="card-heading">

                <h3>
                  🔧 Available Tool
                </h3>

              </div>


              <div className="tool">

                <div className="tool-icon">

                  <Database />

                </div>


                <div>

                  <b>
                    get_next_exercise
                  </b>

                  <p>

                    Fetch a practice question
                    based on topic and level.

                  </p>

                </div>


                <span>
                  ACTIVE
                </span>

              </div>


              <button
                className="primary"
                onClick={callTool}
              >

                {loading
                  ? "Calling tool..."
                  : "Run get_next_exercise"}

              </button>


              <button
                className="secondary"
                onClick={failureDemo}
              >

                Test Failure Path

              </button>

            </div>


            <div className="card safety">

              <h3>
                🛡️ Safe Tool Handling
              </h3>

              <p>

                If the tool is unavailable,
                ShikshaSaathi will not invent
                an exercise.

              </p>

              <div>

                <ShieldCheck size={19} />

                <span>

                  "I don't want to guess and
                  give you the wrong question."

                </span>

              </div>

            </div>


          </div>

        </section>


        <div className="tip">

          💡 <b>Tip:</b> Ask in Hindi,
          English, or mix both.

        </div>


        <footer>

          <span>
            Made with 💜 for learners
            across India
          </span>

          <span>
            #VoiceForBharat •
            Murf Falcon ⚡
          </span>

        </footer>


      </main>

    </div>

  );

}
