import React, { useState } from "react";

const UserSelection = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserSelect = () => {
    if (selectedUser) {
      onSelectUser(selectedUser);
    }
  };

  return (
    <div className="App">
      <h1>Select Your Account</h1>
      <select
        onChange={(event) => setSelectedUser(event.target.value)}
        id="colours"
      >
        <option value="">Choose receiver</option>
        <option value="Yugesh">Yugesh</option>
        <option value="Bishal">Bishal</option>
        <option value="Suyashaa">Suyashaa</option>
      </select>
      <br />
      <button onClick={handleUserSelect}>Select User</button>
    </div>
  );
};

export default UserSelection;
