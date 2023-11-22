### @zrcode/vite-zero-env-plugin

1. 替换 html 变量
2. 自定义 html 编译后的环境注释

```
npm i @zrcode/vite-zero-env-plugin
```

```javascript
 declare interface EnvDescParams {
  date: string;
  mode: string;
  version: string;
  name: string;
}
 declare interface ZeroEnvOptions {
  envPath?: string; //环境变量文件目录 默认为项目根目录
  indexPath?: string; //index.html文件目录 默认为项目根目录
  defaultDesc?: boolean;  //是否使用默认环境注释
  envDesc?: (params: EnvDescParams) => string;   //环境注释函数，返回字符串
}
declare function ZeroEnv(options?: ZeroEnvOptions): Plugin;
```

##### 转换前

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
       <env% Alo7-AI@Beta111 %env>
    </title>
</head>

<body>
    <div>
        <env% VITE_APP_SERVER %env>
    </div>

</body>

</html>
```

##### 转换后

```html
<!--zero-env 
    发布日期：2023/11/9 15:35:17
    项目名称：@zrcode/vite-zero-env-plugin
    环境：beta
    版本：1.1.3
     zero-env-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alo7-AI@Beta111</title>
  </head>

  <body>
    <div>sadasdasdas222a</div>
  </body>
</html>
```
