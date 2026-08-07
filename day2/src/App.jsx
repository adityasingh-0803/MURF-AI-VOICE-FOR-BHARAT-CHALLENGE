import Sidebar from "./components/Sidebar";
import GreetingCard from "./components/GreetingCard";
import VoiceButton from "./components/VoiceButton";
import ChatBox from "./components/ChatBox";
import ObjectivesCard from "./components/ObjectivesCard";
import GuardrailsCard from "./components/GuardrailsCard";

import "./styles/App.css";

function App() {
  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        <GreetingCard />

        <VoiceButton />

        <ChatBox />

        <ObjectivesCard />

        <GuardrailsCard />

      </div>

    </div>
  );
}

export default App;
