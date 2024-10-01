//https://www.electron.build/configuration/configuration#afterpack
const LOCALES = ["en-US.pak", "ru.pak"];

exports.default = async function (context) {
  // console.log(context);
  const fs = require("fs");
  const localeDir = `${context.appOutDir}/locales/`;

  fs.readdir(localeDir, function (err, files) {
    //files is array of filenames (basename form)
    if (!(files && files.length)) {
      return;
    }
    for (const file of files) {
      if (LOCALES.includes(file)) {
        continue;
      }
      fs.unlinkSync(localeDir + file);
    }
  });
};
