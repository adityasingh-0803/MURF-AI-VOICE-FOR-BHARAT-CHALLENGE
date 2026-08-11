import {

  CalendarDays,

  Clock3,

  Phone,

  UserRound

} from "lucide-react";


export default function OutboundCall({

  onCall,

  loading

}) {

  return (

    <div className="card">

      <div className="heading">

        <h3>
          📞 Outbound Call Scheduler
        </h3>

        <span className="scheduled">
          Scheduled
        </span>

      </div>


      <div className="next">

        <small>
          Next Scheduled Call
        </small>

        <strong>

          <CalendarDays
            size={18}
          />

          Today • 7:00 PM

        </strong>

        <span>
          Daily practice session
        </span>

      </div>


      <div className="details">

        <div>

          <UserRound />

          <span>
            Learner
          </span>

          <b>
            Aditya Singh
          </b>

        </div>


        <div>

          <Clock3 />

          <span>
            Preferred Time
          </span>

          <b>
            7:00 PM
          </b>

        </div>


        <div>

          📚

          <span>
            Topic Focus
          </span>

          <b>
            Algebra
          </b>

        </div>


        <div>

          <Phone />

          <span>
            Duration
          </span>

          <b>
            3–4 mins
          </b>

        </div>

      </div>


      <button
        className="primary"
        onClick={onCall}
        disabled={loading}
      >

        <Phone size={17} />

        {loading
          ? "Calling..."
          : "Make Outbound Call"}

      </button>

    </div>

  );

}
