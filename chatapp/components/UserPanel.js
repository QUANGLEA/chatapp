export default function UserPanel({ sender, onSignOut }) {
  return (
    <div className="flex flex-col items-center justify-center bg-purple-200 h-64 rounded-md shadow-md">
      <div>
        <img
          className="h-28 w-28 rounded-full"
          src="https://cdn4.iconfinder.com/data/icons/cute-minimal-geometric-cartoon-avatars/100/j-512.png"
        ></img>
      </div>
      <p className="text-purple-500">
        Hello, <span className="font-semibold">{sender}</span>
      </p>
      <div className="mt-4">
        <button
          onClick={onSignOut}
          className="text-white bg-purple-500 px-5 text-xs py-3 rounded-md w-full"
        >
          Sign out
        </button>
      </div>
      <div className="mt-10">
        <h2 className="text-green-600">You're online.</h2>
      </div>
    </div>
  );
}
