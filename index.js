import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";

dotenv.config();
const app = express();
const port = 3001;
// allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/predict", (req, res) => {
  const promt = req.body.promt;
  axios
    .post(`http://5a2a-35-240-210-71.ngrok.io/process`, { promt })
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    });

  // res.send("Hello World!");
});

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});
