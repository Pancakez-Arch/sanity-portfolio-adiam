import { Progress } from "@/components/ui/progress";

export function SectionTwo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      <div className="flex flex-col">
        <h1 className="font-semibold">REACT</h1>
        <div className="flex-1">
          <Progress value={62} />
        </div>
      </div>
    </div>
  );
}