const Joi = require("joi");

/*
 * Esquema de validación para análisis de imágenes
 * Define las reglas de validación usando Joi para los datos de entrada.
 */

const analyzeInputSchema = Joi.object({
  filename: Joi.string().min(1).required().messages({
    "string.empty": "El nombre del archivo es obligatorio",
    "any.required": "El nombre del archivo es obligatorio"
  }),

  mimeType: Joi.string()
    .valid("image/jpeg", "image/png")
    .required()
    .messages({
      "any.only": "El archivo debe ser una imagen válida (JPEG o PNG)",
      "any.required": "El tipo MIME es obligatorio"
    }),

  size: Joi.number()
    .integer()
    .positive()
    .max(5 * 1024 * 1024)
    .required()
    .messages({
      "number.max": "El archivo no debe superar los 5MB",
      "number.base": "El tamaño debe ser un número",
      "any.required": "El tamaño es obligatorio"
    })
});

function validateAnalyzeInput(payload) {
  return analyzeInputSchema.validate(payload, {
    abortEarly: false,
    allowUnknown: false
  });
}

module.exports = { validateAnalyzeInput };