import CrossIcon from "@/app/icons/CrossIcon";
import { IUser } from "@/app/models/User/@types";
import Image from "next/image";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

export interface IChipProps extends IUser {
  onRemove: (id: string) => void;
  isFocused?: boolean;
}

const Chip: FC<IChipProps> = ({
  id,
  name,
  avatar,
  isFocused = false,
  onRemove,
}) => {
  return (
    <div
      className={twMerge(
        styles.chip,
        isFocused && "border-2 border-blue-600"
      )}
    >
      <div className="rounded-full bg-black">
        <Image
          src={avatar.src}
          alt={avatar.alt}
          height={30}
          width={30}
          className="rounded-full"
        />
      </div>
      <div className="justify-center text-sm">{name}</div>
      <button onClick={() => onRemove(id)}>
        <CrossIcon />
      </button>
    </div>
  );
};

export default Chip;
