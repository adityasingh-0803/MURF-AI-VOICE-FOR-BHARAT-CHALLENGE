import {
  Lightbulb
} from "lucide-react";


export default function TipCard() {

  return (

    <div className="tip-card">

      <Lightbulb size={22} />

      <div>

        <strong>
          Tip
        </strong>

        <p>
          Ask in English, Hindi,
          or mix both. I'll respond naturally.
        </p>

      </div>

    </div>

  );

}
