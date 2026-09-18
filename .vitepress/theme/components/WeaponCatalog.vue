<!-- ============================================================
  武器资料库组件（WeaponCatalog）
  ------------------------------------------------------------
  两种视图：
  1. 卡片视图（默认）：图标 + 名称 + 核心属性，美观不挤，点击跳详情页
  2. 表格视图：完整属性表，适合同系武器并排对比
  数据来源（全站唯一武器库）：
    - 武器数据：.vitepress/theme/data/weaponDB.js（含 series 系 / family 系列）
    - 系定义（表头/说明）：.vitepress/theme/data/catalog.ts
  用法（在 .md 里写一行）：
  <WeaponCatalog />
============================================================ -->
<template>
  <div class="weapon-catalog">
    <!-- 职业分组导航 -->
    <div class="cat-nav">
      <button
        v-for="cls in classList"
        :key="cls"
        class="cat-nav__btn"
        :class="{ active: activeClass === cls }"
        @click="activeClass = cls"
      >
        {{ cls }}
      </button>
    </div>

    <!-- 视图切换：卡片 / 表格 -->
    <div class="cat-view-toggle">
      <button
        class="cat-view-toggle__btn"
        :class="{ active: view === 'card' }"
        @click="view = 'card'"
      >
        🃏 卡片视图
      </button>
      <button
        class="cat-view-toggle__btn"
        :class="{ active: view === 'table' }"
        @click="view = 'table'"
      >
        📋 表格对比
      </button>
      <span class="cat-view-toggle__hint">{{ view === 'card' ? '点击卡片查看全部属性' : '列内自动换行，无横向滚动' }}</span>
    </div>

    <!-- 按系渲染 -->
    <div
      v-for="group in currentGroups"
      :key="group.classKey + '-' + group.name"
      class="cat-group"
    >
      <div class="cat-group__head">
        <span class="cat-group__name">{{ group.name }}</span>
        <span v-if="group.desc" class="cat-group__desc">{{ group.desc }}</span>
        <span class="cat-group__count">{{ group.weapons.length }} 把武器</span>
      </div>

      <!-- 有数据 -->
      <template v-if="group.weapons.length > 0">
        <!-- ===== 卡片视图（默认） ===== -->
        <div v-if="view === 'card'" class="cat-cards">
          <a
            v-for="w in group.weapons"
            :key="w.id"
            class="cat-card"
            :href="`/weapons/${w.classKey}/${w.id}/`"
          >
            <div class="cat-card__top">
              <img :src="w.icon" :alt="w.name" class="cat-card__icon" loading="lazy" />
              <div class="cat-card__title">
                <div class="cat-card__name">{{ w.name }}</div>
                <div class="cat-card__tags">
                  <span v-if="w.family" class="cat-family">🏷️ {{ w.family }}</span>
                  <span class="cat-series">{{ group.name }}</span>
                </div>
              </div>
            </div>
            <div class="cat-card__stats">
              <div v-for="k in coreStats(w)" :key="k" class="cat-card__stat">
                <span class="cat-card__stat-k">{{ k }}</span>
                <span class="cat-card__stat-v">{{ w.stats[k] ?? '—' }}</span>
              </div>
            </div>
            <div class="cat-card__more">查看全部属性 →</div>
          </a>
        </div>

        <!-- ===== 表格视图（对比用） ===== -->
        <div v-else class="cat-table-wrap">
          <table class="cat-table">
            <thead>
              <tr>
                <th></th>
                <th>武器名称</th>
                <th v-for="col in group.columns" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="w in group.weapons" :key="w.id">
                <td class="cat-icon-cell">
                  <img :src="w.icon" :alt="w.name" class="cat-weapon-icon" loading="lazy" />
                </td>
                <td class="cat-weapon-name">
                  {{ w.name }}
                  <span v-if="w.family" class="cat-family" :title="`${w.family} 系列`">🏷️ {{ w.family }}</span>
                </td>
                <td v-for="col in group.columns" :key="col">
                  {{ w.stats[col] ?? '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- 无数据 → 待补充占位 -->
      <div v-else class="cat-empty">
        数据待补充 · 该系武器尚未录入（来自官方属性表）
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { catalogGroups } from '../data/catalog'
import { keyStats } from '../data/tiers'
// @ts-ignore weaponDB 是纯 JS 数据文件（Vite 可直接导入）
import { weaponDB } from '../data/weaponDB.js'

/** 职业列表（按数据顺序去重） */
const classList = computed(() => {
  const seen: string[] = []
  for (const g of catalogGroups) {
    if (!seen.includes(g.className)) seen.push(g.className)
  }
  return seen
})

/** 当前选中的职业，默认第一个 */
const activeClass = ref(classList.value[0] ?? '')

/** 视图模式：card（默认）| table */
const view = ref<'card' | 'table'>('card')

/**
 * 当前职业下的系。
 * 系结构来自 catalog.ts（表头/说明），武器从 weaponDB.js
 * 按 classKey + series 字段过滤出来，保证全站只有一份武器数据。
 */
const currentGroups = computed(() => {
  return catalogGroups
    .filter((g) => g.className === activeClass.value)
    .map((g) => {
      const weapons = Object.entries(weaponDB)
        .filter(([, w]) => w.classKey === g.classKey && (w.series || w.category) === g.name)
        .map(([id, w]) => ({
          id,
          classKey: w.classKey,
          name: w.name,
          icon: w.icon,
          family: w.family,
          stats: w.stats || {},
        }))
      return { ...g, weapons }
    })
})

/**
 * 卡片上显示的核心属性：
 * 优先取 tiers.ts keyStats[职业] 里该武器实际有的键（最多 4 个），
 * 没有则回退到该武器 stats 前 4 个。
 */
function coreStats(w: { stats: Record<string, string> }): string[] {
  const want = keyStats[activeClass.value] || []
  const hit = want.filter((k) => k in w.stats)
  if (hit.length >= 2) return hit.slice(0, 4)
  return Object.keys(w.stats).slice(0, 4)
}
</script>

<style scoped>
.weapon-catalog {
  margin: 16px 0;
}

/* ===== 职业导航 ===== */
.cat-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.cat-nav__btn {
  padding: 6px 16px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.cat-nav__btn:hover {
  border-color: var(--ts-accent, #f59e0b);
  color: var(--ts-accent, #f59e0b);
}
.cat-nav__btn.active {
  background: linear-gradient(135deg, var(--ts-accent, #f59e0b), #f97316);
  border-color: transparent;
  color: #fff;
}

/* ===== 视图切换 ===== */
.cat-view-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.cat-view-toggle__btn {
  padding: 5px 14px;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.cat-view-toggle__btn:hover {
  border-color: var(--ts-accent, #f59e0b);
  color: var(--ts-accent, #f59e0b);
}
.cat-view-toggle__btn.active {
  background: var(--ts-accent, #f59e0b);
  border-color: transparent;
  color: #fff;
}
.cat-view-toggle__hint {
  font-size: 12px;
  color: var(--vp-c-text-3, #999);
}

/* ===== 系分组 ===== */
.cat-group {
  margin-bottom: 26px;
}
.cat-group__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
}
.cat-group__name {
  font-size: 17px;
  font-weight: 800;
  color: var(--vp-c-text-1);
}
.cat-group__desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.cat-group__count {
  margin-left: auto;
  font-size: 12px;
  color: var(--vp-c-text-3, #999);
  background: var(--vp-c-bg-soft);
  padding: 2px 10px;
  border-radius: 999px;
}

/* ===== 卡片视图 ===== */
.cat-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 12px;
}
.cat-card {
  display: flex;
  flex-direction: column;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  text-decoration: none;
  transition: all 0.2s ease;
}
.cat-card:hover {
  border-color: var(--ts-accent, #f59e0b);
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.12);
  transform: translateY(-2px);
}
.cat-card__top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.cat-card__icon {
  flex-shrink: 0;
  width: 64px;
  height: 44px;
  object-fit: contain;
  border-radius: 6px;
  background: rgba(10, 20, 40, 0.25);
  border: 1px solid var(--vp-c-divider);
}
.cat-card__title {
  min-width: 0;
}
.cat-card__name {
  font-size: 15px;
  font-weight: 800;
  color: var(--ts-accent, #f59e0b);
  line-height: 1.3;
  margin-bottom: 4px;
}
.cat-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.cat-series {
  display: inline-block;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}
.cat-family {
  display: inline-block;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  color: #b45309;
  background: rgba(245, 158, 11, 0.14);
}
.cat-card__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 12px;
  margin: 4px 0 10px;
}
.cat-card__stat {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.cat-card__stat-k {
  font-size: 10.5px;
  color: var(--vp-c-text-3, #999);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cat-card__stat-v {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.cat-card__more {
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 12px;
  color: var(--ts-accent, #f59e0b);
  text-align: center;
}

/* ===== 表格视图（对比用） ===== */
.cat-table-wrap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}
.cat-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 12.5px;
}
.cat-table th,
.cat-table td {
  padding: 8px 8px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  vertical-align: middle;
}
.cat-table thead th {
  background: var(--vp-c-bg-soft);
  font-weight: 700;
  color: var(--vp-c-text-1);
  position: sticky;
  top: 0;
  font-size: 12px;
}
.cat-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}
.cat-table tbody tr:last-child td {
  border-bottom: none;
}
.cat-weapon-name {
  font-weight: 700;
  color: var(--ts-accent, #f59e0b);
  text-align: left;
  min-width: 110px;
  width: 110px;
}
.cat-icon-cell {
  width: 72px;
  padding: 6px 4px !important;
}
.cat-weapon-icon {
  display: block;
  width: 64px;
  height: 44px;
  object-fit: contain;
  margin: 0 auto;
  border-radius: 6px;
  background: rgba(10, 20, 40, 0.25);
  border: 1px solid var(--vp-c-divider);
}

/* ===== 空占位 ===== */
.cat-empty {
  padding: 18px;
  text-align: center;
  color: var(--vp-c-text-3, #999);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  font-size: 13px;
}
</style>
