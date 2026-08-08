export default function SpeakerIndicator({
  label,
  active
}) {

  return (

    <div className="speaker-row">

      <div className="speaker-name">

        <span
          className={
            `speaker-dot ${
              active
                ? "active"
                : ""
            }`
          }
        />

        {label}

      </div>


      <div
        className={
          `wave ${
            active
              ? "playing"
              : ""
          }`
        }
      >

        {Array
          .from({ length: 24 })
          .map(
            (_, index) => (

              <i key={index} />

            )
          )}

      </div>

    </div>

  );

}
