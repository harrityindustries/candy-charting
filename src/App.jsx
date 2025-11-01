import { useState } from 'react';
import { useAuth } from './AuthContext';
import Header from './components/Header';
import CandyChart from './components/CandyChart';
import CandyForm from './components/CandyForm';
import LoginButton from './components/LoginButton';
import './App.css';

function App() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataAdded = () => {
    // Refresh the chart when new data is added
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      
      <main>
        {!user && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>
              View the candy collection stats below, or login to add your own!
            </p>
            <LoginButton />
          </div>
        )}
        
        <CandyChart key={refreshKey} />
        
        {user && (
          <CandyForm onDataAdded={handleDataAdded} />
        )}
      </main>
      
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        marginTop: '40px',
        color: '#666',
        fontSize: '14px',
      }}>
        <p>🎃 Halloween Candy Tracker - Powered by React & Chart.js</p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          Note: This demo uses a simple JSON file for storage. Data is displayed from the file but changes are logged to console.
          For production, integrate with a backend API.
        </p>
      </footer>
    </div>
  );
}

export default App;
