const { parseMultipart } = require("../lib/parseMultipart");
const { checkRateLimit } = require("../lib/rateLimit");
const { analyzeController } = require("../controllers/analyzeController");
const { json } = require("../lib/response");

/*
 * Punto de entrada de la función Lambda
 * Recibe el evento desde API Gateway y coordina el flujo inicial
 * Nota:
 * Este handler NO Contiene lógica de negocio
 */

module.exports.handler = async (event) => {
  try {
    const ip =
      event.requestContext?.http?.sourceIp ||
      event.headers?.[" "] ||
      "anonymous";

    const rate = await checkRateLimit(ip);

    if (!rate.allowed) {
      return json(rate.statusCode, { error: rate.message });
    }

    const { file } = await parseMultipart(event);

    return await analyzeController({ file });
  } catch (error) {
    console.error("analyzeHandler error:", error);

    return json(500, {
      error: "Error interno del servidor.",
      detail: error.message
    });
  }
};