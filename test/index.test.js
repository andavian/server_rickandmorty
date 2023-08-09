const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

const character = {
  id: 1524,
  name: "Ian",
  species: "Human",
  gender: "Male",
  status: "Alive",
  origin: {
    name: "Heart",
  },
  image: "imagen",
};

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      const response = await agent.get("/rickandmorty/character/1");
      expect(response.status).toBe(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const { body } = await agent.get("/rickandmorty/character/1");

      for (const prop in character) {
        expect(body).toHaveProperty(prop);
      }
    });

    it("Si hay un error responde con status: 500", async () => {
      const response = await agent.get("/rickandmorty/character/1548l");
      expect(response.statusCode).toBe(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    it("responde con las credenciales correctas", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?email=ing.elbaum@gmail.com&password=Andav2212"
      );
      expect(body).toEqual({ access: true });
    });

    it("responde con las credenciales incorrectas", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?email=elbaum@gmail.com&password=And2212"
      );
      expect(body).toEqual({ access: false });
    });
  });
  describe("POST /rickandmorty/fav", () => {
    it("Devuelve un array creado con base en el personaje enviado", async () => {
      const { body } = await agent.post("/rickandmorty/fav").send(character);
      expect(body).toBeInstanceOf(Array);
      expect(body).toContainEqual(character);
    });
    it("Agrega personaje a favoritos conservando el anterior", async () => {
      character.id = 1845;
      character.name = "Anibal";
      const { body } = await agent.post("/rickandmorty/fav").send(character);
      expect(body.length).toBe(2);
    });
  });
  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Debe devolver el arreglo sin modificar si no encuentra el ID", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/3");
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBe(2);
    });

    it("Si el ID es correcto eliminar el personaje", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/1845");
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBe(1);
    });
  });
});
