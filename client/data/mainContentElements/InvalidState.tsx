export default function InvalidSate() {
    return (
      <div className="flex flex-1 max-h-[calc(100vh-60px)]">
        <div className="flex flex-col flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm text-lg text-gray-500">
          <img src="/logoBlack.png" alt="Logo" className="w-24 h-24" />
          <h1 className="text-3xl  text-black font-semibold md:text-4xl m-2">
            PLEASE WAIT
          </h1>
          Proper access data is not loaded yet.
        </div>
      </div>
    );
  }