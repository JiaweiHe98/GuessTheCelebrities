const deletePlayers = async (url, id) => {
  const content = {
    method: 'DELETE',
  };

  try {
    const response = await fetch(`${url}/player/${id}`, content);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (err) {
    return {};
  }
};

export default deletePlayers;
