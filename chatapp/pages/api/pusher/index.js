import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
  const { message, sender } = req.body;
  await pusher.trigger("presence-chat", "chat-event", {
    message,
    sender,
  });

  res.json({ message: "completed" });
}
