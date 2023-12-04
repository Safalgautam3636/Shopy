import ItemGrid from "./_components/ItemGrid";
import Search from "../../components/Search";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
        <ItemGrid />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
