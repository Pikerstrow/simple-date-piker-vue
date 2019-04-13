<template>
  <div style="position: relative" v-click-outside="hideCalendar">
    <input
      @focus="showCalendar = true"
      @input="handleInput"
      v-model="dateToShowInInput"
      type="text"
      class="form-control"
      id="inputForDatePiker"
    >
    <calendar class="calendar-component" v-if="showCalendar" :options="options"></calendar>
  </div>
</template>

<script>
import { EventBusForDatePiker } from "./event-bus.js";
import Calendar from "./Calendar.vue";

export default {
  name: "DatePiker",
  props: {
    value: {
      default: ""
    },
    error: {
      default: ""
    },
    options: {
      type: Object,
      default: function() {
        return {
          useCurrentDate: true,
          locale: "EN-en",
          dateFormat: "YYYY-mm-dd"
        };
      }
    }
  },
  data() {
    return {
      dateToShowInInput: "",
      showCalendar: false
    };
  },
  methods: {
    hideCalendar(event) {
      this.showCalendar = false;
    }
  },
  components: {
    calendar: Calendar
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vnode) {
        window.event = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", window.event);
      },
      unbind: function(el) {
        document.body.removeEventListener("click", window.event);
      }
    }
  },
  created() {
    let vm = this;
   
    EventBusForDatePiker.$on("dateWasSent", date => {
      vm.dateToShowInInput = date;
      vm.showCalendar = false;

      let dateToStore;
      let dateParts;

      if(this.options.dateFormat == "dd/mm/YYYY"){
          dateParts = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
          dateToStore = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
      } else if(this.options.dateFormat == "mm/dd/YYYY"){
          dateParts = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
          dateToStore = dateParts[3] + "-" + dateParts[1] + "-" + dateParts[2];
      } else if(this.options.dateFormat == "mm-dd-YYYY") {
          dateParts = date.match(/^(\d{2})\-(\d{2})\-(\d{4})$/);
          dateToStore = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
      } else {
          dateToStore = date;
      }

      this.$emit("input", dateToStore);
    });

    /*Set current date if appropriate iption is set*/
    if (this.options.useCurrentDate) {
      let todaysDay = new Date().getDate();
      let todaysMonth = new Date().getMonth();
      let todaysYear = new Date().getFullYear();

      if (todaysMonth >= 0 && todaysMonth < 10) {
        todaysMonth = "0" + (todaysMonth + 1);
      } else {
        todaysMonth = todaysMonth + 1;
      }

      if (todaysDay >= 1 && todaysDay < 10) {
        todaysDay = "0" + todaysDay;
      }

      let requestedFormat = this.options.dateFormat
        ? this.options.dateFormat
        : "YYYY-mm-dd";

      let dateToShow;

      let dateForReturn = todaysYear + "-" + todaysMonth + "-" + todaysDay;

      switch (requestedFormat) {
        case "dd-mm-YYYY":
          dateToShow = todaysDay + "-" + todaysMonth + "-" + todaysYear;
          break;
        case "YYYY-mm-dd":
          dateToShow = dateForReturn;
          break;
        case "dd/mm/YYYY":
          dateToShow = todaysDay + "/" + todaysMonth + "/" + todaysYear;
          break;
        case "mm/dd/YYYY":
          dateToShow = todaysMonth + "/" + todaysDay + "/" + todaysYear;
          break;
      }

      vm.dateToShowInInput = dateToShow;
      this.$emit("input", dateForReturn);
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
.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-bottom: 13px;
}

.form-control:invalid, .form-control.is-invalid {
  border-color: #e3342f;
  padding-right: calc(1.6em + 0.75rem);
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23dc3545' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
  background-repeat: no-repeat;
  background-position: center right calc(0.375em + 0.1875rem);
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.invalid-feedback {
  width: 100%;
  margin-top: -6px;
  font-size: 80%;
  color: #dc3545;
  text-align: left;
}

@media screen and (prefers-reduced-motion: reduce) {
  .form-control {
    transition: none;
  }
}

.form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control::-webkit-input-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control::-moz-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control:-ms-input-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control::-ms-input-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control:disabled,
.form-control[readonly] {
  background-color: #e9ecef;
  opacity: 1;
}
</style>
