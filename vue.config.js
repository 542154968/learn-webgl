const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@layout", resolve("src/layout"))
      .set("@views", resolve("src/views"))
      .set("@styl", resolve("src/assets/stylus"))
      .set("@js", resolve("src/assets/js"))
      .set("@images", resolve("src/assets/images"));
  }
};
