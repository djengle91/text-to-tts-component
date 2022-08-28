const express = require("express");
const { createCanvas } = require("canvas");

const app = express();

app.listen(process.env.PORT || 8080);

app.get("/", (req, res) => {
  // use URL encoding for spaces, new lines, and & symbol
  // %20 = space, %0A = new line, %26 = &
  const text = req.query.t || req.query.text || "";
  // default size is 63.5mm x 88mm, which is the standard card size
  const options = {
    // size in mm multipled by 4 to get size in pixels
    width: (req.query.w || req.query.width || 63.5) * 4,
    // size in mm multipled by 4 to get size in pixels
    height: (req.query.h || req.query.height || 88) * 4,
    // can be any string useable on color css
    textColor: req.query.c || req.query.textColor || "black",
    // can be any string useable on color css
    bgColor: req.query.bc || req.query.bgColor || "white",
    // can use any string useable on font-size css
    fontSize: req.query.f || req.query.fontSize || "16px",
    // will be put above regular text and bolded
    title: req.query.t || req.query.title || "",
    // can use any string useable on font-size css
    titleSize: req.query.ts || req.query.titleSize || "20px",
  };

  res.writeHead(200, {
    "Content-Type": "image/png",
  });

  res.end(generateComponent(text, options));
});

const generateComponent = (text, options) => {
  const canvas = createCanvas(options.width, options.height);
  const context = canvas.getContext("2d");

  context.fillStyle = options.bgColor;
  context.fillRect(0, 0, options.width, options.height);

  context.fillStyle = options.textColor;
  context.font = `${options.fontSize} sans-serif`;
  context.textAlign = "center";
  context.fillText(text, options.width / 2, options.height / 4);

  if (options.title) {
    context.font = `bold ${options.titleSize} sans-serif`;
    context.fillText(options.title, options.width / 2, options.height / 6);
  }

  return canvas.toBuffer("image/png");
};
