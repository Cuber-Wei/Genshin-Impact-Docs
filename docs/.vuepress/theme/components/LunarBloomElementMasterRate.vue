<script setup lang="ts">
import { computed, ref, watch } from 'vue'
const laumaConstellation = ref(0)
const laumaElementMaster = ref(0)
const laumaElementBonus = ref(0)
const neferConstellation = ref(0)
const neferElementMaster = ref(0)
const neferElementBonus = ref(0)
const rate = ref(2.304) // 奈芙尔倍率
const reactionBonus = computed(() => laumaConstellation.value >= 2 ? 100 : 60) // 菈乌玛命座增伤
const leatherRate = computed(() => laumaConstellation.value >= 2 ? 8 : 4) // 菈乌玛q羽毛倍率
const improveRate = ref(0)
const perImproveRate = ref(0)
const basicBonus = ref(14 + 14 + 7 + 36)

function cal_leather(element_master: number, rate: number, extra_bonus: number): number {
  return element_master * rate + extra_bonus
}

function cal_dmg(element_master: number, rate: number, basic_bonus: number, reaction_bonus: number, leather: number): number {
  return element_master * rate * (1 + basic_bonus / 100) * (1 + (16 * element_master) / (element_master + 2000) + reaction_bonus / 100) + leather
}

/**
 * 计算提升总百分比和每条元素精通提升百分比
 * @param pre_element_master 提升前元素精通
 * @param element_bonus 提升的精通数值
 * @param reaction_bonus 反应增伤
 * @param cal_func 倍率计算函数
 */
function cal_improve_rate(
  cal_func: (element_master: number, rate: number, basic_bonus: number, reaction_bonus: number, leather: number) => number,
): [number, number] {
// 规范化，将负数值的元素精通和反应增伤归零
  if (neferElementMaster.value < 0)
    neferElementMaster.value = 0
  if (neferElementBonus.value < 0)
    neferElementBonus.value = 0
  const now_element_master = neferElementMaster.value + neferElementBonus.value
  const pre_rate = cal_func(neferElementMaster.value, rate.value, basicBonus.value, reactionBonus.value, cal_leather(laumaElementMaster.value, leatherRate.value, neferConstellation.value >= 1 ? neferElementMaster.value * 0.6 : 0))
  const now_rate = cal_func(now_element_master, rate.value, basicBonus.value, reactionBonus.value, cal_leather(laumaElementMaster.value + laumaElementBonus.value, leatherRate.value, neferConstellation.value >= 1 ? (neferElementMaster.value + neferElementBonus.value) * 0.6 : 0))
  const improve_rate = ((now_rate - pre_rate) / pre_rate) * 100
  const per_improve_rate = (neferElementBonus.value + laumaElementBonus.value) !== 0 ? improve_rate / ((neferElementBonus.value + laumaElementBonus.value) / 20) : 0
  return [improve_rate, per_improve_rate]
}

function calImprove(): void {
  const [improve_rate, per_improve_rate] = cal_improve_rate(
    cal_dmg,
  )
  improveRate.value = improve_rate
  perImproveRate.value = per_improve_rate
}

watch([laumaElementBonus, neferElementBonus, reactionBonus, laumaConstellation, neferConstellation], () => {
  calImprove()
})
</script>

<template>
  <div id="element-master-rate">
    <div class="character-grid">
      <section class="character-panel">
        <h3>菈乌玛</h3>
        <div class="field-row">
          <span class="label">命座（0-6）：</span>
          <input v-model.number="laumaConstellation" type="number" placeholder="菈乌玛命座" class="input-box" max="6" min="0">
        </div>
        <div class="field-row">
          <span class="label">提升前元素精通：</span>
          <input v-model.number="laumaElementMaster" type="number" placeholder="提升前元素精通" class="input-box" min="0">
        </div>
        <div class="field-row">
          <span class="label">提升的精通：</span>
          <input v-model.number="laumaElementBonus" type="number" placeholder="提升的精通数值" class="input-box" min="0">
        </div>
      </section>

      <section class="character-panel">
        <h3>奈芙尔</h3>
        <div class="field-row">
          <span class="label">命座（0-6）：</span>
          <input v-model.number="neferConstellation" type="number" placeholder="奈芙尔命座" class="input-box" max="6" min="0">
        </div>
        <div class="field-row">
          <span class="label">提升前元素精通：</span>
          <input v-model.number="neferElementMaster" type="number" placeholder="提升前元素精通" class="input-box" min="0">
        </div>
        <div class="field-row">
          <span class="label">提升的精通：</span>
          <input v-model.number="neferElementBonus" type="number" placeholder="提升的精通数值" class="input-box" min="0">
        </div>
      </section>
    </div>
    <div class="field-row">
      <span class="label">反应增伤（%）：</span>
      <input v-model.number="reactionBonus" type="number" placeholder="反应增伤" class="input-box" min="0">
    </div>

    <div class="result-panel">
      <p>奈芙尔提升百分比：{{ improveRate.toFixed(2) }}%</p>
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
    width: 100%;
    box-sizing: border-box;
}
  .character-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    width: 100%;
  }
  .character-panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px 18px 18px;
    border: 1px solid rgba(204, 204, 204, 0.5);
    border-radius: 12px;
  }
  .character-panel h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
.field-row {
    display: grid;
    grid-template-columns: 180px auto;
    align-items: center;
    column-gap: 16px;
  width: 100%;
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
    box-sizing: border-box;
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

@media (max-width: 800px) {
  #element-master-rate {
    padding: 20px 14px 22px;
    gap: 14px;
  }

  .character-grid {
    grid-template-columns: 1fr;
  }

  .character-panel {
    padding: 14px 14px 16px;
  }

  .field-row {
    grid-template-columns: minmax(110px, 42vw) minmax(0, 1fr);
    column-gap: 12px;
  }

  .field-row-wide {
    width: 100%;
    grid-template-columns: minmax(130px, 42vw) minmax(0, 1fr);
  }

  .label {
    white-space: normal;
    line-height: 1.25;
  }

  .input-box,
  .select-box {
    width: 100%;
    min-width: 0;
  }

  .result-panel {
    width: 100%;
  }
}
</style>
