#!/usr/bin/env node
/* eslint-disable no-console */

import fs from 'fs-extra';
import path from 'path';

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

const relativePath = 'src/app/modules';

const generateModule = (moduleName: string): void => {
  const folderPath: string = path.join(process.cwd(), relativePath, moduleName);

  if (fs.existsSync(folderPath)) {
    console.error(
      `\x1b[31mError: Module "${moduleName}" already exists.\x1b[0m`,
    );
    process.exit(1);
  }

  const files: Record<string, string> = {
    [`${moduleName}.constant.ts`]: `export const ${capitalize(
      moduleName,
    )}Constants = {};`,
    [`${moduleName}.interface.ts`]: `export interface ${capitalize(
      moduleName,
    )}Interface {}`,
    [`${moduleName}.controller.ts`]: `export const ${capitalize(
      moduleName,
    )}Controller = {};`,
    [`${moduleName}.services.ts`]: `export const ${capitalize(
      moduleName,
    )}Service = {};`,
    [`${moduleName}.routes.ts`]: `import express from 'express';\n\nconst router = express.Router();\n\nrouter.get('/');\n\nexport const ${capitalize(
      moduleName,
    )}Routes = router;`,
    [`${moduleName}.validation.ts`]: `export const ${capitalize(
      moduleName,
    )}Validation = {};`,
    [`${moduleName}.model.ts`]: `import mongoose from 'mongoose';\n\nconst ${capitalize(
      moduleName,
    )}Schema = new mongoose.Schema({});\n\nexport const ${capitalize(
      moduleName,
    )} = mongoose.model('${capitalize(moduleName)}', ${capitalize(
      moduleName,
    )}Schema);`,
    [`${moduleName}.utils.ts`]: `export const ${capitalize(
      moduleName,
    )}Utils = {};`,
  };

  fs.ensureDirSync(folderPath);

  for (const [fileName, content] of Object.entries(files)) {
    const filePath: string = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`\x1b[32mCreated\x1b[0m ${filePath}`);
  }

  console.log(`\x1b[32mModule "${moduleName}" generated successfully.\x1b[0m`);
};

const moduleName: string | undefined = process.argv[2];

if (!moduleName) {
  console.error(
    '\x1b[31mPlease provide a module name. Usage: generate-module <module-name>\x1b[0m',
  );
  process.exit(1);
}

generateModule(moduleName);
