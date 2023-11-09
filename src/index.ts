import type { Plugin } from "vite";
import { EnvDescParams, ZeroEnvOptions } from "./types/index.d";
export function ZeroEnv(
  options: ZeroEnvOptions = {
    envPath: ".",
    indexPath: "./index.html",
    defaultDesc: false,
    envDesc: () => "",
  }
): Plugin {
  let userConfig = {};
  let configEnv: any = {};
  if (!options.envPath) options.envPath = ".";
  if (!options.indexPath) options.indexPath = "./index.html";
  return {
    name: "vite-zero-env-plugin",
    config(config: any, env: any) {
      userConfig = config;
      configEnv = env;
    },
    buildStart() {
      const _env = parseEnv(options.envPath + `/.env.${configEnv.mode}`);
      injectEnv(_env, options.indexPath);
      injectEnvDesc.call(
        this,
        options.indexPath,
        options.defaultDesc ? injectDefaultEnvDesc : options.envDesc,
        userConfig,
        configEnv
      );
    },
  };
}

/**
 * 解析.env文件中的环境变量
 * @param envPath 环境变量文件路径
 * @returns 环境变量对象
 */
function parseEnv(envPath: string) {
  const fs = require("fs");
  const envContents = fs.readFileSync(envPath, "utf-8");
  // 解析.env文件中的环境变量
  const envVariables = envContents
    .split("\n")
    // @ts-ignore
    .filter((line) => line.trim() !== "")
    // @ts-ignore
    .reduce((env, line) => {
      const [key, value] = line.split("=");
      //@ts-ignore
      env[key.trim()] = value.trim();
      return env;
    }, {});
  return envVariables;
}

/**
 * 环境变量注入到index.html 模板中
 * @param envi 环境变量对象
 * @param indexPath  index.html文件路径
 */
function injectEnv(envi: any, indexPath: string) {
  const fs = require("fs");
  const indexContents = fs.readFileSync(indexPath, "utf-8");
  const injectIndexContents = indexContents.replace(
    /<env%(.*)%env>/g,
    (match: any, p1: any) => {
      console.log(`
     zero-env-plugin: inject ${p1} to index.html
    `);
      return envi[p1.trim()] || p1;
    }
  );
  fs.writeFileSync(indexPath, injectIndexContents);
}

/**
 * 注入环境描述
 */

function injectEnvDesc(
  this: any,
  indexPath: string,
  envDesc: (params: EnvDescParams) => string = () => "",
  config: any,
  env: any
) {
  const fs = require("fs");
  const packageContents = fs.readFileSync("./package.json", "utf-8");
  const { version, name } = JSON.parse(packageContents);
  let desc = envDesc({
    date: new Date().toLocaleString(),
    mode: env.mode,
    version,
    name,
  });
  if (!desc) return;
  desc = `<!--zero-env ${desc} zero-env-->`;
  const indexContents = fs.readFileSync(indexPath, "utf-8");
  // 如何<!DOCTYPE html>前已经存在注入的内容，则只替换注入的内容
  const match = indexContents.match(/<!--zero-env([\s\S]*?)zero-env-->/);
  let injectIndexContents = "";
  if (match) {
    injectIndexContents = indexContents.replace(match[0], desc);
  } else {
    injectIndexContents = indexContents.replace(
      /<!DOCTYPE html>/g,
      desc + "\n<!DOCTYPE html>"
    );
  }
  fs.writeFileSync(indexPath, injectIndexContents);
}

/**
 * defaultDesc为true时，使用默认的环境描述
 */
function injectDefaultEnvDesc(params: EnvDescParams) {
  return `
    发布日期：${params.date}
    项目名称：${params.name}
    环境：${params.mode}
    版本：${params.version}
    `;
}
