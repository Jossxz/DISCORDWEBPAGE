export default async function handler(req, res) {
  const DISCORD_USER_ID = process.env.DISCORD_USER_ID;
  const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

  if (req.method === "GET") {
    try {
      const response = await fetch(
        `https://discord.com/api/v10/users/${DISCORD_USER_ID}`,
        {
          headers: { Authorization: `Bot ${DISCORD_TOKEN}` },
        }
      );
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Falha no servidor" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Método não permitido" });
  }
}
