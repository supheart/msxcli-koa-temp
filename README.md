[![npm package](https://img.shields.io/npm/v/msxcli-koa-temp.svg)](https://www.npmjs.com/package/msxcli-koa-temp)

# Express 基础项目
生成一个可用便捷的koa后台项目，包含基本的上传和sql功能。

# 基本使用

```shell
npm install
npm start
```

# 目录结构

    express-temp // 项目根目录
    ├── doc // 数据库脚本和文档
    ├── src // 项目源代码
    │    ├── configs // 配置文件
    │    │     └── ...
    │    ├── init // 初始化文件
    │    │     └── ...
    │    ├── public // 服务器静态资源文件
    │    │     └── ...
    │    ├── router // 路由文件夹
    │    │     └── ...
    │    ├── utils // 工具库
    │    │     └── ...
    │    ├── views // html模版文件夹
    │    │     └── ...
    │    └── app.js // app 入口
    ├── www // 项目启动入口
    ├── .gitignore // git忽略跟踪的文件列表
    ├── .eslintrc // eslint配置文件，主要靠ide起作用
    ├── package.json // 包管理文件
    └── README.md // 项目说明文件 (本文件)

# 注意事项

router文件夹使用约定配置，只能有路由文件，不能有其他文件内容  
验证是用jsonwebtoken

# License
msxcli-koa-temp is MIT licensed.
