export default function ChatList({ chat, currentUser }) {
  const flexClasses =
    chat.username !== currentUser ? "flex flex-col justify-end items-en" : "";
  const chatBgClasses =
    chat.username === currentUser
      ? "bg-gray-900 text-white"
      : "bg-purple-500 ml-auto mr-0 w-full text-gray-700";
  return (
    <div>
      <div className={flexClasses}>
        <div
          className={`${
            chat.username !== currentUser ? "text-right" : ""
          } text-purple-900`}
        >
          <small>{chat.username}</small>
        </div>
        <div
          className={`${chatBgClasses} max-w-xs rounded-md mt-2 px-3 py-3 text-sm `}
        >
          <p>{chat.message}</p>
        </div>
      </div>
    </div>
  );
}
