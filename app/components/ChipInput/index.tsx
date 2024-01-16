"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { IUser } from "@/app/models/User/@types";
import SuggestionBox from "../SuggestionBox";
import Chip from "../Chip";
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

export interface IChipInputProps {
  users: IUser[];
}

const ChipInput: FC<IChipInputProps> = ({ users = [] }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [matchingUsers, setMatchingUsers] = useState<IUser[]>(users);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [isLastUserSelected, setIsLastUserSelected] = useState<boolean>(false);

  // Show the users list on focus
  const handleFocus = () => {
    // if (!value) setMatchingUsers(_.difference(users, selectedUsers));
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!isFocused) setIsFocused(true);
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
    if (isLastUserSelected) setIsLastUserSelected(false);

    // Find the selected user
    const selectedUser = matchingUsers.find((user) => user.id === id);

    if (!selectedUser) return;

    // Add to selected users
    setSelectedUsers((prevSelectedUsers) => [
      ...prevSelectedUsers,
      selectedUser,
    ]);

    // Clear the text input
    if (value) setValue("");

    // Remove from the matching users
    setMatchingUsers((prevMatchingUsers) =>
      prevMatchingUsers.filter((user) => user.id !== id)
    );
  };

  const removeClickedUser = (id: IUser["id"]) => {
    // Find the user to remove
    const selectedUser = selectedUsers.find((user) => user.id === id);

    if (!selectedUser) return;

    // Remove from the selected users
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user.id !== id)
    );

    // Add to the matching users
    if (!value)
      setMatchingUsers((prevMatchingUsers) => [
        ...prevMatchingUsers,
        selectedUser,
      ]);
  };

  // Handle keyboard events (enter, backspace etc...)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (matchingUsers.length > 0 && e.key === "Enter")
      addClickedUser((matchingUsers.at(0) as IUser).id);

    if (!value && selectedUsers.length > 0 && e.key === "Backspace") {
      if (!isLastUserSelected) setIsLastUserSelected(true);
      else {
        removeClickedUser((selectedUsers.at(-1) as IUser).id);
        setIsLastUserSelected(false);
        setMatchingUsers(_.difference(users, selectedUsers));
      }
    }
  };

  return (
    <div className={styles.chipInputCtn} onClick={handleFocus}>
      {selectedUsers.map((selectedChip, i) => (
        <Chip
          key={selectedChip.id}
          onRemove={removeClickedUser}
          isFocused={isLastUserSelected && i === selectedUsers.length - 1}
          {...selectedChip}
        />
      ))}
      <div className="relative">
        <input
          className={twMerge(
            styles.chipInput,
            isLastUserSelected && "caret-transparent"
          )}
          placeholder="Add new user..."
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        {isFocused && matchingUsers.length ? (
          <SuggestionBox users={matchingUsers} onChipClick={addClickedUser} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChipInput;
