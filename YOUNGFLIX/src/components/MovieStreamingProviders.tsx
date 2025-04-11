import React from 'react';

const providerLinks: { [key: string]: string } = {
  "Netflix": "https://www.netflix.com/kr",
  "Netflix basic with Ads": "https://www.netflix.com/kr",
  "Disney Plus": "https://www.disneyplus.com/ko-kr",
  "Wavve": "https://www.wavve.com/",
  "Watcha": "https://watcha.com/",
  "Apple TV": "https://tv.apple.com/",
  "Amazon Prime Video": "https://www.primevideo.com/",
  "LaLa": "https://lala.tv/",
};

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface Props {
  providers: Provider[];
}

const MovieStreamingProviders: React.FC<Props> = ({ providers }) => {
  return (
    <div className="px-10 py-8 border-t border-gray-700 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">스트리밍 서비스</h2>
      <div className="flex flex-wrap gap-8 items-center">
        {providers.map((provider) => (
          <a
            key={provider.provider_id}
            href={providerLinks[provider.provider_name] || `https://www.google.com/search?q=${encodeURIComponent(provider.provider_name)}+스트리밍`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#111] px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <img src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`} alt={provider.provider_name} className="w-12 h-12 object-contain" />
            <span className="text-lg font-semibold text-white">{provider.provider_name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MovieStreamingProviders;
