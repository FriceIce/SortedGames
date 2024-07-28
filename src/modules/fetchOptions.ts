export const optionsForGamesFetching = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_KEY as string,
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};

export const gameUrl = (
  json: boolean,
  endpoint: string,
  query?: string,
  value?: string
) => {
  return json
    ? `/database/category/${endpoint}.json`
    : `https://free-to-play-games-database.p.rapidapi.com/api/${endpoint}?${query}=${value}`;
};

export const optionsWithoutBody = (method: string, token: string) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
};

export const optionsWithBody = (method: string, body: any, token?: string) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ ...body }), //
  };
};

export const userUrl = (endpoint: string, param?: string | number) => {
  return param
    ? `http://localhost:3000/api/${endpoint}/${param}`
    : `http://localhost:3000/api/${endpoint}`;
};
