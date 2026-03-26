// Update timestamp
function updateTimestamp() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('timestamp').textContent = `${hours}:${minutes}`;
}

// Call on page load
updateTimestamp();
setInterval(updateTimestamp, 60000); // Update every minute

// Realistic Weather Data
let temperatureData = [18, 20, 22, 24, 23, 21, 19];
let humidityData = [72, 68, 65, 60, 62, 68, 75];
let precipitationData = [2, 0, 0, 1, 3, 5, 8];
let windSpeedData = [12, 15, 10, 8, 14, 18, 16];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Temperature Line Chart
const tempChart = new Chart(document.getElementById('tempChart'), {
  type: 'line',
  data: {
    labels: days,
    datasets: [{
      label: 'Temperature (°C)',
      data: temperatureData,
      borderColor: '#ff6b6b',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: '#ff6b6b',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          font: { family: "'Roboto', sans-serif" }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
        ticks: { color: '#757575', font: { family: "'Roboto', sans-serif" } },
        grid: { color: '#e0e0e0' }
      },
      x: {
        ticks: { color: '#757575', font: { family: "'Roboto', sans-serif" } },
        grid: { color: '#e0e0e0' }
      }
    }
  }
});

// Humidity & Precipitation Bar Chart
const humidityChart = new Chart(document.getElementById('humidityChart'), {
  type: 'bar',
  data: {
    labels: days,
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidityData,
        backgroundColor: '#1976d2',
        borderRadius: 4
      },
      {
        label: 'Precipitation (mm)',
        data: precipitationData,
        backgroundColor: '#42a5f5',
        borderRadius: 4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          font: { family: "'Roboto', sans-serif" }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#757575', font: { family: "'Roboto', sans-serif" } },
        grid: { color: '#e0e0e0' }
      },
      x: {
        ticks: { color: '#757575', font: { family: "'Roboto', sans-serif" } },
        grid: { color: '#e0e0e0' }
      }
    }
  }
});

// Wind Speed Chart
const windChart = new Chart(document.getElementById('windChart'), {
  type: 'radar',
  data: {
    labels: days,
    datasets: [{
      label: 'Wind Speed (km/h)',
      data: windSpeedData,
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
      borderWidth: 2,
      pointBackgroundColor: '#1976d2',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          font: { family: "'Roboto', sans-serif" }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 25,
        ticks: { color: '#757575', font: { family: "'Roboto', sans-serif" } },
        grid: { color: '#e0e0e0' }
      }
    }
  }
});

// Update Data Function - Simulates real weather changes
function updateData() {
  temperatureData = temperatureData.map(() => Math.floor(Math.random() * 12) + 15);
  humidityData = humidityData.map(() => Math.floor(Math.random() * 35) + 50);
  precipitationData = precipitationData.map(() => Math.floor(Math.random() * 10));
  windSpeedData = windSpeedData.map(() => Math.floor(Math.random() * 20) + 5);

  document.getElementById('tempValue').textContent = temperatureData[0] + '°C';
  document.getElementById('humidityValue').textContent = humidityData[0] + '%';
  document.getElementById('windValue').textContent = windSpeedData[0] + ' km/h';
  document.getElementById('pressureValue').textContent = (Math.floor(Math.random() * 20) + 1005) + ' mb';

  updateTimestamp();

  tempChart.data.datasets[0].data = temperatureData;
  humidityChart.data.datasets[0].data = humidityData;
  humidityChart.data.datasets[1].data = precipitationData;
  windChart.data.datasets[0].data = windSpeedData;

  tempChart.update();
  humidityChart.update();
  windChart.update();
}
