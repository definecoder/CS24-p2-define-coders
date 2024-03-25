export default function UnassignedMyProfilePanel() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">My Profile</h1>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <h1 className="text-2xl font-semibold md:text-4xl">Welcome Mehraj!</h1>
        <h1 className="text-sm md:text-2xl">
          Contact admin to apply for a role
        </h1>
      </div>
    </main>
  );
}
