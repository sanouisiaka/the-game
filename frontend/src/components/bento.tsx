import Box from "@/components/elements/box";

export default function Bento() {
  return (
    <div className="h-full grid grid-cols-5 grid-rows-4 gap-3 p-2">
      <div className="row-start-1 row-span-3 col-start-1 col-span-2">
        <Box/>
      </div>
      <div className="row-start-1 col-start-3">
        <Box/>
      </div>
      <div className="row-start-1 col-start-4">
        <Box/>
      </div>
      <div className="row-start-2 row-span-2 col-start-3 col-span-2">
        <Box/>
      </div>
      <div className="col-start-5 row-span-4">
        <Box/>
      </div>
      <div className="row-start-4 col-span-4 col-start-1">
        <Box/>
      </div>
    </div>
  );
}
