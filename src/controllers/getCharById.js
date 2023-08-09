const axios = require("axios");

const URL_BASE = "https://rickandmortyapi.com/api/character/";

const getCharById = async (req, res) => {
  // const { id } = req.params
  const id = parseInt(req.params.id);
  try {
    const { data } = await axios(`${URL_BASE}${id}`);
    const { status, name, species, origin, image, gender } = data;
    const character = {
      id,
      status,
      name,
      species,
      origin: origin.name,
      image,
      gender,
    };
    return character.name
      ? res.status(200).json(character)
      : res.status(404).send("Not found");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    res.end();
  }
};

module.exports = getCharById;
