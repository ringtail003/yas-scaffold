#!/usr/bin/env node

import { copyFile, mkdir, readFile, readdir } from "node:fs/promises";
import { cwd } from "node:process";
import * as readline from "readline";

const moduleRootDirectory = `${import.meta.dirname}/../`;
const projectRootDirectory = `${cwd()}/`;

(async function () {
  const subcommand =
    (process.argv.slice(2).filter((v) => v !== "yas")[0] || "").replace(
      "--",
      ""
    ) || "help";

  switch (subcommand) {
    case "init":
      break;
    case "update":
      break;
    case "help":
      console.log(
        "yas --init\n  設定ファイル・ソースコード一式をコピーします。\n\n"
      );
      console.log("yas --update\n  設定ファイルを更新します。\n\n");
      return;
    default:
      console.log(
        `サブコマンドが無効です。"yas --help" でヘルプが表示されます。`
      );
      return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    subcommand === "init"
      ? `YAS開発環境に必要なファイルをセットアップします。続行しますか？ Y/n `
      : `YAS開発環境の設定を更新します。続行しますか？ Y/n`,
    async (answer) => {
      rl.close();
      answer = answer.trim().toLowerCase();

      if (answer === "n") {
        return;
      }

      await copyConfigFiles([
        ".nvmrc",
        "tsconfig.json",
        "eslint.config.js",
        "rollup.config.js",
        ...(subcommand === "init" ? ["package.json"] : []),
      ]);

      await suggestInstallation();
      await suggestNpmScripts();
      await suggestNodeVersion();

      [
        "dist",
        "types",
        "shells",
        "lint",
        subcommand === "init" ? ["src"] : [],
      ].forEach((folder) => copyConfigFolder(folder));
    }
  );
})();

async function copyConfigFiles(configFileNames) {
  configFileNames.forEach(async (fileName) => {
    await copyFile(
      `${moduleRootDirectory}${fileName}`,
      `${projectRootDirectory}${fileName}`
    );
    console.log(`✅ 設定ファイルをコピーしました（${fileName}）`);
  });
}

async function suggestInstallation() {
  const required = await readFileAsJson(`${moduleRootDirectory}package.json`);
  const current = await readFileAsJson(`${projectRootDirectory}package.json`);
  const suggests = [];

  Object.keys(required["devDependencies"])
    .map((packageName) => {
      if (
        required["devDependencies"][packageName] !==
        current["devDependencies"][packageName]
      ) {
        suggests.push({
          name: packageName,
          current: current["devDependencies"][packageName] || null,
          required: required["devDependencies"][packageName],
        });
      }
    })
    .filter((packageName) => !!packageName);

  if (suggests.length === 0) {
    console.log("✅ package.json 'devDependencies' はすべて最新です");
    return;
  }

  console.log(
    "\n\x1b[41m package.json 'devDependencies' をインストールしてください \x1b[0m"
  );

  console.table(suggests);

  console.log(
    "npm install -D \\\n" +
      suggests.map((v) => `  ${v.name}@${v.required}`).join(" \\\n") +
      "\n"
  );
}

async function suggestNpmScripts() {
  const required = await readFileAsJson(`${moduleRootDirectory}package.json`);
  const current = await readFileAsJson(`${projectRootDirectory}package.json`);
  const suggests = [];

  (Object.keys(required["scripts"]) || [])
    .map((scriptName) => {
      if (required["scripts"][scriptName] !== current["scripts"][scriptName]) {
        suggests.push({
          name: scriptName,
          command: required["scripts"][scriptName],
        });
      }
    })
    .filter((packageName) => !!packageName);

  if (suggests.length === 0) {
    console.log("✅ package.json 'scripts' はすべて最新です");
    return;
  }

  console.log("\n\x1b[41m package.json 'scripts' を更新してください \x1b[0m");

  console.table(suggests);

  console.log(
    '"scripts": { \n' +
      suggests.map((v) => `  "${v.name}": "${v.command}"`).join(",\n") +
      "\n}\n"
  );
}

async function suggestNodeVersion() {
  const versions = {
    required: (await readFile(".nvmrc", "utf-8"))
      .replace("v", "")
      .replaceAll("\n", ""),
    current: process.versions.node,
  };

  if (versions.required === versions.current) {
    console.log(`✅ Node.js のバージョンは最新です（${versions.current}）`);
    return;
  }

  console.log("\n\x1b[41m Node.js のバージョンを更新してください \x1b[0m");
  console.table([versions]);
  console.log(`nvm use ${versions.required}\n\n`);
}

function getModuleRoot(path) {
  return `${import.meta.dirname}/../${path}`;
}

function getProjectRoot(path) {
  return `${cwd()}/${path}`;
}

async function readFileAsJson(filePath) {
  const file = await readFile(filePath, "utf-8");
  return JSON.parse(file);
}

async function copyConfigFolder(folderPath) {
  async function copyConfigFolderRecursive(source, dest) {
    await mkdir(dest, { recursive: true });
    const entries = await readdir(source, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = `${source}/${entry.name}`;
      const destPath = `${dest}/${entry.name}`;

      if (entry.isDirectory()) {
        await copyConfigFolderRecursive(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  }

  const sourcePath = `${moduleRootDirectory}${folderPath}`;
  const destPath = `${projectRootDirectory}${folderPath}`;

  await copyConfigFolderRecursive(sourcePath, destPath);

  console.log(`✅ ディレクトリをコピーしました（${folderPath}）`);
}
