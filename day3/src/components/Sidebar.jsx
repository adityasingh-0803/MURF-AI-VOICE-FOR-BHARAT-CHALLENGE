import {
  BookOpen,
  CheckCircle2,
  Home,
  Lightbulb,
  Mic,
  Settings
} from "lucide-react";

export default function Sidebar() {

  const items = [

    [Home, "Home"],

    [Mic, "Voice Chat"],

    [BookOpen, "Learn"],

    [Lightbulb, "Practice"],

    [CheckCircle2, "My Progress"],

    [Settings, "Settings"]

  ];

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

        <BookOpen size={23} />

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

        {items.map(
          ([Icon, label], index) => (

            <button
              className={
                `nav-item ${
                  index === 0
                    ? "active"
                    : ""
                }`
              }
              key={label}
            >

              <Icon size={20} />

              {label}

            </button>

          )
        )}

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

          ⭐ "Learning is a journey —
          let's grow together!" 🌱

        </div>

      </div>

    </aside>

  );

}
