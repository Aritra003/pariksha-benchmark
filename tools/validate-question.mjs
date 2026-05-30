#!/usr/bin/env node
// Pariksha question-bank validator.
// Usage: node tools/validate-question.mjs questions/v1.0.0/india.json [more.json ...]

import { readFileSync } from 'node:fs'
import { argv, exit } from 'node:process'

const REQUIRED_BANK_FIELDS = [
  'version',
  'jurisdiction',
  'jurisdiction_code',
  'description',
  'last_verified',
  'question_count',
  'questions',
]

const REQUIRED_QUESTION_FIELDS = [
  'id',
  'question',
  'goldenAnswer',
  'category',
  'jurisdiction',
  'expected_topics',
  'difficulty',
  'last_verified',
]

const VALID_DIFFICULTIES = new Set(['medium', 'hard'])
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

let totalErrors = 0

function fail(file, msg) {
  console.error(`  ✗ ${file}: ${msg}`)
  totalErrors++
}

function validateBank(file, bank) {
  for (const f of REQUIRED_BANK_FIELDS) {
    if (!(f in bank)) fail(file, `missing top-level field: ${f}`)
  }
  if (bank.questions && !Array.isArray(bank.questions)) {
    fail(file, 'questions must be an array')
    return
  }
  if (bank.last_verified && !ISO_DATE.test(bank.last_verified)) {
    fail(file, `bank.last_verified must be ISO date (YYYY-MM-DD); got "${bank.last_verified}"`)
  }
  if (bank.question_count !== bank.questions.length) {
    fail(file, `question_count (${bank.question_count}) ≠ questions.length (${bank.questions.length})`)
  }

  const ids = new Set()
  for (const [i, q] of bank.questions.entries()) {
    const prefix = `questions[${i}]${q.id ? ` (${q.id})` : ''}`
    for (const f of REQUIRED_QUESTION_FIELDS) {
      if (!(f in q)) fail(file, `${prefix}: missing field ${f}`)
    }
    if (q.id && ids.has(q.id)) fail(file, `${prefix}: duplicate id`)
    if (q.id) ids.add(q.id)
    if (q.difficulty && !VALID_DIFFICULTIES.has(q.difficulty)) {
      fail(file, `${prefix}: difficulty must be one of ${[...VALID_DIFFICULTIES].join(', ')}; got "${q.difficulty}"`)
    }
    if (q.last_verified && !ISO_DATE.test(q.last_verified)) {
      fail(file, `${prefix}: last_verified must be ISO date; got "${q.last_verified}"`)
    }
    if (q.expected_topics && !Array.isArray(q.expected_topics)) {
      fail(file, `${prefix}: expected_topics must be an array`)
    }
    if (q.goldenAnswer && q.goldenAnswer.length < 80) {
      fail(file, `${prefix}: goldenAnswer is suspiciously short (${q.goldenAnswer.length} chars); citations expected`)
    }
  }
}

const files = argv.slice(2)
if (files.length === 0) {
  console.error('Usage: node tools/validate-question.mjs <question-file.json> [...]')
  exit(2)
}

for (const file of files) {
  console.log(`▸ ${file}`)
  let bank
  try {
    bank = JSON.parse(readFileSync(file, 'utf-8'))
  } catch (err) {
    fail(file, `parse error: ${err.message}`)
    continue
  }
  validateBank(file, bank)
}

if (totalErrors > 0) {
  console.error(`\n${totalErrors} validation error(s).`)
  exit(1)
}
console.log('\n✓ All files passed validation.')
