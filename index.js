const express = require("express");

const tesseract = require("node-tesseract-ocr");

const path = require("path");

const app = express();

app.use(express.json());

app.post("/imageSolve", (req, res) => {
  const { url } = req.body;
  console.log(url);
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };

  tesseract
    .recognize(url, config)
    .then((text) => {
      res.send({ response: text.replace("\n\f", "") });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
