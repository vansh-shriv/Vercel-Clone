import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const YOUR_BACKEND_URL = "http://localhost:3000"; 

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { deployedUrl: null, error: null });
});

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;

  try {
    // Backend API Call
    const res = await axios.post("${YOUR_BACKEND_URL}/deploy",{ 
      repoUrl,
    });
    const deployedUrl = res.data.id;
    const response = await axios.get(`${YOUR_BACKEND_URL}/status?id=/${deployedUrl}`);
    if(response.data.status === "deployed"){
        res.render("index", { deployedUrl, error: null });
    }
  } catch (err) {
    console.log(err);
    res.render("index", { deployedUrl: null, error: "Deployment failed!" });
  }
});

app.listen(3003, () => console.log("Frontend server running at http://localhost:3003"));
