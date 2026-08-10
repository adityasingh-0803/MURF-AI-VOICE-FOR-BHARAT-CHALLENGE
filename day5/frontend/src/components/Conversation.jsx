import {
  Bot,
  ChevronRight,
  Mic,
  UserRound,
  Wrench
} from "lucide-react";


export default function Conversation({
  onToolCall
}) {

  return (

    <div className="card conversation">

      <div className="card-heading">

        <h3>
          💬 Conversation
        </h3>

        <span className="live">
          ● Live
        </span>

      </div>


      <div className="message user">

        <div className="message-icon">

          <UserRound size={17} />

        </div>

        <div>

          <b>
            You
          </b>

          <p>
            Mujhe Algebra ka ek
            question do.
          </p>

        </div>

      </div>


      <div className="message agent">

        <div className="message-icon">

          <Bot size={17} />

        </div>

        <div>

          <b>
            ShikshaSaathi
          </b>

          <p>
            Bilkul! Main aapke level
            ke according ek question
            fetch karta hoon.
          </p>

        </div>

      </div>


      <div className="tool-event">

        <Wrench size={16} />

        <div>

          <b>
            Tool Call
          </b>

          <span>
            get_next_exercise
          </span>

        </div>

        <small>
          Intermediate • Algebra
        </small>

      </div>


      <div className="message agent">

        <div className="message-icon">

          <Bot size={17} />

        </div>

        <div>

          <b>
            ShikshaSaathi
          </b>

          <p>

            Yeh lijiye! Solve for x:
            3x + 7 = 22. What is x?

          </p>

        </div>

      </div>


      <div className="chat-input">

        <Mic size={18} />

        <input
          placeholder="Type your message..."
        />

        <button
          onClick={onToolCall}
        >

          <ChevronRight
            size={21}
          />

        </button>

      </div>

    </div>

  );

}
