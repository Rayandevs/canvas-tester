import napi from '@napi-rs/canvas';

declare enum Templates {
    WelcomeDefault = "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Welcome%20Card%20Design%20%231.png",
    FarewellDefault = "https://raw.githubusercontent.com/Rayandevs/canvas-assets/refs/heads/main/Farewell%20Design%20%231.png"
}

interface CanvasBuilderOptions {
  template?: Templates;
}

interface CanvaBuilderRequired {
    username: string;
    members: number | string;
    avatarURL: string;
}
declare class CanvaBuilder {
    canvas: napi.Canvas;
    options: CanvaBuilderRequired | null;
    private data;
    constructor(options: CanvasBuilderOptions);
    set(required: CanvaBuilderRequired): this;
    draw(canvas: napi.Canvas): Promise<Buffer>;
    private figureWHDraw;
    private build;
}

/**
 * The current version that you are currently using.
 *
 * Note to developers: This needs to explicitly be `string` so it is not typed as a "const string" that gets injected by esbuild
 */
declare const version: string;

export { CanvaBuilder, Templates, version };
