<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="outputChange">7</button>
      <button @click="outputChange">8</button>
      <button @click="outputChange">9</button>
      <button @click="clear">
        <icon name="delete"/>
      </button>
      <button @click="outputChange">4</button>
      <button @click="outputChange">5</button>
      <button @click="outputChange">6</button>
      <button @click="caculator('-')">
        <icon name="minus"/>
      </button>
      <button @click="outputChange">1</button>
      <button @click="outputChange">2</button>
      <button @click="outputChange">3</button>
      <button @click="caculator('+')">
        <icon name="plus"/>
      </button>
      <button @click="allClear" class="allClear">C</button>
      <button @click="outputChange">0</button>
      <button @click="outputChange">.</button>
      <button @click="confirm" class="OK">OK</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop() readonly value: number;
  output = this.value.toString();

  outputChange(event: MouseEvent) {
    const input = event.target.textContent;
    if (this.output.length === 16) {return;}
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    const lastItem = this.output[this.output.length - 1];
    const nextItem = this.output[this.output.length - 2];
    if (lastItem === '.' && input === '.') {
      return;
    }
    if (this.output.indexOf('+') > 0 && this.output.lastIndexOf('.') > this.output.indexOf('+') && input === '.') {
      return;
    }
    if (this.output.indexOf('-') > 0 && this.output.lastIndexOf('.') > this.output.indexOf('-') && input === '.') {
      return;
    }
    if (this.output.indexOf('+') < 0 &&
        this.output.indexOf('-') < 0 &&
        this.output.indexOf('.') >= 0 &&
        input === '.') {
      return;
    }
    if ('+-'.indexOf(lastItem) >= 0 && input === '.') {
      return;
    }
    if ('+-'.indexOf(nextItem) >= 0 && lastItem === '0' && input !== '.') {
      return;
    }
    if (this.output === '+') {
      this.output = input;
      return;
    }
    this.output += input;
  }

  clear() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  allClear() {
    this.output = '0';
  }

  round(output: string, operator: string) {
    const Index = this.output.lastIndexOf(operator);
    const number1 = Number(this.output.slice(0, Index));
    const number2 = Number(this.output.slice(Index + 1));
    let result;
    if (operator === '+') {
      result = number1 + number2;
    } else if (operator === '-') {
      result = number1 - number2;
    }
    if (String(result).length > 16) {
      if (result >= 0) {
        return parseFloat(Math.round(+result + 'e' + 10) / Math.pow(10, 10));
      } else {
        return -parseFloat(Math.round(+Math.abs(result) + 'e' + 10) / Math.pow(10, 10));
      }
    } else {
      return result;
    }

  }

  caculator(operator: string) {
    if (this.output.length === 16) {
      return;
    }
    const lastIndex = this.output.length - 1;
    const lastItem = this.output[lastIndex];
    if (this.output.length === 1 && '0+-'.indexOf(this.output) >= 0) {
      this.output = operator;
    } else if ('+-'.indexOf(lastItem) >= 0) {
      this.output = this.output.slice(0, lastIndex) + operator;
    } else if (lastItem === '.') {
      return;
    } else if (this.output.lastIndexOf('+') >= 0) {
      const result = this.round(this.output, '+');
      this.output = result + operator;
    } else if (this.output.lastIndexOf('-') >= 0) {
      const result = this.round(this.output, '-');
      this.output = result + operator;
    } else {
      this.output += operator;
    }
  }

  confirm() {
    if (this.output.endsWith('+') || this.output.endsWith('-')) {
      this.output = this.output.slice(0, -1);
    } else if (this.output.lastIndexOf('+') >= 0) {
      this.output = this.round(this.output, '+').toString();
    } else if (this.output.lastIndexOf('-') >= 0) {
      this.output = this.round(this.output, '-').toString();
    } else if (this.output.endsWith('.')) {
      this.output = this.output.slice(0, -1);
    }

    this.$emit('update:value', Number(this.output));
    this.$emit('submit', Number(this.output));
    this.output = '0';
  }


}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  font-family: Consolas, monospace;

  .output {
    @extend %innerShadow;
    font-size: 34px;
    padding: 9px 16px;
    text-align: right;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    font-size: 1.5em;

    > button {
      width: 25%;
      height: 64px;
      background: transparent;
      border: none;

      .icon {
        width: .9em;
        height: .9em;
        color: #f60;
      }

      &:active {
        font-weight: bold;
        background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(240, 240, 240, 1) 36%, rgba(255, 255, 255, 0) 37%, rgba(255, 255, 255, 0) 100%);
      }

      &.allClear {
        font-size: 1em;
        color: #f60;
      }

      &.OK {
        color: white;
        background: radial-gradient(circle, rgba(255, 102, 0, 1) 0%, rgba(255, 102, 0, 1) 33%, rgba(255, 255, 255, 0) 34%, rgba(255, 255, 255, 0) 100%);

        &:active {
          font-weight: normal;
          font-size: .9em;
          background: radial-gradient(circle, rgba(255, 102, 0, 1) 0%, rgba(255, 102, 0, 1) 29%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%);
        }
      }

    }


  }
}
</style>