/**
 * ============================================================
 *  排行系统定义 rankings.ts（原 tiers.ts）
 * ============================================================
 *  ★ 本文件只定义「分类」和「职业」，档位数据写在武器总库 ★
 *  每把武器在 weaponDB.js 里直接写 rank 字段：
 *      rank: { pvp: 'T0', pve: 'T1', f2p: 'T2' }
 *  （不填的分类 = 该武器不出现在那个分类的排行里）
 *
 *  【分类】PVP / PVE / 平民 —— 各自独立排行
 *  【档位】T0 > T0.5 > T1 > T1.5 > T2 > T2.5 > T3
 *
 *  【日常操作】
 *  · 调档位：打开 weaponDB.js，改对应武器的 rank 值（如 'T1' → 'T0'）
 *  · 加武器入榜：在武器对象里补 rank 字段
 *  · 踢出某分类榜：把该分类的值删掉
 * ============================================================
 */

/** 职业定义（名称 + 图标） */
export interface RankClass {
  name: string
  icon: string
}

export const classes: RankClass[] = [
  { name: '刀锋', icon: '/images/classes/class-1.png' },
  { name: '双枪', icon: '/images/classes/class-2.png' },
  { name: '机枪', icon: '/images/classes/class-3.png' },
  { name: '烈焰', icon: '/images/classes/class-4.png' },
  { name: '导弹', icon: '/images/classes/class-5.png' },
  { name: '狙击', icon: '/images/classes/class-6.png' },
  { name: '医生', icon: '/images/classes/class-7.png' },
  { name: '榴弹', icon: '/images/classes/class-8.png' },
  { name: '工程师', icon: '/images/classes/class-9.png' },
  { name: '弓箭', icon: '/images/classes/class-10.png' },
]

/** 排行分类定义 */
export interface RankMode {
  key: string
  name: string
  icon: string
  desc: string
}

export const rankModes: RankMode[] = [
  { key: 'pvp', name: 'PVP', icon: '⚔️', desc: '玩家对战环境强度' },
  { key: 'pve', name: 'PVE', icon: '🛡️', desc: '副本清怪 / BOSS 输出' },
  { key: 'f2p', name: '平民', icon: '🪙', desc: '免费 / 低获取成本武器' },
]

/** 档位从强到弱（渲染顺序 + 校验用） */
export const tierOrder = ['T0', 'T0.5', 'T1', 'T1.5', 'T2', 'T2.5', 'T3']

/** 悬停时只显示这些「重要属性」（每职业 3~4 个，点进去才是全部） */
export const keyStats: Record<string, string[]> = {
  刀锋: ['移动速度', '攻击间隔', '最高伤害', '背刺距离'],
  烈焰: ['移动速度', '最近伤害', '灼烧时长', '火焰飞行距离'],
  医生: ['移动速度', '最近伤害', '射击间隔', '备弹'],
  双枪: ['移动速度', '最近伤害', '射击间隔', '载弹'],
  机枪: ['移动速度', '近距离伤害', '射击间隔', '载弹'],
  导弹: ['移动速度', '最高伤害', '范围比', '射击间隔'],
  狙击: ['移动速度', '爆头伤害-高', '射击间隔', '载弹'],
  榴弹: ['移动速度', '最高伤害', '范围比', '射击间隔'],
  工程师: ['移动速度', '射击间隔', '载弹', '换弹时间'],
  弓箭: ['移动速度', '单射爆头-近', '蓄力爆头-近', '射击间隔'],
}

/** 分类说明（悬停/空榜提示用） */
export const modeDesc: Record<string, string> = {
  pvp: '玩家对战环境强度',
  pve: '副本清怪 / BOSS 输出',
  f2p: '免费 / 低获取成本武器',
}
