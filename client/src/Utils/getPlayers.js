const getPlayers = async (url) => {
  try {
    const response = await fetch(`${url}/players`);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (err) {
    return [];
  }
};

export default getPlayers;
