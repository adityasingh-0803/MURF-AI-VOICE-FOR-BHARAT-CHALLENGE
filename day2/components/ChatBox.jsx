function ChatBox(){

    return(

        <div className="card">

            <h2>Conversation</h2>

            <div className="user">

                <b>You</b>

                <p>

                    Mujhe algebra samajh nahi aa raha,

                    can you help?

                </p>

            </div>

            <div className="bot">

                <b>ShikshaSaathi</b>

                <p>

                    Bilkul!

                    Chaliye algebra ko

                    step by step

                    examples ke saath samajhte hain.

                </p>

            </div>

            <div className="user">

                <b>You</b>

                <p>

                    Can you tell me tomorrow's exam paper?

                </p>

            </div>

            <div className="guard">

                <b>Guardrail</b>

                <p>

                    Sorry!

                    I cannot help with cheating.

                    I can help you prepare

                    with similar questions instead.

                </p>

            </div>

        </div>

    )

}

export default ChatBox;
