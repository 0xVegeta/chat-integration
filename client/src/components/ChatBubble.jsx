function ChatBubble ( { isSender, message, time, sender } ) {
  return (
    <>
      {isSender ? (
        <div className="chat chat-end">
          <div className="chat-header"> {sender}</div>
          <div className="chat-bubble">{message}</div>
          <time className="chat-footer text-xs opacity-50">
            {time}
          </time>
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-header">{sender}</div>
          <div className="chat-bubble">{message}</div>
          <time className="chat-footer text-xs opacity-50">
            {time}
          </time>
        </div>
      )}
    </>
  );
}
export default ChatBubble;
