<template>
  <div class="flex justify-between w-full px-10 py-4 font-bold text-gray-400">
    <div class="text-md">My Expenses</div>
    <div class="text-md">Dashboard</div>
  </div>
  <div class="flex mx-auto max-w-4xl pt-20">
    <div class="flex justify-center items-center w-1/2">
      <table class="table-fixed">
        <thead>
          <tr>
            <th class="text-md font-normal px-4 py-2">Expense Category</th>
            <th class="text-md font-normal px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody v-for="expenses in dashboard_expenses" :key="expenses.category">
          <tr>
            <td class="text-sm px-4 py-2">{{ expenses.category }}</td>
            <td class="text-sm px-4 py-2">₱ {{ expenses.total_amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-1/2">
      <doughnut-chart :chartData="chartData"></doughnut-chart>
    </div>
  </div>
</template>
<script>
import { DoughnutChart } from "vue-chart-3";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DashboardView",
  components: {
    "doughnut-chart": DoughnutChart,
  },
  data: function () {
    return {
      chartData: [],
    };
  },
  mounted() {
    this.mapDashboardData();
  },
  methods: {
    ...mapActions({
      getDashboard: "getDashboard",
    }),
    randomColorGenerator() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    mapDashboardData() {
      let totalAmount = [];
      let color = [];
      let categories = [];
      this.getDashboard().then((data) => {
        if (data) {
          data.forEach((item) => {
            totalAmount.push(item.total_amount);
            color.push(this.randomColorGenerator());
            categories.push(item.category);
          });
        }
        this.chartData = {
          labels: categories,
          datasets: [
            {
              data: totalAmount,
              backgroundColor: color,
            },
          ],
        };
      });
    },
  },
  computed: {
    ...mapGetters({
      dashboard_expenses: "dashboard_expenses",
    }),
  },
};
</script>
