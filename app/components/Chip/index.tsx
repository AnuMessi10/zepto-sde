import { IUser } from "@/app/models/User/@types";
import Image from "next/image";
import { FC } from "react";

export interface IChipProps extends IUser {
  onRemove: (id: string) => void;
}

const Chip: FC<IChipProps> = ({ id, name, avatar, onRemove: onClose }) => {
  return (
    <div className="flex bg-slate-300 rounded-md items-center justify-center p-1">
      <div className="rounded-full bg-black m-1">
        <Image
          src={avatar.src}
          alt={avatar.alt}
          height={20}
          width={20}
          className="w-5 h-5 rounded-full"
        />
      </div>
      <div className="justify-center p-2">{name}</div>
      <button className="bg-slate-300 rounded-full" onClick={() => onClose(id)}>
        X
      </button>
    </div>
  );
};

export default Chip;
