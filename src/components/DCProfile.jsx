import React, { useEffect, useState } from "react";

const DiscordProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/discord");
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data.username || !data.id) {
        setError(true);
        setLoading(false);
        return;
      }

      const avatarUrl = data.avatar
        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discriminator) % 5}.png`;

      setProfile({
        name: data.global_name || data.username,
        avatar: avatarUrl,
      });
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    const interval = setInterval(fetchProfile, 30000); // atualiza a cada 30s
    return () => clearInterval(interval);
  }, []);

  // Estados de loading e erro
  if (loading) return <p className="text-black">Carregando...</p>;
  if (error || !profile) return <p className="text-black">Não foi possível carregar o perfil.</p>;

  return (
    <div className="flex flex-col items-center mt-10">
      <img
        src={profile.avatar}
        alt="Avatar do Discord"
        className="w-24 h-24 rounded-full border-2 border-black"
      />
      <h2 className="text-xl text-black">{profile.name}</h2>

      <div className="mt-4 w-full">
        <hr className="border-1 border-black mb-2" />
        <div className="flex flex-row justify-center items-center gap-2">
          <img
            src="/assets/Icons/logo-steam.png"
            className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() => window.open("https://steamcommunity.com/id/Jossxz/", "_blank")}
          />
          <img
            src="/assets/Icons/instagram.png"
            className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() => window.open("https://www.instagram.com/jossxzy/", "_blank")}
          />
          <img
            src="/assets/Icons/github.png"
            className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() => window.open("https://github.com/Jossxz/", "_blank")}
          />
          <img
            src="/assets/Icons/linkedin.png"
            className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() => window.open("https://www.linkedin.com/in/joseweeverton/", "_blank")}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscordProfile;
