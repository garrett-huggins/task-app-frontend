import Image from "next/image";
import arrowLeftIcon from "../../../public/icons/arrow-left.svg";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button className="hover:bg-gray-100/10 rounded-full">
      <Image
        src={arrowLeftIcon}
        alt="Back Icon"
        width={24}
        height={24}
        onClick={() => router.back()}
      />
    </button>
  );
};
