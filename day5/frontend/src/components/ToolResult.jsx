import {
  CalendarDays,
  CheckCircle2,
  Database,
  AlertTriangle
} from "lucide-react";


export default function ToolResult({
  result
}) {

  if (!result)
    return null;


  if (!result.success) {

    return (

      <div className="tool-result failure">

        <div className="tool-heading">

          <span>

            <AlertTriangle
              size={18}
            />

            Tool unavailable

          </span>

          <b>
            Failed safely
          </b>

        </div>


        <p>

          I&apos;m unable to load a new
          exercise right now. I don&apos;t
          want to guess and give you the
          wrong question. Please try again
          in a moment.

        </p>

      </div>

    );

  }


  return (

    <div className="tool-result">

      <div className="tool-heading">

        <span>

          <Database size={18} />

          get_next_exercise

        </span>

        <b className="success">

          <CheckCircle2
            size={14}
          />

          Success

        </b>

      </div>


      <div className="result-meta">

        <div>

          <small>
            Topic
          </small>

          <strong>
            {result.topic}
          </strong>

        </div>


        <div>

          <small>
            Level
          </small>

          <strong>
            {result.level}
          </strong>

        </div>

      </div>


      <div className="question">

        <small>
          Exercise
        </small>

        <strong>
          {result.question}
        </strong>

      </div>


      <div className="result-line">

        <span>
          Answer
        </span>

        <strong>
          {result.answer}
        </strong>

      </div>


      <div className="result-line">

        <span>
          Source
        </span>

        <strong>
          {result.source}
        </strong>

      </div>


      <div className="result-line">

        <span>

          <CalendarDays size={14} />

          Data date

        </span>

        <strong>
          {result.data_date}
        </strong>

      </div>


      <div className="data-note">

        📌 This result was retrieved
        from the ShikshaSaathi exercise
        bank today.

      </div>

    </div>

  );

}
