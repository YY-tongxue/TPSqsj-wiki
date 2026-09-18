#!/usr/bin/env node
/**
 * ============================================================
 *  一键生成武器详情页（gen-weapons.mjs）
 * ============================================================
 *  读取武器总库 weaponDB.js，自动：
 *  1. 为每把武器生成/更新详情页  weapons/<职业>/<武器id>.md
 *  2. 删除旧版详情页（不在总库里的武器）
 *
 *  使用：npm run gen-weapons
 *  注意：每次往 weaponDB.js 加武器后，跑一次它，详情页自动更新。
 * ============================================================
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { weaponDB, classNames } from './.vitepress/theme/data/weaponDB.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WEAPONS_DIR = path.join(__dirname, 'weapons')

/** 详情页模板 */
function pageTemplate(w, id, familyWeapons) {
  const clsName = classNames[w.classKey] || w.classKey
  const statsRows = Object.entries(w.stats || {})
    .map(([k, v]) => `| ${k} | ${v} |`)
    .join('\n')

  const detail =
    (w.detail && w.detail.trim()) ||
    '（暂未填写详细介绍，可直接编辑本文件补充评测、实战技巧、版本历史等。）'

  const catText = w.category ? `【${w.category}】` : ''
  const familyText = w.family ? `\n\n> 🏷️ **所属系列**：${w.family}` : ''

  // 同系列武器合集（同 family 的武器互链，含自己标「当前」）
  let familyBlock = ''
  if (w.family && familyWeapons.length > 0) {
    const links = familyWeapons
      .map((x) => (x.id === id ? `- **${x.w.name}**（当前）` : `- [${x.w.name}](/weapons/${x.w.classKey}/${x.id}/)`))
      .join('\n')
    familyBlock = `\n## 🏷️ ${w.family} 系列合集（${familyWeapons.length} 把）\n\n${links}\n`
  }

  return `---
title: ${w.name}
---

# ${clsName} · ${w.name}

![${w.name}](${w.icon})

> ${catText}${w.desc || ''}${familyText}

## 属性一览

| 属性 | 数值 |
|------|------|
${statsRows}

## 详细说明

${detail}
${familyBlock}
> 💡 本页由数据文件自动生成。想补充详细评测，直接编辑本文件即可。

## 导航

- [← 返回 ${clsName} 职业页](/weapons/${w.classKey}/)
- [← 返回 PVP 排行榜](/tiers/pvp)
`
}

/** 生成所有详情页，并清理旧文件 */
function generateAll() {
  // 按职业分组
  const byClass = {}
  const allWeapons = Object.entries(weaponDB).map(([id, w]) => ({ id, w }))
  for (const { id, w } of allWeapons) {
    if (!byClass[w.classKey]) byClass[w.classKey] = []
    byClass[w.classKey].push({ id, w })
  }

  // 同系列武器索引（family → 武器列表），用于合集
  const familyIndex = {}
  for (const { id, w } of allWeapons) {
    if (!w.family) continue
    ;(familyIndex[w.family] = familyIndex[w.family] || []).push({ id, w })
  }

  let created = 0
  let cleaned = 0

  for (const [classKey, list] of Object.entries(byClass)) {
    const dir = path.join(WEAPONS_DIR, classKey)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const validIds = new Set(list.map((x) => x.id))

    // 1. 生成/更新详情页
    for (const { id, w } of list) {
      const file = path.join(dir, `${id}.md`)
      const familyWeapons = w.family ? familyIndex[w.family] || [] : []
      fs.writeFileSync(file, pageTemplate(w, id, familyWeapons), 'utf-8')
      created++
    }

    // 2. 清理旧详情页（保留 index.md，删除不在总库里的 .md）
    for (const f of fs.readdirSync(dir)) {
      if (f === 'index.md') continue
      if (!f.endsWith('.md')) continue
      const id = f.replace(/\.md$/, '')
      if (!validIds.has(id)) {
        fs.unlinkSync(path.join(dir, f))
        cleaned++
        console.log('  清理旧文件:', path.join(classKey, f))
      }
    }
  }

  console.log(`✅ 完成：生成/更新 ${created} 个详情页，清理 ${cleaned} 个旧文件`)
}

generateAll()
