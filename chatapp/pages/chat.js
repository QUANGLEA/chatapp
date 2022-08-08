import { useState, useEffect, useContext } from "react";
import Pusher from "pusher-js";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import UserPanel from "../components/UserPanel";
import ChatList from "../components/ChatList";
import SendMessage from "../components/SendMessage";
import Notifications from "../components/Notifications";

export default function Chat() {
  const { username, userLocation } = useContext(Context);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [usersRemoved, setUsersRemoved] = useState([]);
  const router = useRouter();
  const channelName = "presence-chat";

  const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
    cluster: "us2",
    // use jwts in prod
    authEndpoint: `api/pusher/auth`,
    auth: { params: { username, userLocation } },
  });
  useEffect(() => {
    const channel = pusher.subscribe(channelName);

    // when a new member successfully subscribes to the channel
    channel.bind("pusher:subscription_succeeded", (members) => {
      // total subscribed
      setOnlineUsersCount(members.count);
    });

    // when a new member joins the chat
    channel.bind("pusher:member_added", (member) => {
      // console.log("count",channel.members.count)
      setOnlineUsersCount(channel.members.count);
      setOnlineUsers((prevState) => [
        ...prevState,
        {
          username: member.info.username,
          userLocation: member.info.userLocation,
        },
      ]);
    });

    // when a member leaves the chat
    channel.bind("pusher:member_removed", (member) => {
      setOnlineUsersCount(channel.members.count);
      setUsersRemoved((prevState) => [...prevState, member.info.username]);
    });

    // updates chats
    channel.bind("chat-update", function (data) {
      const { username, message } = data;
      setChats((prevState) => [...prevState, { username, message }]);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, []);

  const handleSignOut = () => {
    pusher.unsubscribe(channelName);
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/pusher/chat-update", {
      message,
      sender: username,
    });
    setMessage("");
  };

  return (
    <div className="m-auto max-w-full h-screen shadow-lg bg-slate-700">
      <div className="max-w-4xl m-auto pt-20">
        <div className="grid grid-cols-3 bg-white px-10 py-10 rounded-lg">
          <div className="col-span-1 mr-5 ">
            <UserPanel sender={username} onSignOut={handleSignOut} />
            <Notifications
              onlineUsersCount={onlineUsersCount}
              onlineUsers={onlineUsers}
              usersRemoved={usersRemoved}
            />
          </div>

          <div className="col-span-2 flex flex-col bg-purple-200 rounded-lg px-5 py-5">
            <div className="flex-1">
              {chats.map((chat, id) => (
                <ChatList key={id} chat={chat} currentUser={username} />
              ))}
            </div>

            <div className="pt-20">
              <SendMessage
                message={message}
                handleMessageChange={(e) => setMessage(e.target.value)}
                handleSubmit={(e) => {
                  handleSubmit(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
