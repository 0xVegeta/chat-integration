import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ( { children } ) => {
  const [selectedChat, setSelectedChat] = useState();
  const [host, setHost] = useState( "" );
  const [notification, setNotification] = useState( [] );
  const [chats, setChats] = useState();

  const navigate = useNavigate();

  useEffect( () => {
    const hostInfo = JSON.parse( localStorage.getItem( "hostInfo" ) );
    setHost( hostInfo );
    // console.log( host );

    // if ( !hostInfo ) {
    //   navigate( "/signup" );
    // }
  }, [navigate] );

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        host,
        setHost,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext( ChatContext );
};

export default ChatProvider;
