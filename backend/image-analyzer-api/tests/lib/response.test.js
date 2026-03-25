const { json } = require("../../src/lib/response");

describe("json", () => {
  it("construye una respuesta HTTP JSON con cabeceras CORS", () => {
    expect(json(201, { ok: true })).toEqual({
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({ ok: true })
    });
  });
});