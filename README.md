# 枪神纪武器排行榜 Wiki

基于 [VitePress](https://vitepress.dev) 构建的枪神纪武器强度资料站。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发预览

```bash
npm run dev
```

浏览器打开 http://localhost:5173 即可预览，修改文件自动热更新。

### 3. 一键生成武器详情页（加武器后跑）

```bash
npm run gen-weapons
```

自动读取武器总库，生成/更新所有武器的详情页，并清理旧文件。

### 4. 打包静态文件

```bash
npm run build
```

产物会生成在 `.vitepress/dist/` 目录，这就是可以上传到服务器的全部文件。

### 5. 本地预览打包结果

```bash
npm run preview
```

## 数据怎么改（日常维护）

武器数据采用「总库」结构，**武器信息只写一次，档位写在每把武器上**：

| 文件 | 作用 | 什么时候改 |
|------|------|-----------|
| `.vitepress/theme/data/weaponDB.js` | **武器总库**：名称/图标/属性/系列/评测 + `rank` 档位 | 加武器、改属性、**排档位** |
| `.vitepress/theme/data/tiers.ts` | 排行系统定义：分类/职业/重要属性 | 一般不用改 |
| `.vitepress/theme/data/catalog.ts` | 资料库·系定义（表头/说明） | 一般不用改 |

> 📖 完整图文教程看站点内「[排行榜使用说明](/guide/tier-guide)」。

## 目录结构

```
tswiki/
├── gen-weapons.mjs          # 一键生成武器详情页脚本（npm run gen-weapons）
├── .vitepress/
│   ├── config.mts           # 站点配置（导航、侧边栏、搜索）
│   └── theme/
│       ├── index.ts         # 自定义主题入口
│       ├── style.css        # 自定义样式
│       ├── data/
│       │   ├── weaponDB.js      # ★ 武器总库（每把武器只写一次，含 rank 档位）
│       │   ├── tiers.ts         # 排行系统定义（分类 PVP/PVE/平民 + 职业 + 重要属性）
│       │   └── catalog.ts       # 资料库·系定义
│       └── components/
│           ├── RankChart.vue      # 统一职业排行组件（档位 + 三分类）
│           └── WeaponCatalog.vue  # 武器资料库组件（卡片视图 + 表格对比）
├── index.md                 # 首页
├── tiers/                   # 排行榜页
│   ├── pvp.md
│   ├── pve.md
│   └── f2p.md
├── weapons/                 # 武器词条（详情页由 gen-weapons 自动生成）
│   ├── bladedancer/         # 刀锋
│   ├── dualpistol/          # 双枪
│   ├── heavy/               # 机枪
│   ├── flame/               # 烈焰
│   ├── missile/             # 导弹
│   ├── sniper/              # 狙击
│   ├── medic/               # 医生
│   ├── grenade/             # 榴弹
│   ├── engineer/            # 工程师
│   └── archer/              # 弓箭（新职业）
├── public/                  # 静态资源（图片等）
│   └── images/
│       ├── classes/         # 职业图标
│       └── weapons/         # 武器图标
└── guide/                   # 说明页
    ├── tier-guide.md        # 排行榜使用说明（数据怎么改）
    ├── tier-system.md
    ├── changelog.md
    └── contribute.md
```

## 部署到服务器

打包后把 `.vitepress/dist/` 目录里的所有文件上传到网站根目录即可，无需 PHP / 数据库。

### 推荐服务器

- 国内：阿里云/腾讯云轻量服务器 1核2G 起步
- 免备案：香港节点或 Cloudflare Pages 免费托管

## 多人协作

推荐使用 Git 管理内容：
1. 把项目推到 GitHub / Gitee 仓库
2. 其他管理员 clone 仓库本地修改
3. 通过 Pull Request 审核合并
4. 合并后重新打包部署
