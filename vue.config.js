const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const Timestamp = new Date().getTime();

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "民联灵工-监管端";
      return args;
    });
    if (process.env.NODE_ENV === "production") {
      // 给js和css配置版本号
      config.output.filename("js/[name]." + Timestamp + ".js").end();
      config.output.chunkFilename("js/[name]." + Timestamp + ".js").end();
      config.plugin("extract-css").tap((args) => [
        {
          filename: `css/[name].${Timestamp}.css`,
          chunkFilename: `css/[name].${Timestamp}.css`,
        },
      ]);
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
