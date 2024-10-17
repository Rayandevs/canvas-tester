var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/types/_string.ts
var Templates = /* @__PURE__ */ ((Templates2) => {
  Templates2["WelcomeDefault"] = "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Welcome%20Card%20Design%20%231.png";
  Templates2["FarewellDefault"] = "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Farewell%20Design%20%231.png";
  return Templates2;
})(Templates || {});

// src/Canvas/Builder.ts
import napi from "@napi-rs/canvas";
var _CanvaBuilder = class _CanvaBuilder {
  constructor(options) {
    this.options = null;
    this.data = { filepath: "Unknown" };
    napi.GlobalFonts.registerFromPath("./Yonoy.ttf", "Yonoy");
    const _info = this.build(options);
    this.canvas = napi.createCanvas(_info.w, _info.h);
  }
  set(required) {
    this.options = required;
    return this;
  }
  async draw(canvas) {
    if (!this.options)
      throw new Error("Options are required, call passOptions()");
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const centerX = width / 2;
    const radius = 250;
    const ctx = canvas.getContext("2d");
    const background = await napi.loadImage(this.data.filepath);
    ctx.drawImage(background, 0, 0, width, height);
    ctx.fillStyle = "#f2f2f2";
    ctx.font = "bold 120px Yonoy";
    ctx.fillText(this.options.username, centerX - 220, centerY + 55);
    ctx.fillStyle = "#f2f2f2";
    ctx.font = "bold 50px Yonoy";
    ctx.fillText("#" + this.options.members.toString(), centerX + 500, centerY - 35);
    ctx.beginPath();
    ctx.arc(radius + 34, centerY, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await napi.loadImage(this.options.avatarURL);
    ctx.drawImage(avatar, 0, centerY - radius, radius * 2, radius * 2);
    return canvas.toBuffer("image/jpeg");
  }
  figureWHDraw(template) {
    if (template === "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Welcome%20Card%20Design%20%231.png" /* WelcomeDefault */) {
      this.data.filepath = "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Welcome%20Card%20Design%20%231.png" /* WelcomeDefault */;
      return { w: 1772, h: 633 };
    } else if (template === "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Farewell%20Design%20%231.png" /* FarewellDefault */) {
      this.data.filepath = "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Farewell%20Design%20%231.png" /* FarewellDefault */;
      return { w: 1772, h: 633 };
    }
    return { w: 0, h: 0 };
  }
  build(options) {
    if (!(options == null ? void 0 : options.template))
      throw new Error("A template option is required at this moment.");
    return this.figureWHDraw(options.template);
  }
};
__name(_CanvaBuilder, "CanvaBuilder");
var CanvaBuilder = _CanvaBuilder;

// src/index.ts
var version = "0.0.0";
export {
  CanvaBuilder,
  Templates,
  version
};
//# sourceMappingURL=index.mjs.map