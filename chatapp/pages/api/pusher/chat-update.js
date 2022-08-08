import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
  const { message, sender } = req.body;
  await pusher.trigger("presence-chat", "chat-update", {
    message,
    username: sender,
  });

  res.json({ status: 200 });
}
