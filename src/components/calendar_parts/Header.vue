<template>
  <div>
    <div class="header-elems-container">
      <div class="switchers-container">
        <span class="month-switcher" @click="prevMonth()">&lt;</span>
        <span class="calendar-date">{{ calendarDate }}</span>
        <span class="month-switcher" @click="nextMonth()">&gt;</span>
      </div>
      <div class="close-button-container">
        <button @click="hideCalendar()" class="hide-calendar">
          <span class="one"></span>
          <span class="two"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBusForDatePiker} from '../event-bus.js';

export default {
  props: ["month", "year", "options"],
  computed: {
    calendarDate() {
      let settings = {
        year: "numeric",
        month: "long",
        timezone: "UTC+2"
      };
      let locale = this.options.locale;
      return new Date(this.year, this.month).toLocaleString(locale, settings);
    }
  },
  methods: {
    prevMonth() {
      this.$emit("prevMonth");
    },
    nextMonth() {
      this.$emit("nextMonth");
    },
    hideCalendar() {
      EventBusForDatePiker.$emit("hideCalendar");
    }
  }
};
</script>

<style lang="scss">
  .calendar-date {
    font-size: 1.1rem;
    font-weight: bolder;
  }
  .header-elems-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .switchers-container,
    .close-button-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 85%;
    }

    .close-button-container {
      width: 15%;
      justify-content: center;

      button.hide-calendar {
        line-height: 10px;
        background-color: rgb(241, 91, 91);
        border-radius: 50%;
        position: relative;
        width: 26px;
        height: 26px;
        border: none;
        cursor: pointer;

        span {
          display: block;
          width: 16px;
          height: 3px;
          background-color: rgb(255, 255, 255);
          margin-bottom: 0px;
          padding: 0 !important;
          position: absolute;
          top: calc(50% - 1px);
          left: calc(50% - 8px);
        }

        .one {
          transform: rotate(40deg);
          transform-origin: center center;
        }

        .two {
          transform: rotate(-40deg);
          transform-origin: center center;
        }
      }
    }

    div,
    span {
      padding: 6px;
    }
    .month-switcher {
      cursor: pointer;
      font-size: 25px;
      font-weight: bold;
      padding-bottom: 10px;
      &:hover {
        background-color: rgb(238, 235, 235);
      }
    }
  }
</style>

