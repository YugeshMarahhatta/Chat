import React, { useState } from "react";
import {
  ChatContainer,
  MessageList,
  MessageInput,
  Message,
  ConversationHeader,
  Sidebar,
  ConversationList,
  Conversation,
  MainContainer,
  Avatar,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chat.css";
// const typing = "";
const Chat = () => {
  const [isTyping, setIsTyping] = useState(false);

  const handleTypingStart = () => {
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  const handleTypingStop = () => {
    if (isTyping) {
      setIsTyping(false);
    }
  };
  const PeopleList = [
    {
      name: "Yugesh",
      lastSenderName: "John",
      info: "Hello",
      active: true,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png",
    },
    {
      name: "Yugesh",
      lastSenderName: "John",
      info: "Hello",
      active: true,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png",
    },
  ];
  const [messages, setMessages] = useState([
    {
      message: "Hey John",
      // sender: "You",
      sendTime: "10 min ago",
      direction: "incoming",
      position: "single",
      avatar:
        "https://e7.pngegg.com/pngimages/1004/160/png-clipart-computer-icons-user-profile-social-web-others-blue-social-media.png",
    },
    {
      message: "How are you?",
      // sender: "Me",
      sendTime: "10 min ago",
      direction: "incoming",
      position: "single",
      avatar:
        "https://e7.pngegg.com/pngimages/1004/160/png-clipart-computer-icons-user-profile-social-web-others-blue-social-media.png",
    },
    {
      message: "How are you?",
      // sender: "Me",
      sendTime: "10 min ago",
      direction: "outgoing",
      position: "single",
      avatar:
        "https://e7.pngegg.com/pngimages/1004/160/png-clipart-computer-icons-user-profile-social-web-others-blue-social-media.png",
    },
    {
      message: "How are you?",
      sender: "Me",
      sendTime: "10 min ago",
      direction: "outgoing",
      position: "single",
      avatar:
        "https://e7.pngegg.com/pngimages/1004/160/png-clipart-computer-icons-user-profile-social-web-others-blue-social-media.png",
    },
  ]);
  const sendMessage = (newMessage) => {
    const updatedMessages = [
      ...messages,
      {
        message: newMessage,
        sender: "Me",
        sendTime: new Date().toISOString(),
        direction: "outgoing",
        position: "single",
        avatar:
          "https://e7.pngegg.com/pngimages/1004/160/png-clipart-computer-icons-user-profile-social-web-others-blue-social-media.png",
      },
    ];

    setMessages(updatedMessages);
  };
  const [typing, setTyping] = useState({ typing: false });
  return (
    <div className="chatPage-div">
      <MainContainer>
        <Sidebar position="left">
          <ConversationList>
            {PeopleList.map((person, index) => (
              <Conversation
                key={index}
                name={person.name}
                lastSenderName={person.lastSenderName}
                info={person.info}
                active={person.active}
              >
                <Avatar src={person.avatar} />
              </Conversation>
            ))}
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <Avatar src="https://static.vecteezy.com/system/resources/previews/010/056/184/original/people-icon-sign-symbol-design-free-png.png" />
            <ConversationHeader.Content
              userName="Yugesh"
              info="Last active 10 mins ago"
            ></ConversationHeader.Content>
          </ConversationHeader>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content="Emily is typing" /> : ""
            }
          >
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;
              const isFirstMessage =
                index === 0 ||
                message.direction !== messages[index - 1].direction;

              return (
                <Message
                  key={index}
                  model={{
                    message: message.message,
                    sender: message.sender,
                    sendTime: message.sendTime,
                    direction: message.direction,
                    position: message.position,
                  }}
                  avatarSpacer={!isFirstMessage && !isLastMessage}
                >
                  {isFirstMessage && <Avatar src={message.avatar} />}
                </Message>
              );
            })}
          </MessageList>
          <MessageInput
            placeholder="type your message here"
            onSend={sendMessage}
            onStartTyping={handleTypingStart}
            // onStopTyping={handleTypingStop}
          ></MessageInput>
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
