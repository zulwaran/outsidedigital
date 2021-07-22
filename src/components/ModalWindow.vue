<template>
  <div class="popup__wrapper" ref="popup__wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <i class="fas fa-times" @click="closePopup"></i>
        <div class="title">Налоговый вычет</div>
      </div>

      <div class="v-popup__content">
        <div class="info">
          Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер
          налогового вычета составляет не более 13% от своего официального
          годового дохода.
        </div>

        <div class="salary">
          <div class="salary__title">Ваша зарплата в месяц</div>
          <input
            type="text"
            placeholder="Введите данные"
            v-model="salary"
            v-money="salary !== null ? money : null"
          />
          <button class="salary__calculate" @click="сalculate(salary)">
            Рассчитать
          </button>
        </div>

        <div class="payment" v-if="paymentVisible">
          <p>Итого можете внести в качестве досрочных:</p>
          <div
            class="payment__year"
            v-for="elem in paymentList"
            :key="elem.index"
          >
            <i class="fas fa-check" v-if="elem.checkbox == true"></i>
            <i class="fas fa-check disabled-checkbox" v-else></i>
            {{ elem.tax }} <span>{{ elem.year }} год</span>
          </div>
        </div>

        <div class="tags">
          <p>Что уменьшаем?</p>
          <button :class="{ active: !strict }" @click="strict = false">
            Платеж
          </button>
          <button :class="{ active: strict }" @click="strict = true">
            Срок
          </button>
        </div>
      </div>

      <div class="v-popup__footer">
        <button class="add-btn">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  props: {
    visiblePopup: {
      type: Boolean,
    },
  },
  data() {
    return {
      a: 1,
      strict: false,
      paymentVisible: false,
      salary: null,
      paymentList: [],
      maxTax: 260000,
      money: {
        thousands: " ",
        suffix: " ₽",
        precision: 0,
      },
    };
  },
  methods: {
    declOfNumStart(number, titles) {
      if (number == 2) {
        return titles[1];
      }
      return titles[0];
    },
    declOfNumEnd(number, titles) {
      let arr1 = [1, 4, 5, 9, 0];
      let arr2 = [2, 6, 7, 8];
      number = Math.abs(number) % 100;
      var n1 = number % 10;
      if ((number > 10 && number < 20) || arr1.includes(n1)) {
        return titles[0];
      }
      if (arr2.includes(n1)) {
        return titles[1];
      }
      if (n1 == 3) {
        return titles[2];
      }
    },
    сalculate(salary) {
      this.paymentList = [];
      if (salary == null || salary == "0 ₽") {
        this.paymentVisible = false;
        console.log("Введите месячную зарплату");
        return;
      }
      salary = salary.replace(/\s/g, "");
      salary = salary.replace("₽", "");
      let maxTax = this.maxTax;
      let count = 0;
      let tax = salary * 12 * 0.13;
      while (maxTax > tax) {
        count += 1;
        maxTax = maxTax - tax;
        const obj = {
          year:
            this.declOfNumStart(count, ["в ", "во "]) +
            String(count) +
            this.declOfNumEnd(count, ["-ый", "-ой", "-ий"]),
          tax: tax,
          checkbox: true,
        };
        this.paymentList.push(obj);
      }
      count += 1;
      this.paymentList.push({
        year:
          this.declOfNumStart(count, ["в ", "во "]) +
          String(count) +
          this.declOfNumEnd(count, ["-ый", "-ой", "-ий"]),
        tax: maxTax,
        checkbox: false,
      });
      this.paymentVisible = true;
    },
    closePopup() {
      this.$emit("closePopup");
    },
  },
  mounted() {
    document.addEventListener("click", (item) => {
      if (item.target === this.$refs["popup__wrapper"]) {
        this.closePopup();
      }
    });
  },
};
</script>

<style lang="scss">
@import url("../scss/app.scss");
.fa-times {
  color: red;
  font-size: 27px;
  position: absolute;
  right: 27px;
  top: 27px;
  cursor: pointer;
}
.fa-check {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      255.35deg,
      #dc3131 0.83%,
      rgba(255, 79, 79, 0) 108.93%
    ),
    #ff5e56;
  color: #fff;
  border-radius: 6px;
  width: 20px;
  height: 20px;
  margin-right: 11px;
}
.disabled-checkbox {
  background: #ffffff;
  border: 1px solid #dfe3e6;
  border-radius: 6px;
}
.square {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 1px solid #dfe3e6;
  box-sizing: border-box;
  border-radius: 6px;
}
.popup__wrapper {
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  min-height: 100vh;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
.v-popup {
  padding: 32px;
  position: fixed;
  top: 50px;
  width: 552px;
  background: #fff;
  border-radius: 30px;
  max-height: 90vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &__header {
    .title {
      font-family: Lab Grotesque;
      font-style: normal;
      font-weight: 500;
      font-size: 28px;
      line-height: 40px;
      margin-bottom: 16px;
    }
  }
  &__content {
    .info {
      max-width: 95%;
      font-family: Lab Grotesque;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #808080;
      margin-bottom: 30px;
    }
    .salary {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 16px;
      &__title {
        font-family: Lab Grotesque;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #000000;
        margin-bottom: 8px;
      }
      &__calculate {
        padding: 0;
        font-family: Lab Grotesque;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #ea0029;
      }
      input {
        padding: 8px 10px;
        width: 100%;
        outline: none;
        border: 1px solid #dfe3e6;
        margin-bottom: 8px;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type="number"] {
        -moz-appearance: textfield;
      }
    }

    .payment {
      position: relative;
      p {
        margin-bottom: 16px;
        font-family: Lab Grotesque;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #000000;
      }
      span {
        font-family: Lab Grotesque;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #808080;
      }
      input {
        margin-right: 11px;
      }
      &__year {
        font-family: Lab Grotesque;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #000000;
        border-bottom: 1px solid #dfe3e6;
        padding-bottom: 16px;
        margin-bottom: 16px;
      }
    }

    .tags {
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      p {
        font-family: Lab Grotesque;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #000000;
        margin-right: 76px;
      }
      button {
        padding: 6px 12px;
        background: #eef0f2;
        border-radius: 50px;
        color: #000;
        margin-right: 16px;
        font-family: Lab Grotesque;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        &.active {
          background: linear-gradient(
              255.35deg,
              #dc3131 0.83%,
              rgba(255, 79, 79, 0) 108.93%
            ),
            #ff5e56;
          border-radius: 50px;
          color: #fff;
        }
      }
    }
  }
  &__footer {
    position: relative;
    .add-btn {
      background: linear-gradient(
          255.35deg,
          #dc3131 0.83%,
          rgba(255, 79, 79, 0) 108.93%
        ),
        #ff5e56;
      box-shadow: 0px 0px 24px rgba(234, 0, 41, 0.33);
      border-radius: 6px;
      width: 100%;
      font-family: Lab Grotesque;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>