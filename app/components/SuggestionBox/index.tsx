import { IUser } from "@/app/models/User/@types";
import Image from "next/image";
import React, { FC } from "react";

export interface ISuggestionBoxProps {
  filteredUsers: IUser[];
  onChipClick: (id: IUser["id"]) => void;
}

const SuggestionBox: FC<ISuggestionBoxProps> = ({
  filteredUsers: filteredChips = [],
  onChipClick,
}) => {
  return (
    <div className="border shadow-xl absolute max-h-60 w-fit overflow-y-scroll overflow-x-hidden">
      {filteredChips.map(({ id, name, avatar, email }) => (
        <button
          key={id}
          className="flex p-2 gap-2 items-center justify-between"
          onClick={() => onChipClick(id)}
        >
          <Image
            className="h-10 w-10 rounded-full"
            src={avatar.src}
            alt={avatar.alt}
            width={40}
            height={40}
          />
          <div className="text-left min-w-[180px]">
            <span>{name}</span>
          </div>
          <div>
            <span>{email}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SuggestionBox;
