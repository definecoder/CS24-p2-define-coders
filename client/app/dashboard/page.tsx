import Sidebar from "./sidebar";
import MainContent from "./mainContent";

export default function Dashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      
        <Sidebar role="admin"/>
        <MainContent role="admin"/>
      
    </div>
  );
}
