export default function DemoNotification({ dismiss }) {
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
