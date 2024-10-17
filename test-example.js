const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");
const fs = require("node:fs");

// Register font
GlobalFonts.registerFromPath("Yonoy.ttf", "Yonoy");

const avatar_url =
  "https://cdn.discordapp.com/avatars/1143607268781342893/d67859351e0aa55218feb4e9ce0e8caa.png?size=1024";
const username = "0saphhy";
const members = `#100000`;

async function build() {
  const width = 1772;
  const height = 633;
  const cenX = width / 2;
  const cenY = height / 2;
  const radius = 250;

  const canvas = await createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const background = await loadImage("./card.png");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f2f2f2";
  (ctx.font = "bold 120px Yonoy"),
    ctx.fillText(username, cenX - 220, cenY + 40);

  ctx.fillStyle = "#f2f2f2";
  ctx.font = "110px Yonoy";
  ctx.fillText(members, cenX + 200, cenY + 40);

  ctx.beginPath();
  ctx.arc(radius + 34, cenY, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await loadImage(avatar_url);
  ctx.drawImage(avatar, 0, cenY - radius, radius * 2, radius * 2);

  fs.writeFileSync("./generated.png", canvas.toBuffer("image/png"));
}

build();
