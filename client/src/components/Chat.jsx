import axios from 'axios';
import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";

function Chat ( { messages } ) {
  const [loading, setLoading] = useState( false );
  const [history, setHistory] = useState();
  console.log( messages );
  const fetchChatMessages = async () => {
    try {
      setLoading( true );
      const config = {
        "Content-Type": "application/json",
      };
      const { data } = await axios.get( `http://localhost:5000/chats/room/${messages._id}`, config );
      console.log( "gg", data );
      setHistory( data.chats );
      setLoading( false );
    } catch ( error ) {
      console.log( error );
      setLoading( false );
    }
  };

  useEffect( () => {
    fetchChatMessages();
  }, [] );

  if ( loading ) return <div>Loading...</div>;
  if ( messages.length === 0 ) return <div>No messages</div>;

  return (
    <div>
      {
        loading ? ( <div>Loading...</div> ) : ( history && history.map( item => <ChatBubble key={item._id} isSender={item.sender.type === "Host"} message={item.message} time={item.createdAt} sender={item.sender.type} /> ) )
      }
    </div>
  );
}
export default Chat;
