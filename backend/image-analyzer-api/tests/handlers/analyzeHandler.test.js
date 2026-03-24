const { parseMultipart } = require("../../src/lib/parseMultipart");
const { checkRateLimit } = require("../../src/lib/rateLimit");
const {
  analyzeController
} = require("../../src/controllers/analyzeController");
const { handler } = require("../../src/handlers/analyzeHandler");

jest.mock("../../src/lib/parseMultipart", () => ({
  parseMultipart: jest.fn()
}));

jest.mock("../../src/lib/rateLimit", () => ({
  checkRateLimit: jest.fn()
}));

jest.mock("../../src/controllers/analyzeController", () => ({
  analyzeController: jest.fn()
}));

describe("analyzeHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve 429 cuando se supera el rate limit", async () => {
    checkRateLimit.mockResolvedValue({
      allowed: false,
      statusCode: 429,
      message: "Límite excedido"
    });

    const response = await handler({
      headers: {},
      requestContext: {
        http: {
          sourceIp: "127.0.0.1"
        }
      }
    });

    expect(checkRateLimit).toHaveBeenCalledWith("127.0.0.1");
    expect(parseMultipart).not.toHaveBeenCalled();
    expect(analyzeController).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(429);
    expect(JSON.parse(response.body)).toEqual({
      error: "Límite excedido"
    });
  });

  it("procesa la imagen cuando el rate limit lo permite", async () => {
    const file = { filename: "cat.png" };
    const expectedResponse = {
      statusCode: 200,
      body: JSON.stringify({ tags: [{ label: "cat", confidence: 0.98 }] })
    };

    checkRateLimit.mockResolvedValue({ allowed: true });
    parseMultipart.mockResolvedValue({ file });
    analyzeController.mockResolvedValue(expectedResponse);

    const response = await handler({
      headers: {},
      requestContext: {
        http: {
          sourceIp: "10.0.0.1"
        }
      }
    });

    expect(checkRateLimit).toHaveBeenCalledWith("10.0.0.1");
    expect(parseMultipart).toHaveBeenCalled();
    expect(analyzeController).toHaveBeenCalledWith({ file });
    expect(response).toBe(expectedResponse);
  });

  it("maneja errores inesperados con una respuesta 500", async () => {
    const error = new Error("fallo inesperado");
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    checkRateLimit.mockResolvedValue({ allowed: true });
    parseMultipart.mockRejectedValue(error);

    const response = await handler({
      headers: {},
      requestContext: {}
    });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({
      error: "Error interno del servidor.",
      detail: "fallo inesperado"
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "analyzeHandler error:",
      error
    );

    consoleErrorSpy.mockRestore();
  });
});