#!/usr/bin/env node
const fs = require("fs");
const program = require("commander");
const replace = require('replace-in-file');

program
  .option('-o, --outpath <outpath>', 'The directory to put stub files into')
  .option('-l, --level <level>', 'The level of protection required: ULL, PALL, or PBMM')
  .action( () => {
    if (fs.existsSync(program.outpath)) {
      let buffer;
      let level;
      const outpath = program.outpath;

      try{
        buffer = fs.readFileSync("../docs/controls.json");
      } catch(e){
        console.log(e);
        process.exit(1);
      }
      const data = JSON.parse(buffer);
      if (["ULL", "PALL", "PBMM"].includes(program.level)) {
        level = program.level
      } else {
        level = "ULL"
      }

      const filtered = data.filter(c => c[level] == true)
      const ids = filtered.map(c => c.ID);


      ids.forEach((id) => {

        const sourcePath = "./src/template.yaml"
        const destinationPath = `${outpath}/${id}.yaml`;
        fs.copyFileSync(sourcePath, destinationPath);

        replace.sync(
          {
            files: destinationPath,
            from: /stub_id/g,
            to: id
          }
        );
      })

      process.exit(0);
    } else {
      console.error("Error: ", program.outpath, " does not exist")
      process.exit(1);
    }
  })
  .parse(process.argv);