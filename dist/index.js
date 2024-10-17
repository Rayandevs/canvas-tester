"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CanvaBuilder: () => CanvaBuilder,
  Templates: () => Templates,
  version: () => version
});
module.exports = __toCommonJS(src_exports);

// src/types/_string.ts
var Templates = /* @__PURE__ */ ((Templates2) => {
  Templates2["WelcomeDefault"] = "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Welcome%20Card%20Design%20%231.png";
  Templates2["FarewellDefault"] = "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Farewell%20Design%20%231.png";
  return Templates2;
})(Templates || {});

// src/Canvas/Builder.ts
var import_canvas = __toESM(require("@napi-rs/canvas"));
var _CanvaBuilder = class _CanvaBuilder {
  constructor(options) {
    this.options = null;
    this.data = { filepath: "Unknown" };
    import_canvas.default.GlobalFonts.registerFromPath("./Yonoy.ttf", "Yonoy");
    const _info = this.build(options);
    this.canvas = import_canvas.default.createCanvas(_info.w, _info.h);
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
    const background = await import_canvas.default.loadImage(this.data.filepath);
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
    const avatar = await import_canvas.default.loadImage(this.options.avatarURL);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CanvaBuilder,
  Templates,
  version
});
//# sourceMappingURL=index.js.map