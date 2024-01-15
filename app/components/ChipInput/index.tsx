"use client";

import React, { ChangeEvent, FC, useState } from "react";
import { IUser } from "@/app/models/User/@types";
import SuggestionBox from "../SuggestionBox";
import Chip from "../Chip";
import _ from "lodash";

export interface IChipInputProps {
  users: IUser[];
}

const ChipInput: FC<IChipInputProps> = ({ users = [] }) => {
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [matchingUsers, setMatchingUsers] = useState<IUser[]>(users);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const resetInput = () => {
    setMatchingUsers([]);
    setValue("");
    setIsFocused(false);
  };

  // Show the users list on focus
  const handleFocus = () => {
    if (!value) setMatchingUsers(_.difference(users, selectedUsers));
    setIsFocused(true);
  };

  // Hide the users list on blur
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const unselectedUsers = _.difference(users, selectedUsers);

    const filteredUsers: IUser[] = target.value
      ? unselectedUsers.filter(({ name }) =>
          name.toLowerCase().includes(target.value.toLowerCase())
        )
      : [];

    setMatchingUsers(filteredUsers);
    setValue(target.value);
  };

  const addClickedUser = (id: IUser["id"]) => {
    // Find the selected user
    const selectedUser = matchingUsers.find((chip) => chip.id === id);

    if (!selectedUser) return;

    // Add to selected users
    setSelectedUsers((prevSelectedUsers) => [
      ...prevSelectedUsers,
      selectedUser,
    ]);

    resetInput();
  };

  const removeClickedUser = (id: IUser["id"]) => {
    // Find the user to remove
    const selectedUser = selectedUsers.find((chip) => chip.id === id);

    if (!selectedUser) return;

    // Remove from the selected users
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((chip) => chip.id !== id)
    );

    resetInput();
  };

  // Return the first entry on enter press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && matchingUsers.length > 0)
      addClickedUser(matchingUsers[0].id);
  };

  return (
    <div className="flex">
      <div className="flex chip-container">
        {selectedUsers.map((selectedChip) => (
          <Chip
            key={selectedChip.name}
            onRemove={removeClickedUser}
            {...selectedChip}
          />
        ))}
      </div>
      <div className="relative">
        <input
          className="border border-1 p-3"
          placeholder="Enter a name..."
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        {isFocused && (
          <SuggestionBox
            filteredUsers={matchingUsers}
            onChipClick={addClickedUser}
          />
        )}
      </div>
    </div>
  );
};

export default ChipInput;
