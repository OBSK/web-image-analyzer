const vision = require("@google-cloud/vision");

/*
 * Servicio de integración con Google Cloud Vision
 * Encapsula la comunicación con la API de Google Vision.
 */

let client;

function getVisionClient() {
  if (!client) {
    const credentials = JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    );

    client = new vision.ImageAnnotatorClient({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials
    });
  }

  return client;
}

async function detectLabels(buffer) {
  const visionClient = getVisionClient();

  const [result] = await visionClient.labelDetection({
    image: { content: buffer }
  });

  const labels = result.labelAnnotations || [];

  return labels.map((item) => ({
    label: item.description || "Unknown",
    confidence: Number((item.score || 0).toFixed(2))
  }));
}

module.exports = { detectLabels };