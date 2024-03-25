import EmptyFillContainer from "../../cards/EmptyFillContainer";

export default function AdminDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center hidden">
        <h1 className="text-lg font-semibold md:text-2xl">ADMIN DASHBOARD</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="grid grid-cols-6 grid-rows-8 md:grid-cols-10 md:grid-rows-4 grid-flow-row gap-2 md:gap-4 w-full md:h-full max-h-max">
          <div className="col-span-2 row-span-2 md:row-span-1 min-h-32">
            <EmptyFillContainer>Garir obostha</EmptyFillContainer>
          </div>
          <div className="col-span-4 row-span-2">
            <EmptyFillContainer>Latest Dispatches</EmptyFillContainer>
          </div>
          <div className="col-span-4 row-span-2">
            <EmptyFillContainer>Available Veicles</EmptyFillContainer>
          </div>
          <div className="col-span-2 row-span-2 md:row-span-1">
            <EmptyFillContainer>Dump Collection status</EmptyFillContainer>
          </div>
          <div className="col-span-6 md:col-span-4 row-span-2 min-h-56">
            <EmptyFillContainer>Critical Schedule First</EmptyFillContainer>
          </div>
          <div className="col-span-6 row-span-4 md:row-span-2 min-h-72">
            <EmptyFillContainer>WASTE HEATMAP</EmptyFillContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
