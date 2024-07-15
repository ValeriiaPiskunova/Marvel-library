import axios from "axios";
import md5 from "md5";

const publicKey = "49eaba51d3baf3dfe7b7cc57653dcd4d";
const privateKey = "44655cdb42dce158fdd11a7cd10a03d1fa09b2a1";
const baseUrl = "https://gateway.marvel.com/v1/public";

const getAuthParams = () => {
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);
  return {
    ts,
    apikey: publicKey,
    hash,
  };
};

export const fetchCharacters = async (
  query = "",
  offset = 0,
  limit = 20
) => {
  try {
    const authParams = getAuthParams();
    const params = {
      offset,
      limit,
      ...authParams,
    };
    if (query) {
      params.nameStartsWith = query;
    }

    const response = await axios.get(`${baseUrl}/characters`, {
      params,
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching characters:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const authParams = getAuthParams();
    const response = await axios.get(`${baseUrl}/characters/${id}`, {
      params: {
        ...authParams,
      },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error(
      "Error fetching character:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
