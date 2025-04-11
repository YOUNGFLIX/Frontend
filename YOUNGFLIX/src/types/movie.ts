export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
  
  export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };


  export type MovieDetail = {
    id: any;
    title: string;
    tagline: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    genres: { id: number; name: string }[];
    videos?: {
      results: MovieVideo[];
    };
    credits?: {
      cast: MovieCast[];
    };
    reviews?: {
      results: MovieReview[];
    };
    "watch/providers"?: {
      results: {
        [countryCode: string]: {
          link: string;
          flatrate?: Provider[];
          rent?: Provider[];
          buy?: Provider[];
        };
      };
    };
  };
  
  export type MovieCast = {
    id: number;
    name: string;
    original_name: string;
    profile_path: string | null;
    character: string;
    job?: string;
  };

  export type MovieVideo = {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
  };

  export type MovieVideoResponse = {
    id: number;
    results: MovieVideo[];
  };

  export type MovieReview = {
    id: string;
    author: string;
    content: string;
    created_at: string;
    url: string;
  };

  export type Provider = {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  };