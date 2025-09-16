// api/discord.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const DISCORD_USER_ID = process.env.DISCORD_USER_ID;
  const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/users/${DISCORD_USER_ID}`,
      { headers: { Authorization: `Bot ${DISCORD_TOKEN}` } }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("Erro fetch Discord:", err);
    return res.status(500).json({ error: "Falha no servidor" });
  }
}
