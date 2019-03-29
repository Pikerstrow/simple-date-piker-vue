<template>
  <div>
    <div class="d-flex justify-content-between align-items-center header-elems-container">
      <div class="col-10 d-flex justify-content-between align-items-center">
        <span class="month-switcher col text-center" @click="prevMonth()">
          &lt;
        </span>
        <span class="calendar-date col-10 text-center">{{ calendarDate }}</span>
        <span class="month-switcher col text-center" @click="nextMonth()">
          &gt;
        </span>
      </div>
      <div class="col-2 d-flex align-items-center justify-content-end">
        <button @click="hideCalendar()" class="btn btn-classic hide-calendar">
          <span class='one'></span>
          <span class='two'></span>
        </button>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  props: ["month", "year", 'options'],
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
      this.$emit('prevMonth');
    },
    nextMonth() {      
      this.$emit('nextMonth');
    },
    hideCalendar(){
      bus.$emit('hideCalendar');
    }
  }  
};
</script>

<style lang="scss">
  .calendar-date{
    font-size: 1.1rem;
    font-weight: bolder;
  }
  .header-elems-container {
    div, span {
      padding: 5px;
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
  button.hide-calendar{
    line-height: 10px;
    background-color: rgb(241, 91, 91);    
    border-radius: 50%;
    margin-right: 15%;
    position: relative;
    width: 26px;
    height: 26px;
    
    span {
      display: block;      
      width: 16px;
      height: 2px;
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
</style>

