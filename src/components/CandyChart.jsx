import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CandyChart = () => {
  const [candyData, setCandyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandyData();
  }, []);

  const loadCandyData = async () => {
    try {
      const response = await fetch('/data.json');
      const data = await response.json();
      setCandyData(data.candyData || []);
    } catch (error) {
      console.error('Error loading candy data:', error);
      setCandyData([]);
    } finally {
      setLoading(false);
    }
  };

  // Aggregate data by candy type
  const aggregateData = () => {
    const totals = {};
    const userCounts = {};

    candyData.forEach(entry => {
      const { candyType, quantity, userName } = entry;
      
      // Aggregate total
      if (!totals[candyType]) {
        totals[candyType] = 0;
      }
      totals[candyType] += quantity;

      // Track individual user counts
      if (!userCounts[userName]) {
        userCounts[userName] = {};
      }
      if (!userCounts[userName][candyType]) {
        userCounts[userName][candyType] = 0;
      }
      userCounts[userName][candyType] += quantity;
    });

    return { totals, userCounts };
  };

  const { totals, userCounts } = aggregateData();
  const candyTypes = Object.keys(totals);
  const users = Object.keys(userCounts);

  // Generate colors for each user
  const userColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ];

  const chartData = {
    labels: candyTypes.length > 0 ? candyTypes : ['No Data'],
    datasets: [
      // Individual user datasets
      ...users.map((user, index) => ({
        label: user,
        data: candyTypes.map(type => userCounts[user][type] || 0),
        backgroundColor: userColors[index % userColors.length],
      })),
      // Aggregate dataset
      {
        label: 'Total',
        data: candyTypes.length > 0 ? candyTypes.map(type => totals[type]) : [0],
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Halloween Candy Collection',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading chart...</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Bar data={chartData} options={options} />
      {candyData.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          No candy data yet. Log in to add your collection!
        </p>
      )}
    </div>
  );
};

export default CandyChart;
