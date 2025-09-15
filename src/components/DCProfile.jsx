import React, { useEffect, useState } from "react";

const DiscordProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

const fetchProfile = async () => {
    try {
        {/* VERIFICAÇÃO: Caso não receba os dados == Loading*/}
        const res = await fetch("http://localhost:3001/discord/profile");
            if (!res.ok) {
                setLoading(false);
            return;
        }
        const data = await res.json();
        {/* VERIFICAÇÃO: Caso não receba os dados == Loading*/}
        if (!data.username || !data.id) {
            setLoading(false);
        return;
        }

        // Se não houver avatar, usar o avatar padrão do Discord
        const avatarUrl = data.avatar
        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discriminator) % 5}.png`;
    
        {/* Seta o método Name & Avatar para uso no HTML e cancela o loading*/}
        setProfile({
            name: data.global_name,
            avatar: avatarUrl,
        });
        setLoading(false);
    }catch (err) {
        setLoading(true);
    }
};

useEffect(() => {
    fetchProfile();
    const interval = setInterval(fetchProfile, 30000);
    return () => clearInterval(interval);
}, []);


{/* VERIFICAÇÃO: Loading and error states */}
if (loading) return <p className="text-black">Carregando...</p>;
if (!profile) return <p className="text-black">Não foi possível carregar o perfil.</p>;

  return (
    <div className="flex flex-col items-center mt-10">
        {/* IMG Avatar API & TITLE GlobalName API */}
        <img
            src={profile.avatar}
            alt="Avatar do Discord"
            className="w-24 h-24 rounded-full border-2 border-black"
        />
            <h2 className="text-xl text-black">{profile.name}</h2>
        <div>
        {/* Rede Sociais & Line */}
        <hr className="border-1 border-black"/>
            <div className="flex flex-row justify-center align-center gap-1">
                {/* Steam */}
                <img 
                src="/assets/Icons/logo-steam.png"
                className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
                onClick={() => window.open("https://steamcommunity.com/id/Jossxz/", "_blank")}
                />
                {/* Instagram */}
                <img 
                src="/assets/Icons/instagram.png"
                className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
                onClick={() => window.open("https://www.instagram.com/jossxzy/", "_blank")}
                />
                {/* Github */}
                <img 
                src="/assets/Icons/github.png"
                className="p-1 w-8 h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
                onClick={() => window.open("https://github.com/Jossxz/", "_blank")}
                />
                {/* Linkedolas */}
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