const {
  detectLabels
} = require("../../src/services/googleVision.service");
const {
  analyzeController
} = require("../../src/controllers/analyzeController");

jest.mock("../../src/services/googleVision.service", () => ({
  detectLabels: jest.fn()
}));

describe("analyzeController", () => {
  it("responde 400 cuando no se recibe archivo", async () => {
    const response = await analyzeController({});

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      error: "No se recibió ninguna imagen."
    });
    expect(detectLabels).not.toHaveBeenCalled();
  });

  it("responde 400 cuando el archivo no pasa la validacion", async () => {
    const response = await analyzeController({
      file: {
        filename: "archivo.gif",
        mimeType: "image/gif",
        buffer: Buffer.from("data")
      }
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      error: "Datos de entrada inválidos.",
      details: ["El archivo debe ser una imagen válida (JPEG o PNG)"]
    });
    expect(detectLabels).not.toHaveBeenCalled();
  });

  it("analiza la imagen y devuelve las etiquetas detectadas", async () => {
    const fileBuffer = Buffer.from("image-data");
    const tags = [{ label: "cat", confidence: 0.98 }];

    detectLabels.mockResolvedValue(tags);

    const response = await analyzeController({
      file: {
        filename: "cat.png",
        mimeType: "image/png",
        buffer: fileBuffer
      }
    });

    expect(detectLabels).toHaveBeenCalledWith(fileBuffer);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ tags });
  });
});