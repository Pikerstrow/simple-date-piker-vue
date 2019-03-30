<template>
  <div>
    <table class="table-calendar">
      <thead>
        <tr>
          <th v-for="(weekDay, index) in weekDays" :key="index">{{ weekDay }}</th>         
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in weeks" :key="index">
          <td v-for="(day, ind) in week" :key="ind" @click='sendDate(day)'>
            <span v-html="filterDays(day)"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {EventBusForDatePiker} from '../event-bus.js';

export default {
  props: ["weeks", "month", "year", 'options'], 
  computed: {
    weekDays(){
      let ruDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
      let uaDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
      let enDays = ["Mo.", "Tu.", "We.", "Th.", "Fr.", "Sa.", "Su."];
      let deDays = ["Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa.", "So."];
      
      let locale = this.options.locale;
      
      switch(locale){
        case "UK-ua":
          return uaDays;
          break;
        case "RU-ru":
          return ruDays;
          break;          
        case "EN-en":
          return enDays;
          break;         
        case "DE-de":
          return deDays;
          break;
      }
    }
  },
  methods: {
    /*Used method instead of filter because of we need to add css class to elem*/
    filterDays(value){
      if(typeof value === 'string'){
        let day = value.split(" ")[0];        
        return "<span class='not-current-month'>" + day + "</span>";
      } else {
        return value;
      }
    },
    sendDate(day){
      let month = this.month;
       
      if(typeof day === 'string'){
        let parts = day.split(" ");
        day = parts[0];
        let remark = parts[1];

        if(remark == 'prev'){
          month--;
        } else {
          month++;
        }
      }

      if(month >= 0 && month < 10){
        month  = "0" + (month + 1);
      } else {
        month = month + 1;
      }

      if(day >= 1 && day < 10){
        day = "0" + day;
      }
           
      let requestedFormat = this.options.dateFormat;
      let dateForReturn;
 
      switch(requestedFormat){
        case "dd-mm-YYYY":
          dateForReturn = day + "-" + month + "-" + this.year;
          break;
        case "dd/mm/YYYY":
          dateForReturn = day + "/" + month + "/" + this.year;
          break;          
        case "mm/dd/YYYY":
          dateForReturn = month + "/" + day + "/" + this.year;
          break;   
      }

      EventBusForDatePiker.$emit('dateWasSent', dateForReturn);
    }
  }
};
</script>

<style lang="scss">
  .table-calendar {
    tr, td, th {
      border: none !important;
      padding: 0.35rem 0.75rem !important;
      text-align: center;
    }
    td {      
      &:hover {
        background-color: rgb(238, 235, 235);
        cursor: pointer;
      }
    }
    thead {
      font-size: 1rem;
    }
  }
  .not-current-month {
    color: rgb(189, 187, 187);
  }
</style>

