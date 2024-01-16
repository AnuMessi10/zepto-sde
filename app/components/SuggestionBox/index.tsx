import { IUser } from "@/app/models/User/@types";
import Image from "next/image";
import React, { FC, useEffect } from "react";
import styles from "./index.module.scss";
import { twMerge } from "tailwind-merge";

export interface ISuggestionBoxProps {
  users: IUser[];
  onChipClick: (id: IUser["id"]) => void;
  focusedIdx?: number;
}

const SuggestionBox: FC<ISuggestionBoxProps> = ({
  users = [],
  onChipClick,
  focusedIdx = -1,
}) => {
  const refs = users.reduce((acc, user) => {
    acc.push(React.createRef<HTMLButtonElement>());
    return acc;
  }, [] as React.RefObject<HTMLButtonElement>[]);

  useEffect(() => {
    if (focusedIdx !== -1 && refs[focusedIdx].current) {
      refs[focusedIdx].current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIdx, refs]); // Call scrollIntoView when focusedIdx changes

  return (
    <div className={styles.suggestionBox}>
      {users.map(({ id, name, avatar, email }, i) => (
        <button
          key={id}
          className={twMerge(
            styles.suggestionBoxUser,
            focusedIdx === i && "bg-blue-100"
          )}
          ref={refs[i]}
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
