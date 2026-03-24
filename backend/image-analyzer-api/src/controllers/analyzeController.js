const { validateAnalyzeInput } = require("../validations/analyze.schema");
const { detectLabels } = require("../services/googleVision.service");
const { json } = require("../lib/response");

/*
 * Controller de análisis de imágenes
 * Orquesta el caso de uso principal del endpoint /api/analyze.
 * Nota:
 * Punto de partida para el desarrollo de la lógica de negocio
 */

async function analyzeController({ file }) {
  if (!file) {
    return json(400, { error: "No se recibió ninguna imagen." });
  }

  const { error } = validateAnalyzeInput({
    filename: file.filename,
    mimeType: file.mimeType,
    size: file.buffer.length
  });

  if (error) {
    return json(400, {
      error: "Datos de entrada inválidos.",
      details: error.details.map((d) => d.message)
    });
  }

  const tags = await detectLabels(file.buffer);

  return json(200, { tags });
}

module.exports = { analyzeController };