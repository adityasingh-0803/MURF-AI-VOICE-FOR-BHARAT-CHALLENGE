import { Languages } from "lucide-react";

export default function Header() {

  return (

    <header className="topbar">

      <div>

        <h1>
          Learning & Literacy Voice Agent
        </h1>

        <p>
          Personalised for curious learners across India.
        </p>

      </div>


      <div className="header-badge">

        <Languages size={17} />

        English • Hindi

      </div>

    </header>

  );

}
