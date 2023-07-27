import React, { useState, useEffect } from "react";
import { Button } from "@chatscope/chat-ui-kit-react";
import io from "socket.io-client";

const socket = io.connect("http://192.168.68.114:3001");

const MessagingPage = ({ currentUser }) => {
  const [Receiver, setReceiverAccount] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverSelected, setReceiverSelected] = useState(false);

  const [sentMessages, setSentMessages] = useState([]);

  const setReceiver = (receiver_id) => {
    if (receiver_id) {
      setReceiverAccount(receiver_id);
      socket.emit("join_room", receiver_id);
    }
  };

  const sendMessage = () => {
    const room = Receiver;
    const sender = currentUser;
    socket.emit("send_message", { message, room, Receiver, sender });
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: "You : " + message, message_type: "sent" },
    ]);
    setMessage("");
  };

  useEffect(() => {
    // Set up the event listener when the component mounts
    socket.emit("join_room", currentUser);

    socket.on("receive_message", (data) => {
      console.log("Message Received", data);
      if (data.Receiver === currentUser) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.message + " : " + data.Receiver,
            message_type: "received",
          },
        ]);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, [currentUser]);

  return (
    <div>
      <h1>Messaging Page</h1>
      <p>Current User: {currentUser}</p>
      <div>
        <p>Choose Receiver Account</p>
        <select
          onChange={(event) => {
            setReceiver(event.target.value);
          }}
          id="colours"
        >
          <option value="">Choose receiver</option>
          <option value="Yugesh">Yugesh</option>
          <option value="Bishal">Bishal</option>
          <option value="Suyashaa">Suyashaa</option>
        </select>
      </div>
      <br />
      <input
        placeholder="Message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      <ul>
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.message_type === "sent" ? "left" : "right",
              paddingRight: msg.message_type === "sent" ? "0" : "20px",
            }}
          >
            {msg.message}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default MessagingPage;
