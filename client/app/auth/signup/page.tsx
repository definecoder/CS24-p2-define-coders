import LeftImage  from "./leftImage";
import RightForm from "./rightForm";

export default function LoginPage() {
  return (
    <>
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      
      <LeftImage />
      <RightForm />
      
    </div>
    </>
  );
}
