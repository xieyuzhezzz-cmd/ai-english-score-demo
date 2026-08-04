# AI英语提分训练系统 Demo

这是一个面向英语辅导机构老板展示的销售型 Demo，用 React + Vite + Tailwind CSS 构建，所有业务数据均来自本地 JSON 模拟文件。

## 功能页面

- 首页：展示产品定位、核心指标与学习闭环。
- 学生测评：模拟张同学的成绩输入与 AI 分析报告。
- AI训练：展示 environment 的词根、记忆法、例句和发音播放。
- 能力检测：模拟听音默写、AI 判断和多维掌握评分。
- 成长报告：展示 7 天训练后的词汇量与正确率变化。
- 家长报告：微信报告风格，便于机构做续费沟通。
- 机构合作：展示机构价值与 30 天测试合作入口。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署到 Vercel

将项目导入 Vercel 后使用默认 Vite 配置即可：

- Build Command: `npm run build`
- Output Directory: `dist`
