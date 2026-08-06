import "./App.css";

export default function App() {
  return (
    <div className="app">

      <aside className="sidebar">
        <h2>🎙️ ShikshaSaathi</h2>
        <p>AI Voice Tutor</p>

        <ul>
          <li>🏠 Home</li>
          <li>💬 Chat</li>
          <li>📚 Learn</li>
          <li>⚙ Settings</li>
        </ul>

        <div className="powered">
          Powered by
          <br />
          <strong>Murf Falcon</strong>
        </div>
      </aside>

      <main className="content">

        <h1>Learning & Literacy Voice Agent</h1>

        <p>
          Ask questions and learn through natural voice conversations.
        </p>

        <div className="online">
          🟢 Agent Online
        </div>

        <button className="mic">
          🎤 Start Speaking
        </button>

        <div className="chat">

          <div className="user">
            <b>You</b>
            <p>Explain Newton's First Law.</p>
          </div>

          <div className="bot">
            <b>ShikshaSaathi</b>

            <p>
              Newton's First Law states that an object remains at rest
              or in uniform motion unless acted upon by an external force.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}
