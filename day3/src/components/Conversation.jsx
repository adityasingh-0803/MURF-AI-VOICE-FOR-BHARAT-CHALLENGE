import {
  Bot,
  ChevronRight,
  Mic,
  ShieldCheck,
  UserRound
} from "lucide-react";


function Message({
  type,
  children
}) {

  const isUser =
    type === "user";


  return (

    <div
      className={`message ${type}`}
    >

      <div className="message-avatar">

        {isUser ? (

          <UserRound size={18} />

        ) : type === "guard" ? (

          <ShieldCheck size={18} />

        ) : (

          <Bot size={18} />

        )}

      </div>


      <div>

        <strong>

          {isUser
            ? "You"
            : type === "guard"
              ? "ShikshaSaathi • Guardrail"
              : "ShikshaSaathi"}

        </strong>


        <p>
          {children}
        </p>

      </div>

    </div>

  );

}


export default function Conversation({
  onSimulateSpeaking
}) {

  return (

    <div className="conversation card">

      <div className="card-title">

        <h3>
          Conversation
        </h3>

        <span className="live-label">

          <span className="dot" />

          Live

        </span>

      </div>


      <Message type="user">

        Mujhe algebra samajh nahi aa raha,
        can you help?

      </Message>


      <Message type="bot">

        Bilkul! Chaliye step-by-step
        algebra ko simple examples ke
        saath samajhte hain.

      </Message>


      <Message type="user">

        Can you solve tomorrow's
        exam paper?

      </Message>


      <Message type="guard">

        I can't help with cheating.
        But I can explain the concepts,
        solve similar questions and
        help you prepare better.

      </Message>


      <div className="input-row">

        <Mic size={19} />

        <input
          placeholder="Type your message..."
        />


        <button
          className="send-btn"
          onClick={onSimulateSpeaking}
        >

          <ChevronRight size={22} />

        </button>

      </div>

    </div>

  );

}
