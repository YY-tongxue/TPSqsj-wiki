import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '枪神纪武器排行榜',
  description: '枪神纪全职业武器强度排行 Wiki · 版本驱动 · 社区共建',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    siteTitle: '🔫 枪神纪武器排行榜',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '职业排行',
        items: [
          { text: 'PVP 排行榜', link: '/tiers/pvp' },
          { text: 'PVE 排行榜', link: '/tiers/pve' },
          { text: '平民性价比排行榜', link: '/tiers/f2p' },
        ],
      },
      {
        text: '职业图鉴',
        items: [
          { text: '刀锋', link: '/weapons/bladedancer/' },
          { text: '双枪', link: '/weapons/dualpistol/' },
          { text: '机枪', link: '/weapons/heavy/' },
          { text: '烈焰', link: '/weapons/flame/' },
          { text: '导弹', link: '/weapons/missile/' },
          { text: '狙击', link: '/weapons/sniper/' },
          { text: '医生', link: '/weapons/medic/' },
          { text: '榴弹', link: '/weapons/grenade/' },
          { text: '工程师', link: '/weapons/engineer/' },
          { text: '弓箭', link: '/weapons/archer/' },
        ],
      },
      { text: '资料库', link: '/library/' },
      {
        text: '关于',
        items: [
          { text: '分级规则', link: '/guide/tier-system' },
          { text: '版本更新日志', link: '/guide/changelog' },
          { text: '参与共建', link: '/guide/contribute' },
        ],
      },
    ],

    sidebar: {
      '/tiers/': [
        {
          text: '排行榜',
          items: [
            { text: 'PVP 排行榜', link: '/tiers/pvp' },
            { text: 'PVE 排行榜', link: '/tiers/pve' },
            { text: '平民性价比排行榜', link: '/tiers/f2p' },
          ],
        },
      ],
      '/weapons/': [
        {
          text: '职业武器图鉴',
          collapsed: false,
          items: [
            {
              text: '🗡️ 刀锋',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/bladedancer/' },
              ],
            },
            {
              text: '🔫 双枪',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/dualpistol/' },
              ],
            },
            {
              text: '💥 机枪',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/heavy/' },
              ],
            },
            {
              text: '🔥 烈焰',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/flame/' },
              ],
            },
            {
              text: '🚀 导弹',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/missile/' },
              ],
            },
            {
              text: '🎯 狙击',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/sniper/' },
              ],
            },
            {
              text: '💉 医生',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/medic/' },
              ],
            },
            {
              text: '💣 榴弹',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/grenade/' },
              ],
            },
            {
              text: '🛠️ 工程师',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/engineer/' },
              ],
            },
            {
              text: '🏹 弓箭',
              collapsed: true,
              items: [
                { text: '职业概览', link: '/weapons/archer/' },
              ],
            },
          ],
        },
      ],
      '/library/': [
        {
          text: '武器资料库',
          items: [
            { text: '🗂️ 资料库首页', link: '/library/' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '使用说明',
          items: [
            { text: '📖 排行榜使用说明', link: '/guide/tier-guide' },
            { text: '分级规则说明', link: '/guide/tier-system' },
            { text: '版本更新日志', link: '/guide/changelog' },
            { text: '参与共建指南', link: '/guide/contribute' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索武器', buttonAriaLabel: '搜索武器' },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除查询',
                footer: { selectText: '选择', navigateText: '切换' },
              },
            },
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    externalLinkIcon: true,
  },
})
