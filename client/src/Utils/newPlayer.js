const newPlayer = async (url, player) => {
  const content = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player),
  };

  try {
    const response = await fetch(`${url}/player`, content);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (err) {
    return {};
  }
};

export default newPlayer;
