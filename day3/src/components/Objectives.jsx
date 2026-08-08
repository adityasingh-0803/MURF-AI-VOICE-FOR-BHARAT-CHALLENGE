import { CheckCircle2 } from "lucide-react";

import {
  objectives
} from "../data/agent";


export default function Objectives() {

  return (

    <div className="card">

      <div className="card-title">

        <h3>
          🎯 Objectives
        </h3>

      </div>


      <ul className="check-list">

        {objectives.map(
          (item) => (

            <li key={item}>

              <CheckCircle2
                size={14}
              />

              {item}

            </li>

          )
        )}

      </ul>

    </div>

  );

}
