import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Logo() {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image src="/logo.svg" height="40" width="40" alt="logo" className="dark:hidden" />
      <Image src="/logo-dark.svg" height="40" width="40" alt="logo" className="hidden dark:block" />
      <p className={cn("font-semibold", font.className)}>Shopy</p>
    </div>
  );
}

export default Logo;
