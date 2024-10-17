import { Templates } from "../types/_string";
import { CanvasBuilderOptions } from "../types/canvas";
import napi from "@napi-rs/canvas";

interface CanvaBuilderData {
  filepath: string;
}

interface CanvaBuilderRequired {
  username: string;
  members: number | string;
  avatarURL: string;
}

export class CanvaBuilder {
  public canvas: napi.Canvas;
  public options: CanvaBuilderRequired | null;
  private data: CanvaBuilderData;

  public constructor(options: CanvasBuilderOptions) {
    this.options = null;
    this.data = { filepath: "Unknown" };
    napi.GlobalFonts.registerFromPath("./Yonoy.ttf", "Yonoy");

    const _info = this.build(options);
    this.canvas = napi.createCanvas(_info.w, _info.h);
  }

  public set(required: CanvaBuilderRequired) {
    this.options = required;
    return this;
  }

  public async draw(canvas: napi.Canvas) {
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

    // Draw username
    ctx.fillStyle = "#f2f2f2";
    ctx.font = "bold 120px Yonoy";
    ctx.fillText(this.options.username, centerX - 220, centerY + 55);

    ctx.fillStyle = "#f2f2f2";
    ctx.font = "bold 50px Yonoy";
    ctx.fillText('#' + this.options.members.toString(), centerX + 500, centerY - 35);

    ctx.beginPath();
    ctx.arc(radius + 34, centerY, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await napi.loadImage(this.options.avatarURL);
    ctx.drawImage(avatar, 0, centerY - radius, radius * 2, radius * 2);

    return canvas.toBuffer("image/jpeg")
  }

  private figureWHDraw(template: string) {
    // (Template) Default values are the same
    if (template === Templates.WelcomeDefault) {
      this.data.filepath = Templates.WelcomeDefault;
      return { w: 1772, h: 633 };
    } else if (template === Templates.FarewellDefault) {
      this.data.filepath = Templates.FarewellDefault;
      return { w: 1772, h: 633 };
    }
    return { w: 0, h: 0 };
  }

  private build(options: CanvasBuilderOptions) {
    if (!options?.template)
      throw new Error("A template option is required at this moment.");
    return this.figureWHDraw(options.template);
  }
}
