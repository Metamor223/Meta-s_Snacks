import React, {useContext, useEffect, useState} from 'react';
import {fetchBasket, removeFromBasket} from "../../http/productAPI";
import {observer} from "mobx-react-lite";
import "./Feedback.css"
import {Context} from "../../../index";

const Feedback = observer(() => {

    const {messages} = useContext(Context)

    return (
    <div className="feedbackCON">
      <h2>Chats</h2>
      <ul>
          <div className="ChatGroup">
              {messages.message.map(messages=>
                <div className="Message">

                </div>
              )}
          </div>
          <div className="Dialogue">
              {messages.message.map(message=>
              <>

              </>
              )}
          </div>
      </ul>
    </div>
  );
})

export default Feedback;