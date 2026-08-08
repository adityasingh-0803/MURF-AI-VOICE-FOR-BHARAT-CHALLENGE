import {
  MicOff,
  XCircle
} from "lucide-react";


export default function MicrophoneError({

  message,

  onRetry,

  onClose

}) {

  if (!message)
    return null;


  return (

    <div className="mic-error">

      <MicOff size={25} />


      <div>

        <strong>
          Microphone Permission
        </strong>

        <p>
          {message}
        </p>

        <button
          onClick={onRetry}
        >
          Allow microphone access
        </button>

      </div>


      <XCircle
        size={19}
        className="clickable"
        onClick={onClose}
      />

    </div>

  );

}
