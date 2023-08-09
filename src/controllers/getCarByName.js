const axios = require("axios");

const URL_BASE = "https://rickandmortyapi.com/api/character/";

const getCharByName = async (req, res) => {
  const { charName } = req.query;

  const totalPages = 42;
  const characters = [];

  try {
    const fetchCharacterPage = async (page) => {
      const response = await axios.get(`${URL_BASE}?page=${page}`);
      return response.data.results;
    };

    const promises = [];
    for (let page = 1; page <= totalPages; page++) {
      promises.push(fetchCharacterPage(page));
    }

    const pagesData = await Promise.all(promises);
    pagesData.forEach((pageData) => {
      characters.push(...pageData);
    });

    const propiedadesPersonajes = characters.map((personaje) => {
      const { id, name, status, species, gender, origin, image } = personaje;
      return {
        id,
        name,
        status,
        species,
        gender,
        origin: origin.name,
        image,
      };
    });

    const nameFinding = propiedadesPersonajes.filter((character) =>
      character.name.toLowerCase().includes(charName.toLowerCase())
    );

    if (nameFinding.length === 0) {
      return res.status(400).send("No existe personaje con ese nombre");
    }

    return res.status(200).json(nameFinding);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    res.end();
  }
};

module.exports = getCharByName;
