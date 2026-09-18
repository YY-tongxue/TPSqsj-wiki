/**
 * ============================================================
 *  ★ 武器总库 weaponDB.js —— 全站唯一的武器数据源 ★
 * ============================================================
 *  所有武器的基础信息只在这里写一次，排行榜 / 档位图 / 详情页
 *  都自动从本文件读取，其他地方不用重复填武器信息。
 *
 *  【每把武器的字段】
 *  id       : 武器唯一英文标识（对象键），生成详情页文件名、链接都用它
 *  name     : 武器名称
 *  classKey : 所属职业的英文标识（刀锋=bladedancer 等，决定详情页放哪个目录）
 *  icon     : 图标路径，图片放 public/images/weapons/ 下，填 /images/weapons/文件名
 *  desc     : 一句话评价（榜单行 / 档位图显示）
 *  stats    : 属性表 { 属性名: 属性值 }，悬停显示重要属性、点击详情页显示全部
 *  detail   : 详细评测（可选）。不填时详情页会提示"可编辑补充"
 *  category : 武器分类标签（近战/远程/近程/辅助/部署…），排行榜、档位图、详情页都会显示
 *  rank     : 排行档位 { pvp: 'T1', pve: 'T0', f2p: 'T2' }，不填的分类=不出现在该榜
 *  family   : 官方系列名（可选，如 '马卡洛夫'）。同系列的武器会自动在详情页
 *             生成「系列合集」互链，资料库也会显示系列标签。不填不显示。
 *
 *  【职业英文标识对照】
 *  刀锋=bladedancer  双枪=dualpistol  机枪=heavy  烈焰=flame  导弹=missile
 *  狙击=sniper  医生=medic  榴弹=grenade  工程师=engineer
 *
 *  【添加新武器的完整步骤】
 *  1. 把图标放进 public/images/weapons/
 *  2. 在下面加一个对象（抄任意一把武器的格式），并填上 rank 档位
 *  3. 运行  npm run gen-weapons  自动生成/更新详情页
 *
 *  【排档位】
 *  · 改 rank 里的值即可（T0 > T0.5 > T1 > T1.5 > T2 > T2.5 > T3）
 *  · 同档位内武器先后顺序 = 强弱顺序
 *  · 详细说明看 guide/tier-guide.md
 * ============================================================
 */


/* ============================================================
  资料库武器（来自官方属性表）——按系归档，id 前缀 lib-，全库唯一序号
============================================================ */

export const weaponDB = {

  /* ============================================================
    资料库武器（官方属性表采集）——刀锋系
  ============================================================ */

  /* ===== 刀锋 · 背刺系（23 把 · 完整属性） ===== */
  'lib-bladedancer-001': {
    name: '马卡洛夫之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    family: '马卡洛夫',
    category: '背刺系',
    icon: '/images/weapons/makarov-blade.png',
    desc: '背刺系 · 官方属性数据',
    rank: { pvp: 'T3', pve: 'T3', f2p: 'T3' },
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.54秒', '攻击距离': '90码', '最低伤害': '36点', '最高伤害': '40点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
    detail:
      '马卡洛夫军工推出的制式刺刀，刀身笔直便于突刺，是新手注册即可获得的入门武器。\n' +
      '· 定位：入门近战，练手感用\n' +
      '· 优势：获取零门槛，背刺判定稳定\n' +
      '· 短板：面板偏低，后期需要更换高阶武器',
  },
  'lib-bladedancer-002': {
    name: '无名',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    rank: { pvp: 'T3', pve: 'T3', f2p: 'T2' },
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.75秒', '攻击距离': '98码', '最低伤害': '43点', '最高伤害': '45点', '背刺角度(敌背)': '168.4°', '背刺角度(朝向)': '27.5°', '背刺距离': '98码' },
  },
  'lib-bladedancer-003': {
    name: '大马士革之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    rank: { pvp: 'T2', pve: 'T2', f2p: 'T2' },
    stats: { '装备时间': '0.50秒', '移动速度': '816点', '移速比率': '1.02倍', '攻击间隔': '0.54秒', '攻击距离': '90码', '最低伤害': '36点', '最高伤害': '40点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-004': {
    name: '漆夜之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.73秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-005': {
    name: '白影之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.60秒', '攻击距离': '90码', '最低伤害': '49点', '最高伤害': '54点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-006': {
    name: '玛雅之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.60秒', '攻击距离': '90码', '最低伤害': '39点', '最高伤害': '43点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '96码' },
  },
  'lib-bladedancer-007': {
    name: '暗影之刺',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.50秒', '攻击距离': '90码', '最低伤害': '34点', '最高伤害': '38点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-008': {
    name: '恶魔之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.76秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-009': {
    name: '诺森兰战术刀',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.60秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-010': {
    name: '苍蓝之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.60秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-011': {
    name: '黑金玛雅之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.60秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-012': {
    name: '白龙之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.45秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.60秒', '攻击距离': '100码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '160.4°', '背刺角度(朝向)': '25.8°', '背刺距离': '96码' },
  },
  'lib-bladedancer-013': {
    name: '夜莺之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    rank: { pvp: 'T1.5', pve: 'T1.5', f2p: 'T1.5' },
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.60秒', '攻击距离': '96码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '96码' },
  },
  'lib-bladedancer-014': {
    name: '圣夜梦魇之刺',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.60秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-015': {
    name: '漆夜之殇',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    rank: { pvp: 'T1', pve: 'T1', f2p: 'T1' },
    stats: { '装备时间': '0.50秒', '移动速度': '828点', '移速比率': '1.035倍', '攻击间隔': '0.60秒', '攻击距离': '91码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '91码' },
  },
  'lib-bladedancer-016': {
    name: '黄金战术刀',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    rank: { pvp: 'T0.5', pve: 'T0.5', f2p: 'T0.5' },
    stats: { '装备时间': '0.50秒', '移动速度': '844点', '移速比率': '1.055倍', '攻击间隔': '0.60秒', '攻击距离': '90码', '最低伤害': '43点', '最高伤害': '53点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-017': {
    name: '管家利刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.70秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-018': {
    name: '诺森兰战术刀-幻影',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '858点', '移速比率': '1.073倍', '攻击间隔': '0.625秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-019': {
    name: '漆夜之刃-A',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.70秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-020': {
    name: '黄金漆夜之刃EX',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '816点', '移速比率': '1.02倍', '攻击间隔': '0.70秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-021': {
    name: '金魔齿-苍穹刺客',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    stats: { '装备时间': '0.50秒', '移动速度': '800点', '移速比率': '1.00倍', '攻击间隔': '0.70秒', '攻击距离': '88码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '88码' },
  },
  'lib-bladedancer-022': {
    name: '荣耀之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    rank: { pvp: 'T0', pve: 'T0', f2p: 'T0' },
    stats: { '装备时间': '0.50秒', '移动速度': '936点', '移速比率': '1.17倍', '攻击间隔': '0.60秒', '攻击距离': '90码', '最低伤害': '38点', '最高伤害': '42点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },
  'lib-bladedancer-023': {
    name: '火麒麟-断魂之刃',
    classKey: 'bladedancer',
    series: '背刺系',
    category: '背刺系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '背刺系 · 官方属性数据',
    rank: { pvp: 'T1', pve: 'T1', f2p: 'T1' },
    stats: { '装备时间': '0.40秒', '移动速度': '805点', '移速比率': '1.01倍', '攻击间隔': '0.50秒', '攻击距离': '90码', '最低伤害': '41点', '最高伤害': '44点', '背刺角度(敌背)': '179.9°', '背刺角度(朝向)': '29.8°', '背刺距离': '90码' },
  },

  /* ===== 刀锋 · 格斗系（35 把 · 名录，属性待补） ===== */
  'lib-bladedancer-024': {
    name: '马卡洛夫之格斗刀',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-025': {
    name: '龙渊刀',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-026': {
    name: '烈焰暗物质格斗刀',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-027': {
    name: '红玛瑙格斗刀',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-028': {
    name: '死亡之刀',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-029': {
    name: '忍者之刀',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-030': {
    name: '冰亡',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-040': {
    name: '教官训练之刃(初级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-041': {
    name: '教官训练之刃(中级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-042': {
    name: '教官训练之刃(高级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-043': {
    name: '使者之刀(初级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-044': {
    name: '使者之刀(中级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-045': {
    name: '使者之刀(高级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-046': {
    name: '光辉使者之刀(初级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-047': {
    name: '光辉使者之刀(中级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },
  'lib-bladedancer-048': {
    name: '光辉使者之刀(高级)',
    classKey: 'bladedancer',
    series: '格斗系',
    category: '格斗系',
    icon: '/images/weapons/lib-weapon.svg',
    desc: '格斗系 · 属性待补',
    stats: { '段位': '待补' },
  },

  /* ============ 烈焰 · 火焰系（0 把） ============ */

  /* ============ 烈焰 · 冰封系（0 把） ============ */

  /* ============ 医生 · 治疗系（0 把） ============ */

  /* ============ 医生 · 护盾系（0 把） ============ */

  /* ============ 双枪 · 手枪系（0 把） ============ */

  /* ============ 双枪 · 微冲系（0 把） ============ */

  /* ============ 机枪 · 重型系（0 把） ============ */
  'lib-heavy-001': {
    name: '马卡洛夫之榴弹枪',
    classKey: 'heavy',
    series: '重型系',
    category: '重型系',
    icon: '/images/weapons/makarov-heavy.png',
    desc: '重型系 · 官方属性数据',
    rank: { pvp: 'T3', pve: 'T3', f2p: 'T3' },
    stats: {
      '基础伤害': '440', '射速': '800', '预热速度': '425', '稳定': '400', '便携能力': '456',
      '最高伤害': '110', '最小伤害': '44', '弹药量': '400', '备单':'1200','每次换单': '1发',
      '特殊蓝字': '无'
    },
      detail:
      '· 短板：面板偏低，后期需要更换高阶武器',
    },
  /* ============ 机枪 · 轻便系（0 把） ============ */

  /* ============ 导弹 · 范围系（0 把） ============ */

  /* ============ 导弹 · 追踪系（0 把） ============ */

  /* ============ 狙击 · 重狙系（0 把） ============ */

  /* ============ 狙击 · 连狙系（0 把） ============ */

  /* ============ 榴弹 · 榴弹系（0 把） ============ */
  'lib-grenade-001': {
    name: '马卡洛夫之榴弹枪',
    classKey: 'grenade',
    series: '榴弹系',
    category: '榴弹系',
    icon: '/images/weapons/makarov-grenade.png',
    desc: '榴弹系 · 官方属性数据',
    rank: { pvp: 'T3', pve: 'T3', f2p: 'T3' },
    stats: {
      '基础伤害': '585', '射速': '371', '炮弹速度': '640', '杀伤范围': '560', '便携能力': '496',
      '最高伤害': '110', '最小伤害': '44', '弹药量': '4', '备单':'20','每次换单': '1发',
      '榴弹跳': '1发', '特殊蓝字': '无'
    },
    detail:
      '· 短板：面板偏低，后期需要更换高阶武器',
  },
  /* ============ 榴弹 · 粘弹系（0 把） ============ */
 'lib-grenade-002': {
    name: '马卡洛夫之粘弹枪',
    classKey: 'grenade',
    series: '粘弹系',
    category: '粘弹系',
    icon: '/images/weapons/makarov-grenade.png',
    desc: '粘弹系 · 官方属性数据',
    rank: { pvp: 'T3', pve: 'T3', f2p: 'T3' },
    stats: {
      '基础伤害': '612', '射速': '371', '炮弹速度': '568', '杀伤范围': '560', '便携能力': '496',
      '最高伤害': '110', '最小伤害': '44', '弹药量': '6', '备单':'32','每次换单': '1发',
      '榴弹跳': '1发', '特殊蓝字': '无'
    },
  detail:
  '· 短板：面板偏低，后期需要更换高阶武器',
},
  /* ============ 工程师 · 霰弹枪（0 把） ============ */

  /* ============ 工程师 · 声波枪（0 把） ============ */

  /* ============ 弓箭 · 贯穿系（0 把） ============ */

}

/** 职业英文标识 → 中文名（详情页/组件用） */
export const classNames = {
  bladedancer: '刀锋',
  dualpistol: '双枪',
  heavy: '机枪',
  flame: '烈焰',
  missile: '导弹',
  sniper: '狙击',
  medic: '医生',
  grenade: '榴弹',
  engineer: '工程师',
}

/** 根据武器 id 生成详情页地址（组件里直接用这个拼链接） */
export function weaponLink(id) {
  const w = weaponDB[id]
  if (!w) return ''
  return `/weapons/${w.classKey}/${id}`
}