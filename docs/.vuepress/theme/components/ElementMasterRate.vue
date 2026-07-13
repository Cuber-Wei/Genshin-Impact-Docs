<script setup lang="ts">
import { ref, watch } from 'vue'

const types = ['增幅', '星月', '激化', '草原核、剧变']
function cal_1(element_master: number, reaction_bonus: number): number {
  // 蒸发融化
  return 1 + (2.78 * element_master) / (element_master + 1400) + reaction_bonus / 100
}
function cal_2(element_master: number, reaction_bonus: number): number {
  // 月体系、星体系
  return 1 + (6 * element_master) / (element_master + 2000) + reaction_bonus / 100
}
function cal_3(element_master: number, reaction_bonus: number): number {
  // 激化
  return 1 + (5 * element_master) / (element_master + 1200) + reaction_bonus / 100
}
function cal_4(element_master: number, reaction_bonus: number): number {
  // 草原核、剧变
  return 1 + (16 * element_master) / (element_master + 2000) + reaction_bonus / 100
}
const funcs = [cal_1, cal_2, cal_3, cal_4]
/**
 * 计算提升总百分比和每条元素精通提升百分比
 * @param pre_element_master 提升前元素精通
 * @param element_bonus 提升的精通数值
 * @param reaction_bonus 反应增伤
 * @param cal_func 倍率计算函数
 */
function cal_improve_rate(
  pre_element_master: number,
  element_bonus: number,
  reaction_bonus: number,
  cal_func: (element_master: number, reaction_bonus: number) => number,
): [number, number] {
// 规范化，将负数值的元素精通和反应增伤归零
  if (pre_element_master < 0)
    pre_element_master = 0
  if (element_bonus < 0)
    element_bonus = 0
  if (reaction_bonus < 0)
    reaction_bonus = 0
  const now_element_master = pre_element_master + element_bonus
  const pre_rate = cal_func(pre_element_master, reaction_bonus)
  const now_rate = cal_func(now_element_master, reaction_bonus)
  const improve_rate = ((now_rate - pre_rate) / pre_rate) * 100
  const per_improve_rate = element_bonus !== 0 ? improve_rate / (element_bonus / 20) : 0
  return [improve_rate, per_improve_rate]
}
const preElementMaster = ref(0)
const elementBonus = ref(0)
const reactionBonus = ref(0)
const idx = ref(0)
const improveRate = ref(0)
const perImproveRate = ref(0)

function calImprove(): void {
  const [improve_rate, per_improve_rate] = cal_improve_rate(
    preElementMaster.value,
    elementBonus.value,
    reactionBonus.value,
    funcs[idx.value],
  )
  improveRate.value = improve_rate
  perImproveRate.value = per_improve_rate
}

watch([preElementMaster, elementBonus, reactionBonus, idx], () => {
  calImprove()
})
</script>

<template>
  <div id="element-master-rate">
    <div class="field-row field-row-select">
      <span class="label">选择反应类型：</span>
      <select v-model="idx" class="select-box">
        <option v-for="(type, index) in types" :key="index" :value="index">
          {{ type }}
        </option>
      </select>
    </div>
    <div class="field-row">
      <span class="label">提升前元素精通：</span>
      <input v-model.number="preElementMaster" type="number" placeholder="提升前元素精通" class="input-box">
    </div>
    <div class="field-row">
      <span class="label">提升的精通：</span>
      <input v-model.number="elementBonus" type="number" placeholder="提升的精通数值" class="input-box">
    </div>
    <div class="field-row">
      <span class="label">反应增伤（%）：</span>
      <input v-model.number="reactionBonus" type="number" placeholder="反应增伤" class="input-box">
    </div>
    <div class="result-panel">
      <p>{{ types[idx] }}反应提升百分比：{{ improveRate.toFixed(2) }}%</p>
      <p>每条元素精通提升百分比：{{ perImproveRate.toFixed(2) }}%</p>
    </div>
  </div>
</template>

<style scoped>
#element-master-rate{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 28px 24px 30px;
}
.field-row {
    display: grid;
    grid-template-columns: 180px auto;
    align-items: center;
    column-gap: 16px;
}
.field-row-select {
    margin-bottom: 4px;
}
.label {
    justify-self: end;
    text-align: right;
    white-space: nowrap;
}
.select-box {
    text-align: center;
    min-width: 100px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #1b1b1f;
    color: #fff;
}
.input-box {
    text-align: center;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #1b1b1f;
    color: #fff;
    width: 100px;
}
.result-panel {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: 10px;
}
.result-panel p {
    margin: 0;
}
</style>
