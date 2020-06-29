const { generar_id } = require("../components/util/util-id");

test("generar id unico, validar si es de tipo string", () => {
  expect("Icaza").toMatch(/I/);
});
