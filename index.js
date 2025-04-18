import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyBXVdBQJtsSdLAkTa8M5YW6UgtP2nWEyZI");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post("/responder", async (req, res) => {
  const { pergunta } = req.body;
  if (!pergunta) return res.status(400).json({ erro: "Pergunta não enviada." });

  try {
    const result = await model.generateContent(pergunta);
    const response = await result.response;
    const texto = await response.text();
    res.json({ resposta: texto });
  } catch (e) {
    console.error("Erro:", e);
    res.status(500).json({ erro: "Erro ao gerar resposta" });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor Gemini ativo!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
