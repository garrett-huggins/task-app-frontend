import Image from "next/image";
import rocketIcon from "../../../public/icons/rocket.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-background-accent h-48 flex justify-center items-center">
      <Link href="/">
        <h1 className="text-primary font-black text-5xl">
          <span>
            <Image
              priority
              src={rocketIcon}
              alt="Rocket Logo"
              width={36}
              height={22}
              className="inline"
            />
          </span>{" "}
          Todo <span className="text-secondary">App</span>
        </h1>
      </Link>
    </header>
  );
};
