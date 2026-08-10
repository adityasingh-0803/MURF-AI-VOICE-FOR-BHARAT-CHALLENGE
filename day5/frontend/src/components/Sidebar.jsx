import {
  BookOpen,
  Brain,
  Home,
  Lightbulb,
  Mic,
  Settings,
  Wrench
} from "lucide-react";


export default function Sidebar() {

  const items = [

    [Home, "Home"],

    [Mic, "Voice Chat"],

    [Brain, "Memory"],

    [BookOpen, "Learn"],

    [Wrench, "Tools"],

    [Lightbulb, "Practice"],

    [Settings, "Settings"]

  ];


  return (

    <aside className="sidebar">

      <div className="brand">

        <div className="brand-icon">
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


      <div className="track">

        📚

        <div>

          <b>
            Learning & Literacy
          </b>

          <small>
            Track
          </small>

        </div>

      </div>


      <nav>

        {items.map(
          ([Icon, name]) => (

            <button
              key={name}
              className={
                name === "Tools"
                  ? "nav active"
                  : "nav"
              }
            >

              <Icon size={19} />

              {name}

            </button>

          )
        )}

      </nav>


      <div className="sidebar-bottom">

        <div className="side-card">

          <small>
            Agent Status
          </small>

          <b>
            🟢 Online
          </b>

          <span>
            Ready to help you learn
          </span>

        </div>


        <div className="side-card">

          <small>
            Powered by
          </small>

          <b className="falcon">
            Murf Falcon ⚡
          </b>

          <span>
            The Fastest TTS API
          </span>

        </div>

      </div>

    </aside>

  );

}
