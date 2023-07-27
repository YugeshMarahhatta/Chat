import React, { useState } from "react";
import "./App.css";
import UserSelection from "./UserSelection";
import MessagingPage from "./MessagingPage";

const App = () => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="App">
      {!selectedUser ? (
        <UserSelection onSelectUser={handleUserSelect} />
      ) : (
        <MessagingPage currentUser={selectedUser} />
      )}
    </div>
  );
};

export default App;
