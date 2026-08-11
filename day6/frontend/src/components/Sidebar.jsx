import {

  Home,

  Mic,

  Brain,

  BookOpen,

  Wrench,

  PhoneCall,

  Settings

} from "lucide-react";


export default function Sidebar() {

  const items = [

    [Home, "Home"],

    [Mic, "Voice Chat"],

    [Brain, "Memory"],

    [BookOpen, "Learn"],

    [Wrench, "Tools"],

    [PhoneCall, "Outbound Calls"],

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
                name ===
                "Outbound Calls"
                  ? "nav active"
                  : "nav"
              }
            >

              <Icon size={18} />

              {name}

            </button>

          )
        )}

      </nav>


      <div className="bottom">

        <div className="side-card">

          <small>
            Agent Status
          </small>

          <b>
            🟢 Online
          </b>

          <span>
            Ready to help learners!
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
            Fastest TTS API
          </span>

        </div>

      </div>

    </aside>

  );

}
