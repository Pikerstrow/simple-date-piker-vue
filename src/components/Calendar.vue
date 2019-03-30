<template>
  <div class="calendar">    
    <calendar-header :month="month" 
                     :year="year" 
                     @prevMonth="prevMonth" 
                     @nextMonth="nextMonth"
                     :options="options"
                     ></calendar-header>
    <calendar-body :month="month" 
                   :year="year" 
                   :weeks="weeks"   
                   :options="options"                 
                   ></calendar-body>
  </div>
</template>

<script>
import Header from "./calendar_parts/Header.vue";
import Body from "./calendar_parts/Body.vue";

export default {
  name: "DatePiker",
  props: ['options'],
  components: {
    "calendar-header": Header,
    "calendar-body": Body
  },
  data() {
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
  },
  computed: {
    weeks() {
      return this.buildCalendarBody();
    }
  },
  methods: {    
    prevMonth() {
      if (this.month == 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month--;
      }
    },
    nextMonth() {
      if (this.month == 11) {
        this.month = 0;
        this.year++;
      } else {
        this.month++;
      }
    },
    getDaysQuantityInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    },
    buildCalendarBody() {
      let daysQuantity = this.getDaysQuantityInMonth(this.year, this.month + 1);
      let previousMonthDaysQuantity = this.getDaysQuantityInMonth(this.year, this.month);

      let startDayOfMonth = this.getDayForLoop(
        new Date(this.year, this.month, 1).getDay()
      );
      
      let weeksCounter = 1;

      let weeks = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
      };

      for (let i = 1; i <= 42; i++) { // 42 - 6 weeks * 7 dyas
        if (i < startDayOfMonth) {
          this.prevMonthDaysQuantity++;
          weeks[weeksCounter].push(
            previousMonthDaysQuantity - (startDayOfMonth - i - 1) + " prev"
          );
        } else if (i - startDayOfMonth >= daysQuantity) {
          if (i % 7 === 0) {
            weeks[weeksCounter].push((i - daysQuantity - startDayOfMonth + 1) + " next");
            weeksCounter++;
          } else {
            weeks[weeksCounter].push((i - daysQuantity - startDayOfMonth + 1) + " next");
          }
        } else {
          let delta = startDayOfMonth - 1; // because days counts from 1;
          let dayOfWeek = new Date(this.year, this.month, i - delta).getDay();

          if (dayOfWeek === 0) {
            weeks[weeksCounter].push(i - delta);
            weeksCounter++;
          } else {
            weeks[weeksCounter].push(i - delta);
          }            
        }
      }

      return weeks;
    },
    getDayForLoop(num) {
      switch (num) {
        case 0:
          return 7;
          break;
        case 1:
          return 1;
          break;
        case 2:
          return 2;
          break;
        case 3:
          return 3;
          break;
        case 4:
          return 4;
          break;
        case 5:
          return 5;
          break;
        case 6:
          return 6;
          break;
      }
    }
  },
  mounted() {
    this.buildCalendarBody();
  }
};
</script>

<style lang="scss">
  .calendar{
    border: 1px solid rgb(221, 221, 221);
    &:before {
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      background-color: rgb(255, 255, 255);
      transform: rotate(45deg);
      position: absolute;
      top: -7px;
      left: 12px;
      border-left: 1px solid rgb(221, 221, 221); 
      border-top: 1px solid rgb(221, 221, 221);     
    }
  }  
</style>
