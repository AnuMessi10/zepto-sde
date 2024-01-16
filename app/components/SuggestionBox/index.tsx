import { IUser } from "@/app/models/User/@types";
import Image from "next/image";
import React, { FC } from "react";
import styles from "./index.module.scss";

export interface ISuggestionBoxProps {
  users: IUser[];
  onChipClick: (id: IUser["id"]) => void;
}

const SuggestionBox: FC<ISuggestionBoxProps> = ({
  users = [],
  onChipClick,
}) => {
  return (
    <div className={styles.suggestionBox}>
      {users.map(({ id, name, avatar, email }) => (
        <button
          key={id}
          className={styles.suggestionBoxUser}
          onClick={() => onChipClick(id)}
        >
          <Image
            className="rounded-full"
            src={avatar.src}
            alt={avatar.alt}
            width={40}
            height={40}
          />
          <div className="flex items-center justify-between w-full">
            <span className="text-sm">{name}</span>
            <span className="text-xs">{email}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SuggestionBox;
