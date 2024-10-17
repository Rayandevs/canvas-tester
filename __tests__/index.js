const { CanvaBuilder, Templates } = require("../dist/index");

(async () => {
  const canvas = new CanvaBuilder({
    template: Templates.WelcomeDefault,
  }).set({ username: "0sapphy", members: 2000, avatarURL: "https://cdn.discordapp.com/avatars/1143607268781342893/d67859351e0aa55218feb4e9ce0e8caa.png?size=1024" });

  const ctx = await canvas.draw(canvas.canvas);
  console.log(canvas, ctx);

  require("node:fs").writeFileSync("./__tests__/gen.jpeg", ctx);
})();
