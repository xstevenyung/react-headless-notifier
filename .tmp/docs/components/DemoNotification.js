export function SuccessDemoNotification({ dismiss }) {
  return (
    <div className="bg-green-500 border border-gray-200 px-4 py-2 shadow-lg rounded">
      <p className="font-bold text-green-100">Well, hello there</p>
      <p className="text-green-300">
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button
        type="button"
        className=" text-green-200 font-semibold mt-2 hover:text-green-100"
        onClick={dismiss}
      >
        Dismiss
      </button>
    </div>
  );
}

export function InfoDemoNotification({ dismiss }) {
  return (
    <div className="bg-blue-500 border border-gray-200 px-4 py-2 shadow-lg rounded">
      <p className="font-bold text-blue-100">Well, hello there</p>
      <p className="text-blue-300">
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button
        type="button"
        className=" text-blue-200 font-semibold mt-2 hover:text-blue-100"
        onClick={dismiss}
      >
        Dismiss
      </button>
    </div>
  );
}

export function WarningDemoNotification({ dismiss }) {
  return (
    <div className="bg-yellow-500 border border-gray-200 px-4 py-2 shadow-lg rounded">
      <p className="font-bold text-yellow-100">Well, hello there</p>
      <p className="text-yellow-300">
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button
        type="button"
        className=" text-yellow-200 font-semibold mt-2 hover:text-yellow-100"
        onClick={dismiss}
      >
        Dismiss
      </button>
    </div>
  );
}

export function DangerDemoNotification({ dismiss }) {
  return (
    <div className="bg-red-500 border border-gray-200 px-4 py-2 shadow-lg rounded">
      <p className="font-bold text-red-100">Well, hello there</p>
      <p className="text-red-300">
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button
        type="button"
        className=" text-red-200 font-semibold mt-2 hover:text-red-100"
        onClick={dismiss}
      >
        Dismiss
      </button>
    </div>
  );
}