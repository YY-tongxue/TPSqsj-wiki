<!-- ============================================================
  统一职业排行组件（RankChart）
  ------------------------------------------------------------
  「职业图鉴的档位排行」和「职业排行的 PVP/PVE/平民」合并后的统一排行。
  数据全部来自 weaponDB.js 每把武器的 rank 字段：
      rank: { pvp: 'T1', pve: 'T0', f2p: 'T2' }

  用法：
  <RankChart />                    → 全职业 · PVP 档位（可切职业）
  <RankChart mode="pve" />         → 全职业 · PVE 档位（锁定分类）
  <RankChart cls="榴弹" />         → 单职业 · 三分类切换

  交互：
  · 悬停武器 → 只显示重要属性（keyStats），点进去才看全部
  · 点击武器 → 详情弹窗（全部属性 + 完整词条链接）
============================================================ -->
<template>
  <div class="rank-chart">
    <!-- ══ 分类切换（mode 锁定时不显示） ══ -->
    <div v-if="!lockMode" class="rc-modes">
      <button
        v-for="m in rankModes"
        :key="m.key"
        class="rc-mode-btn"
        :class="{ active: activeMode === m.key }"
        @click="activeMode = m.key"
      >
        <span class="rc-mode-icon">{{ m.icon }}</span>
        {{ m.name }}
      </button>
    </div>

    <!-- ══ 职业切换（cls 锁定时不显示） ══ -->
    <div v-if="!props.cls" class="rc-classes">
      <button
        v-for="c in classes"
        :key="c.name"
        class="rc-class-btn"
        :class="{ active: activeClass === c.name }"
        @click="activeClass = c.name"
      >
        <img :src="c.icon" :alt="c.name" class="rc-class-icon" />
        <span>{{ c.name }}</span>
      </button>
    </div>

    <!-- ══ 当前分类 + 职业信息条 ══ -->
    <div class="rc-head">
      <div class="rc-head-title">
        {{ activeClass }} · {{ currentMode.name }}
        <span class="rc-head-desc">{{ currentMode.desc }}</span>
      </div>
      <div class="rc-head-meta">{{ weaponCount }} 把武器 · 档位从强到弱</div>
    </div>

    <!-- ══ 档位分组 ══ -->
    <div v-if="tiered.length" class="rc-tiers">
      <div
        v-for="group in tiered"
        :key="group.tier"
        class="rc-tier"
        :class="'rc-tier-' + tierClass(group.tier)"
      >
        <div class="rc-tier-label">
          <span class="rc-tier-badge">{{ group.tier }}</span>
        </div>
        <div class="rc-tier-weapons">
          <div
            v-for="(w, i) in group.weapons"
            :key="w.id"
            class="rc-weapon"
            @mouseenter="showTip(w, $event)"
            @mouseleave="hideTip"
            @click="openDetail(w)"
          >
            <span class="rc-rank-num">{{ i + 1 }}</span>
            <img :src="w.icon" :alt="w.name" class="rc-weapon-icon" />
            <div class="rc-weapon-info">
              <div class="rc-weapon-name-line">
                <span v-if="w.category" class="cat-badge">{{ w.category }}</span>
                <span class="rc-weapon-name">{{ w.name }}</span>
              </div>
              <div v-if="w.desc" class="rc-weapon-desc">{{ w.desc }}</div>
            </div>
            <span class="rc-hint">点击看详情</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ 空榜提示 ══ -->
    <div v-else class="rc-empty">
      该职业「{{ currentMode.name }}」暂无排名数据。
      <br />在 <code>weaponDB.js</code> 给武器加上 <code>rank: { pvp: 'T1' }</code> 即自动上榜。
    </div>

    <!-- ══ 悬停浮层（页面级，不会被裁剪） ══ -->
    <Teleport to="body">
      <div
        v-if="tip"
        class="rc-float-tip"
        :class="{ up: tip.up }"
        :style="{ left: tip.x + 'px', top: tip.y + 'px' }"
        @mouseenter="cancelHide"
        @mouseleave="hideTip"
      >
        <div class="rc-tt-title">{{ tip.weapon.name }}</div>
        <div v-for="k in keyStatsOf(tip.weapon)" :key="k" class="rc-tt-row">
          <span class="rc-tt-key">{{ k }}</span>
          <span class="rc-tt-value">{{ tip.weapon.stats[k] }}</span>
        </div>
        <div v-if="!keyStatsOf(tip.weapon).length" class="rc-tt-empty">属性待补</div>
        <div class="rc-tt-tip">🖱️ 点击查看全部属性</div>
      </div>
    </Teleport>

    <!-- ══ 详情弹窗（全部属性） ══ -->
    <transition name="modal">
      <div v-if="detailWeapon" class="rc-modal-mask" @click.self="closeDetail">
        <div class="rc-modal">
          <button class="rc-modal-close" @click="closeDetail" aria-label="关闭">✕</button>
          <div class="rc-modal-head">
            <img :src="detailWeapon.icon" :alt="detailWeapon.name" class="rc-modal-icon" />
            <div>
              <div class="rc-modal-title-line">
                <span v-if="detailWeapon.category" class="cat-badge">{{ detailWeapon.category }}</span>
                <span class="rc-modal-title">{{ detailWeapon.name }}</span>
                <span class="rc-modal-tier">{{ detailWeapon.rank[activeMode] }}</span>
              </div>
              <div v-if="detailWeapon.desc" class="rc-modal-desc">{{ detailWeapon.desc }}</div>
            </div>
          </div>
          <div v-if="detailWeapon.detail" class="rc-modal-detail">{{ detailWeapon.detail }}</div>
          <div class="rc-modal-stats">
            <div v-for="(value, key) in detailWeapon.stats" :key="key" class="rc-modal-row">
              <span class="rc-modal-key">{{ key }}</span>
              <span class="rc-modal-value">{{ value }}</span>
            </div>
          </div>
          <a v-if="detailWeapon.link" :href="detailWeapon.link" class="rc-modal-link">查看完整词条 →</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { classes, rankModes, tierOrder, keyStats } from '../data/tiers'
// @ts-ignore weaponDB 是纯 JS 数据文件
import { weaponDB, weaponLink, classNames } from '../data/weaponDB.js'

const props = defineProps<{ mode?: string; cls?: string }>()

/** 分类锁定（mode 传了就不显示分类 tab） */
const lockMode = !!props.mode
/** 职业锁定（cls 传了就不显示职业 tab） */
const lockCls = !!props.cls

const activeMode = ref(props.mode ?? 'pvp')
const activeClass = ref(props.cls ?? classes[0].name)

const currentMode = computed(() => rankModes.find((m) => m.key === activeMode.value) ?? rankModes[0])

/** 当前职业的 classKey（weaponDB 里的英文标识） */
const activeClassKey = computed(() => {
  for (const [key, name] of Object.entries(classNames)) {
    if (name === activeClass.value) return key
  }
  return ''
})

/** 重要属性键（该职业在 keyStats 里定义的，悬停只显示这些） */
function keyStatsOf(w: any): string[] {
  const keys = keyStats[activeClass.value] ?? []
  const matched = keys.filter((k) => w.stats && w.stats[k] != null)
  if (matched.length) return matched
  // 回退：该武器没有职业标准属性键时，显示 stats 前 3 个
  return (w.stats ? Object.keys(w.stats) : []).slice(0, 3)
}

/** 按档位分组（T0 → T3，档位内保持武器原顺序） */
const tiered = computed(() => {
  const mode = activeMode.value
  const map: Record<string, any[]> = {}
  for (const [id, w] of Object.entries(weaponDB) as any) {
    const rank = w.rank?.[mode]
    if (!rank || w.classKey !== activeClassKey.value) continue
    ;(map[rank] = map[rank] || []).push({ id, ...w, rank: w.rank, link: weaponLink(id) })
  }
  // 按 tierOrder 排序，无 rank 的武器不出现
  return tierOrder
    .filter((t) => map[t]?.length)
    .map((t) => ({ tier: t, weapons: map[t] }))
})

/** T0.5 → T0p5（CSS 类名用） */
function tierClass(tier: string): string {
  return tier.replace('.', 'p')
}

/** 当前榜武器总数 */
const weaponCount = computed(() => tiered.value.reduce((sum, g) => sum + g.weapons.length, 0))

/* ===== 悬停浮层（fixed 定位，自动判断上下，永不被裁剪） ===== */
const tip = ref<{ weapon: any; x: number; y: number; up: boolean } | null>(null)
let hideTimer: ReturnType<typeof setTimeout> | null = null
const TIP_W = 260 // 浮层宽度（px）
const TIP_H = 150 // 估算高度（px），用于判断向上/向下

function showTip(w: any, e: MouseEvent) {
  const card = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const gap = 8
  // 下方空间不足 → 显示在上方
  const up = card.bottom + gap + TIP_H > window.innerHeight
  const x = Math.max(10, Math.min(card.left, window.innerWidth - TIP_W - 10))
  const y = up ? card.top - gap - TIP_H : card.bottom + gap
  tip.value = { weapon: w, x, y, up }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function hideTip() {
  // 稍微延迟，允许鼠标移到浮层上
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    tip.value = null
  }, 120)
}

function cancelHide() {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

/** 详情弹窗 */
const detailWeapon = ref<any>(null)
function openDetail(w: any) {
  detailWeapon.value = w
}
function closeDetail() {
  detailWeapon.value = null
}
</script>

<style scoped>
.rank-chart {
  margin: 16px 0;
}

/* ===== 分类切换 ===== */
.rc-modes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.rc-mode-btn {
  padding: 6px 16px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.rc-mode-btn:hover {
  border-color: var(--ts-accent, #f59e0b);
}
.rc-mode-btn.active {
  background: linear-gradient(135deg, var(--ts-accent, #f59e0b), #f97316);
  border-color: transparent;
  color: #fff;
}
.rc-mode-icon {
  margin-right: 3px;
}

/* ===== 职业切换 ===== */
.rc-classes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.rc-class-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px 5px 7px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.rc-class-btn:hover {
  border-color: var(--ts-accent, #f59e0b);
}
.rc-class-btn.active {
  background: linear-gradient(135deg, var(--ts-accent, #f59e0b), #f97316);
  border-color: transparent;
  color: #fff;
}
.rc-class-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--vp-c-divider);
}

/* ===== 信息条 ===== */
.rc-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 16px;
  margin-bottom: 14px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.rc-head-title {
  font-size: 16px;
  font-weight: 800;
}
.rc-head-desc {
  margin-left: 8px;
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}
.rc-head-meta {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* ===== 档位行 ===== */
.rc-tiers {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rc-tier {
  display: flex;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}
.rc-tier-label {
  flex-shrink: 0;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.rc-tier-badge {
  font-size: 18px;
  font-weight: 900;
}

/* 档位配色 */
.rc-tier-T0 { background: linear-gradient(90deg, rgba(239, 68, 68, 0.12), transparent 45%); }
.rc-tier-T0 .rc-tier-badge { color: #ef4444; }
.rc-tier-T0 .rc-tier-label { background: rgba(239, 68, 68, 0.10); }
.rc-tier-T0p5 { background: linear-gradient(90deg, rgba(249, 115, 22, 0.12), transparent 45%); }
.rc-tier-T0p5 .rc-tier-badge { color: #f97316; }
.rc-tier-T0p5 .rc-tier-label { background: rgba(249, 115, 22, 0.10); }
.rc-tier-T1 { background: linear-gradient(90deg, rgba(59, 130, 246, 0.12), transparent 45%); }
.rc-tier-T1 .rc-tier-badge { color: #3b82f6; }
.rc-tier-T1 .rc-tier-label { background: rgba(59, 130, 246, 0.10); }
.rc-tier-T1p5 { background: linear-gradient(90deg, rgba(20, 184, 166, 0.12), transparent 45%); }
.rc-tier-T1p5 .rc-tier-badge { color: #14b8a6; }
.rc-tier-T1p5 .rc-tier-label { background: rgba(20, 184, 166, 0.10); }
.rc-tier-T2 { background: linear-gradient(90deg, rgba(34, 197, 94, 0.12), transparent 45%); }
.rc-tier-T2 .rc-tier-badge { color: #22c55e; }
.rc-tier-T2 .rc-tier-label { background: rgba(34, 197, 94, 0.10); }
.rc-tier-T2p5 { background: linear-gradient(90deg, rgba(234, 179, 8, 0.12), transparent 45%); }
.rc-tier-T2p5 .rc-tier-badge { color: #eab308; }
.rc-tier-T2p5 .rc-tier-label { background: rgba(234, 179, 8, 0.10); }
.rc-tier-T3 { background: linear-gradient(90deg, rgba(148, 163, 184, 0.12), transparent 45%); }
.rc-tier-T3 .rc-tier-badge { color: #94a3b8; }
.rc-tier-T3 .rc-tier-label { background: rgba(148, 163, 184, 0.10); }

/* ===== 武器卡片 ===== */
.rc-tier-weapons {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 10px;
}
.rc-weapon {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: all 0.2s ease;
}
.rc-weapon:hover {
  border-color: var(--ts-accent, #f59e0b);
  transform: translateX(3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 30;
}
.rc-rank-num {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(145deg, #8e9aab, #6b7686);
}
.rc-tier-T0 .rc-rank-num:nth-of-type(1) { background: linear-gradient(145deg, #ffe066, #f1c40f); color: #7a5b00; }
.rc-weapon-icon {
  flex-shrink: 0;
  width: 48px;
  height: 36px;
  object-fit: contain;
  border-radius: 5px;
  background: rgba(10, 20, 40, 0.35);
  border: 1px solid var(--vp-c-divider);
  padding: 2px;
}
.rc-weapon-info {
  flex: 1;
  min-width: 0;
}
.rc-weapon-name-line {
  display: flex;
  align-items: center;
  gap: 6px;
}
.rc-weapon-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.rc-weapon-desc {
  margin-top: 2px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rc-hint {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--vp-c-text-3);
  border: 1px dashed var(--vp-c-divider);
  padding: 3px 8px;
  border-radius: 999px;
}

/* ===== 悬停浮层（fixed 页面级，永不被裁剪） ===== */
.rc-float-tip {
  position: fixed;
  z-index: 9999;
  width: 260px;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--ts-accent, #f59e0b);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  pointer-events: auto;
  animation: rc-tip-in 0.15s ease;
}
.rc-float-tip::before {
  content: '';
  position: absolute;
  left: 18px;
  width: 10px;
  height: 10px;
  background: var(--vp-c-bg);
  border-left: 1px solid var(--ts-accent, #f59e0b);
  border-top: 1px solid var(--ts-accent, #f59e0b);
  transform: rotate(45deg);
}
.rc-float-tip:not(.up)::before {
  top: -6px;
}
.rc-float-tip.up::before {
  bottom: -6px;
  transform: rotate(225deg);
}
@keyframes rc-tip-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.rc-tt-title {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 6px;
  color: var(--ts-accent, #f59e0b);
}
.rc-tt-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 12px;
  padding: 2px 0;
}
.rc-tt-key {
  color: var(--vp-c-text-2);
}
.rc-tt-value {
  font-weight: 700;
}
.rc-tt-empty {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.rc-tt-tip {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 11px;
  color: var(--vp-c-text-3);
}

/* ===== 空榜 ===== */
.rc-empty {
  padding: 28px 18px;
  text-align: center;
  color: var(--vp-c-text-3);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  font-size: 13px;
}
.rc-empty code {
  background: var(--vp-c-bg-soft);
  padding: 1px 6px;
  border-radius: 4px;
}

/* ===== 详情弹窗 ===== */
.rc-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
}
.rc-modal {
  position: relative;
  width: 100%;
  max-width: 460px;
  max-height: 82vh;
  overflow-y: auto;
  padding: 22px;
  border-radius: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}
.rc-modal-close {
  position: absolute;
  top: 12px;
  right: 14px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--vp-c-text-3);
}
.rc-modal-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.rc-modal-icon {
  width: 64px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background: rgba(10, 20, 40, 0.35);
  border: 1px solid var(--vp-c-divider);
}
.rc-modal-title-line {
  display: flex;
  align-items: center;
  gap: 7px;
}
.rc-modal-title {
  font-size: 17px;
  font-weight: 800;
}
.rc-modal-tier {
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  padding: 2px 9px;
  border-radius: 999px;
}
.rc-modal-desc {
  margin-top: 4px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.rc-modal-detail {
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-line;
}
.rc-modal-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 14px;
}
.rc-modal-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  padding: 5px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.rc-modal-key {
  color: var(--vp-c-text-2);
}
.rc-modal-value {
  font-weight: 700;
}
.rc-modal-link {
  display: inline-block;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 700;
  color: var(--ts-accent, #f59e0b);
  text-decoration: none;
}
.rc-modal-link:hover {
  text-decoration: underline;
}

/* ===== 分类徽章 ===== */
.cat-badge {
  flex-shrink: 0;
  display: inline-block;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.8;
  background: rgba(148, 163, 184, 0.14);
  color: #94a3b8;
}

/* ===== 弹窗过渡 ===== */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* ===== 移动端 ===== */
@media (max-width: 640px) {
  .rc-tier {
    flex-direction: column;
  }
  .rc-tier-label {
    width: 100%;
    flex-direction: row;
    padding: 6px 12px;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
  .rc-hint {
    display: none;
  }
}
</style>
