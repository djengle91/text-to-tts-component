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
    // size in mm multipled by 8 for better resolution
    width: (req.query.w || req.query.width || 63.5) * 8,
    // size in mm multipled by 8 for better resolution
    height: (req.query.h || req.query.height || 88) * 8,
    // can be any string useable on color css
    textColor: req.query.c || req.query.textColor || "black",
    // can be any string useable on color css
    bgColor: req.query.bc || req.query.bgColor || "white",
    // in pixels
    fontSize: req.query.f || req.query.fontSize || "32",
    // will be put above regular text and bolded
    title: req.query.t || req.query.title || "",
    // in pixels
    titleSize: req.query.ts || req.query.titleSize || "40",
    // left | right | center
    alignment: req.query.a || req.query.alignment || "center",
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
  context.font = `${options.fontSize}px sans-serif`;
  context.textAlign = options.alignment;
  let textXPosition = options.width / 2;

  if (options.alignment === "left") {
    textXPosition = 20;
  } else if (options.alignment === "right") {
    textXPosition = options.width - 20;
  }

  wrapText(
    context,
    text,
    textXPosition,
    options.height / 4,
    options.width - 40,
    options.fontSize * 1.5
  );

  if (options.title) {
    context.font = `bold ${options.titleSize}px sans-serif`;
    wrapText(
      context,
      title,
      textXPosition,
      options.height / 6,
      options.width - 40,
      options.titleSize * 1.5
    );
  }

  return canvas.toBuffer("image/png");
};

const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";
  for (const [index, w] of words.entries()) {
    const testLine = line + w + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && index > 0) {
      console.log(line);
      ctx.fillText(line, x, y);
      line = w + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
};
