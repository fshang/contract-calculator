# 合同金额计算器 Chrome 扩展

这是一个Chrome浏览器扩展，用于计算合同金额、付款比例和税后金额。它可以帮助用户快速计算不同付款比例下的含税金额、税后金额和税额，并提供金额的中文大写表示。

## 功能特性

- 计算合同总金额的含税金额和税额
- 支持多个付款比例的输入和计算
- 自动计算每个付款比例对应的金额、税后金额和税额
- 提供金额的中文大写表示
- 结果可导出为文本文件

## 安装

1. 下载此仓库的ZIP文件或克隆仓库到本地
2. 打开Chrome浏览器，进入扩展程序页面（chrome://extensions/）
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择包含manifest.json文件的文件夹

## 使用方法

1. 点击Chrome浏览器工具栏中的扩展图标打开计算器
2. 输入合同金额和税率
3. 添加所需的付款比例（可以使用"添加付款比例"按钮添加多个）
4. 点击"计算"按钮获取结果
5. 如需导出结果，点击"导出结果"按钮

## 文件结构

- `manifest.json`: 扩展程序的配置文件
- `popup.html`: 扩展程序的主界面
- `popup.js`: 包含计算逻辑和用户交互的JavaScript文件
- `styles.css`: 样式表文件（未在提供的代码中显示，但在HTML中引用）

## 依赖项

此扩展程序不依赖任何外部库，仅使用原生JavaScript和Chrome扩展API。

## 贡献

欢迎提交问题和拉取请求。对于重大更改，请先开issue讨论您想要改变的内容。

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)

## 联系方式

项目链接: [https://github.com/yourusername/contract-amount-calculator](https://github.com/fshang/contract-amount-calculator)
