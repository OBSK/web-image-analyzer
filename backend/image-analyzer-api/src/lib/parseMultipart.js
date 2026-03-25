const Busboy = require("busboy");

/*
 * Parser de multipart/form-data
 * Convierte el body de Lambda en un objeto
 */

function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    try {
      const headers = event.headers || {};
      const contentType = headers["content-type"] || headers["Content-Type"];

      if (!contentType || !contentType.includes("multipart/form-data")) {
        return reject(new Error("Content-Type debe ser multipart/form-data"));
      }

      const busboy = Busboy({
        headers: {
          "content-type": contentType
        }
      });

      const result = { file: null };

      busboy.on("file", (fieldname, file, info) => {
        const { filename, mimeType } = info;
        const chunks = [];

        file.on("data", (chunk) => chunks.push(chunk));
        file.on("end", () => {
          result.file = {
            fieldname,
            filename,
            mimeType,
            buffer: Buffer.concat(chunks)
          };
        });
      });

      busboy.on("finish", () => resolve(result));
      busboy.on("error", reject);

      const bodyBuffer = event.isBase64Encoded
        ? Buffer.from(event.body, "base64")
        : Buffer.from(event.body || "", "utf8");

      busboy.end(bodyBuffer);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { parseMultipart };