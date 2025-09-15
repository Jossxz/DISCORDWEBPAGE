// api/discord.js
import fetch from "node-fetch"; // só necessário se seu Node for <18, se for >=18 pode remover

export default async function handler(req, res) {
  const DISCORD_USER_ID = process.env.DISCORD_USER_ID;
  const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

  // Permitir requisições de qualquer origem (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responder requisições OPTIONS para CORS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const response = await fetch(`https://discord.com/api/v10/users/${DISCORD_USER_ID}`, {
        headers: { Authorization: `Bot ${DISCORD_TOKEN}` },
      });

      if (!response.ok) {
        return res.status(500).json({ error: "Erro ao buscar perfil no Discord" });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Falha no servidor" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
}

app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}`));