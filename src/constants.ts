const chartOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "#Properties", // Label for X axis
        font: {
          size: 14,
          weight: "bold" as const,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Time (ms)", // Label for Y axis
        font: {
          size: 14,
          weight: "bold" as const,
        },
      },
    },
  },
};

export default chartOptions;
