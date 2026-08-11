import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Liah AI Concierge & Patrimonial Advisor Endpoint
  app.post("/api/liah-assistant", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY no está configurado. Configura tu API key en los ajustes de AI Studio." 
        });
      }

      const { prompt, context } = req.body;
      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `
Eres Liah IA, el Asistente Virtual Inteligente de Búsqueda, Concierge y Asesor Patrimonial de Liah ("liah | TOMA EL CONTROL").
Liah es el ecosistema de hospitalidad de ultra-lujo y propiedad Fractional (adquisición de fracciones vitalicias de experiencias vacacionales). Nota: Liah ofrece únicamente Renta Vacacional (hospedaje por noche) y Adquisición Fractional; NO se realiza venta de casas completas.

Propiedades en el catálogo actual de Liah:
1. "Casa Ananta (Telchac, Yucatán)": Experiencia de playa frente al mar, 4 recámaras, capacidad 10 huéspedes, alberca infinita, terraza con vista panorámica a la Costa Esmeralda. $12,500 MXN/noche. Fracciones desde $189,600 MXN ($9,480 USD).
2. "Bungalow Ku'uk (Valladolid, Yucatán)": Villa ecológica en la selva maya con cenote privado, 2 recámaras, 4 huéspedes, tina al aire libre y fogatero. $7,800 MXN/noche. Fracción Fractional: $58,000 USD.
3. "Departamento Capri (Telchac, Yucatán)": Departamento de playa contemporáneo con acceso directo a marina y mar, 3 recámaras, 6 huéspedes, muelle privado. $9,200 MXN/noche. Fracción Fractional: $64,000 USD.
4. "Casa Celesta (San Miguel de Allende, Guanajuato)": Casona colonial restaurada de autor, 5 recámaras, 12 huéspedes, rooftop con vista a la Parroquia, cava subterránea. $18,500 MXN/noche. Fracción Fractional: $115,000 USD.
5. "Cabaña AURA (Valle de Bravo, Edo. Méx.)": Refugio en el bosque con jacuzzi exterior y chimenea, 3 recámaras, 6 huéspedes. $8,900 MXN/noche. Fracción Fractional: $62,000 USD.

Reglas de respuesta del Asistente Virtual Liah:
1. Responde de forma concisa, elegante, amable y muy útil.
2. Si el usuario pregunta qué busca o pide recomendaciones de viaje ("quiero ir a la playa", "lugar romántico con cenote", "casa grande para familia en Telchac"), recomiéndale exactamente la propiedad de Liah ideal con sus ventajas.
3. Explica que Liah ofrece dos modelos: Renta / Hospedaje Vacacional por noche o Adquisición Fractional con escrituración en fideicomiso y cero molestias operativas. Enfatiza que no vendemos casas completas, sino fracciones de vacacionar e inversión inteligente.
4. Responde en español natural y profesional.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\nContexto actual del usuario: ${JSON.stringify(context || {})}\nPregunta del usuario: ${prompt}` }] }
        ]
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Error in Liah Assistant:", error);
      res.status(500).json({ error: error?.message || "Error al procesar la solicitud con el Asistente Liah." });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Liah - Toma el Control" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor Liah ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer();
