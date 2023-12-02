import LineUserInfo from "@/components/elements/lineUserInfo";
import TitleBigHeader from "@/components/elements/titleBigHeader";

export default function Header() {
  return (
    <div className="h-full flex flex-col">
      <TitleBigHeader />
      <LineUserInfo />
    </div>
  );
}
