import { Plugin } from "vite";
export declare interface EnvDescParams {
  date: string;
  mode: string;
  version: string;
  name: string;
}
export declare interface ZeroEnvOptions {
  envPath?: string;
  indexPath?: string;
  defaultDesc?: boolean;
  envDesc?: (params: EnvDescParams) => string;
}
declare function ZeroEnv(options?: ZeroEnvOptions): Plugin;
export { ZeroEnv };
