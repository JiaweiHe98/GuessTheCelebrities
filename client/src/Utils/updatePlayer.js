const updatePlayer = async (url, player) => {
  const content = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player),
  };

  try {
    const response = await fetch(`${url}/player/${player.id}`, content);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (err) {
    return {};
  }
};

export default updatePlayer;
