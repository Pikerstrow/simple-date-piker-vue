<template>
  <div>
    <div class="header-elems-container">
      <div class="switchers-container">
        <div class="month-switcher" @click="prevMonth()">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style="width: 25px; height: 25px;"
          >
            <path
              stroke="black"
              stroke-width=".2"
              d="M70 0, l -50 50, 50 50, 10 0, -50 -50, 50 -50 z"
            ></path>
          </svg>
        </div>
        <span class="calendar-date">{{ calendarDate }}</span>
        <div class="month-switcher" @click="nextMonth()">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style="width: 25px; height: 25px;"
          >
            <path
              stroke="black"
              stroke-width=".2"
              d="M30 0 l 50 50, -50 50, -10 0, 50 -50, -50 -50 z"
            ></path>
          </svg>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import { EventBusForDatePiker } from "../event-bus.js";

export default {
  props: ["month", "year", "options"],
  computed: {
    calendarDate() {
      let settings = {
        year: "numeric",
        month: "long",
        timezone: "UTC+2"
      };
      let locale = this.options.locale ? this.options.locale : "EN-en";
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
  padding: 7px 5px;

  .switchers-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 85%;
  }
  span {
    padding: 6px;
  }
  .month-switcher {
    cursor: pointer;
    font-size: 25px;
    font-weight: bold;
    padding: 7px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &:hover {
      background-color: rgb(238, 235, 235);
    }
  }
}
</style>

