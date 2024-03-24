export default function InvalidSate() {
    return (
      <div className="flex flex-1 max-h-[calc(100vh-60px)]">
        <div className="flex flex-col flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm text-lg text-gray-500">
          <img src="/logoBlack.png" alt="Logo" className="h-1/6" />
          <h1 className="text-3xl  text-black font-semibold md:text-4xl m-2">
            INVALID STATE
          </h1>
          The state you are trying to access is invalid.
        </div>
      </div>
    );
  }