import React, { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale } from "chart.js";
import moment from "moment";
import 'chartjs-adapter-moment';  // Import the moment adapter
import api from '../api/api';  // Import the custom API instance
import { BarController } from "chart.js";

ChartJS.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale);

const ResourceTimeline = () => {
   const [chartData, setChartData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const chartRef = useRef(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await api.post("/api/allocations/allocation-history");
            console.log("Data from backend:", response.data);
            processChartData(response.data);
         } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data.");
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   const processChartData = (data) => {
      const labels = data.map(item => item.serial_number);
      const datasets = [
         {
            label: "Allocated Time",
            data: data.map(item => ({
               x: moment(item.allocated_date).valueOf(),  // Start from allocated date
               x2: moment(item.end_date).valueOf(),  // Extend until end date
               y: item.serial_number,
               label: item.project_name,
            })),
            borderColor: "#1aac83",  // Green for allocated time
            backgroundColor: "rgba(26, 172, 131, 0.8)",
            borderWidth: 2
         },
         {
            label: "Available Time",
            data: data.map(item => ({
               x: moment(item.allocated_date).subtract(3, 'days').valueOf(),  // Start 3 days before allocation
               x2: moment(item.allocated_date).valueOf(),  // End at allocated date
               y: item.serial_number,
            })),
            borderColor: "#F7F7F7",  // Light gray for available time
            backgroundColor: "rgba(247, 247, 247, 0.8)",
            borderWidth: 2
         }
      ];

      setChartData({ labels, datasets });
   };

   useEffect(() => {
      if (chartData && chartRef.current) {
         const minDate = Math.min(...chartData.datasets[0].data.map(item => item.x));
         const maxDate = Math.max(...chartData.datasets[0].data.map(item => item.x2));
         const range = maxDate - minDate;

         let unit = "day";
         let stepSize = 1;
         if (range > 7 * 24 * 60 * 60 * 1000) {
            unit = "week";
         } else if (range > 24 * 60 * 60 * 1000) {
            unit = "hour";
         } else {
            unit = "minute";
            stepSize = 30;
         }

         const newChartInstance = new ChartJS(chartRef.current, {
            type: "bar",
            data: chartData,
            options: {
               responsive: true,
               maintainAspectRatio: false,
               indexAxis: "y",
               scales: {
                  x: {
                     type: "time",
                     time: {
                        unit: unit,
                        stepSize: stepSize,
                     },
                     title: {
                        display: true,
                        text: "Date & Time"
                     },
                     min: minDate - range * 0.5,  // Shift baseline to middle
                     max: maxDate,
                  },
                  y: {
                     ticks: {
                        autoSkip: false
                     },
                     title: {
                        display: true,
                        text: "Serial Number"
                     }
                  }
               },
               plugins: {
                  tooltip: {
                     callbacks: {
                        label: (tooltipItem) => {
                           const item = tooltipItem.raw;
                           return `${item.label}: ${item.y} (${moment(item.x).format('YYYY-MM-DD HH:mm')} - ${moment(item.x2).format('YYYY-MM-DD HH:mm')})`;
                        }
                     }
                  }
               }
            }
         });

         return () => newChartInstance.destroy();
      }
   }, [chartData]);

   return (
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
         {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <canvas ref={chartRef} />}
      </div>
   );
};

export default ResourceTimeline;
