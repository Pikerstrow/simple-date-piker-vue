<template>
  <div style="position: relative">
    <input @focus='showCalendar = true' @input="handleInput" v-model="dateToShowInInput" type="text" class="form-control" id='inputForDatePiker'> 
    <calendar class="calendar-component" v-if="showCalendar" :options='options'></calendar>    
  </div>
</template>

<script>
import Calendar from './Calendar.vue';

export default {
  name: "DatePiker",
  props: {
    value: {
      default: ''
    }, 
    options: {
      type: Object,
      default: function() {
        return {
          useCurrentDate: true,
          locale: "EN-en",
          dateFormat: "dd/mm/YYYY"
        }
      }
    },
  },
  data() {
    return {
      dateToShowInInput: '',
      showCalendar: false
    };
  },    
  methods: {
    handleInput(e){
      this.$emit('input', this.dateToShowInInput);
    }
  },
  components: {
    'calendar': Calendar
  },  
  created(){
    let vm = this;
    busForDatePiker.$on('hideCalendar', () => {
      vm.showCalendar = false;

      if(!vm.dateToShowInInput){
        vm.dateToShowInInput = '';
        this.$emit('input', vm.dateToShowInInput)
      }
      
    });
    busForDatePiker.$on('dateWasSent', (date) => {      
      vm.dateToShowInInput = date;
      vm.showCalendar = false;
      this.$emit('input', date)
    });

    /*Set current date if appropriate iption is set*/
    if(this.options.useCurrentDate){
      let todaysDay = new Date().getDate();
      let todaysMonth = new Date().getMonth();
      let todaysYear = new Date().getFullYear();
      
      
      if(todaysMonth >= 0 && todaysMonth < 10){
        todaysMonth  = "0" + (todaysMonth + 1);
      } else {
        todaysMonth = todaysMonth + 1;
      }

      if(todaysDay >= 1 && todaysDay < 10){
        todaysDay = "0" + todaysDay;
      }
     
      let requestedFormat = this.options.dateFormat ? this.options.dateFormat : 'dd-mm-YYYY';
      let dateForReturn;
 
      switch(requestedFormat){
        case "dd-mm-YYYY":
          dateForReturn = todaysDay + "-" + todaysMonth + "-" + todaysYear;
          break;
        case "dd/mm/YYYY":
          dateForReturn = todaysDay + "/" + todaysMonth + "/" + todaysYear;
          break;          
        case "mm/dd/YYYY":
          dateForReturn = todaysMonth + "/" + todaysDay + "/" + todaysYear;
          break;   
      }

      vm.dateToShowInInput = dateForReturn;
      this.$emit('input', vm.dateToShowInInput);
    }
  }
};
</script>

<style scoped lang="scss">
  .calendar-component {
    position: absolute;
    left: 0;
    background-color: white;
    z-index: 9999;
  }
</style>
