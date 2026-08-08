import {
  ShieldCheck,
  XCircle
} from "lucide-react";

import {
  guardrails
} from "../data/agent";


export default function Guardrails() {

  return (

    <div className="card">

      <div className="card-title">

        <h3>
          🛡 Guardrails
        </h3>

      </div>


      <ul className="guard-list">

        {guardrails.map(
          (item, index) => (

            <li key={item}>

              {index ===
              guardrails.length - 1 ? (

                <ShieldCheck
                  size={14}
                />

              ) : (

                <XCircle
                  size={14}
                />

              )}

              {item}

            </li>

          )
        )}

      </ul>

    </div>

  );

}
