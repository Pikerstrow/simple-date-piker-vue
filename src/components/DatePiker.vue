<template>
  <div style="position: relative">
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
import {EventBusForDatePiker} from '../../event-bus.js';
import Calendar from "./Calendar.vue";

export default {
  name: "DatePiker",
  props: {
    value: {
      default: ""
    },
    options: {
      type: Object,
      default: function() {
        return {
          useCurrentDate: true,
          locale: "EN-en",
          dateFormat: "dd/mm/YYYY"
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
    handleInput(e) {
      this.$emit("input", this.dateToShowInInput);
    }
  },
  components: {
    calendar: Calendar
  },
  created() {
    let vm = this;
    EventBusForDatePiker.$on("hideCalendar", () => {
      vm.showCalendar = false;

      if (!vm.dateToShowInInput) {
        vm.dateToShowInInput = "";
        this.$emit("input", vm.dateToShowInInput);
      }
    });
    EventBusForDatePiker.$on("dateWasSent", date => {
      vm.dateToShowInInput = date;
      vm.showCalendar = false;
      this.$emit("input", date);
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
        : "dd-mm-YYYY";
      let dateForReturn;

      switch (requestedFormat) {
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
      this.$emit("input", vm.dateToShowInInput);
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
  margin-bottom: 10px;
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
