import { useState } from 'react';
import { useAuth } from '../AuthContext';

const CandyForm = ({ onDataAdded }) => {
  const { user } = useAuth();
  const [candyType, setCandyType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!candyType.trim()) {
      setMessage('Please enter a candy type');
      return;
    }

    try {
      // Load current data
      const response = await fetch('/data.json');
      const data = await response.json();
      
      // Add new entry
      const newEntry = {
        candyType: candyType.trim(),
        quantity: parseInt(quantity),
        userName: user.name,
        userEmail: user.email,
        timestamp: new Date().toISOString(),
      };
      
      data.candyData.push(newEntry);
      
      // Save to JSON file (in a real app, this would be a backend API call)
      // Since we can't write to JSON directly from the browser, we'll show a message
      console.log('New candy data:', newEntry);
      console.log('Updated data:', data);
      
      setMessage(`Added ${quantity} ${candyType}! Note: In this demo, data is stored locally. For persistence, you would need a backend server.`);
      setCandyType('');
      setQuantity(1);
      
      // Notify parent component
      if (onDataAdded) {
        onDataAdded();
      }
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error adding candy data:', error);
      setMessage('Error adding candy data');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0 }}>Add Your Candy</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="candyType" style={{ display: 'block', marginBottom: '5px' }}>
            Candy Type:
          </label>
          <input
            id="candyType"
            type="text"
            value={candyType}
            onChange={(e) => setCandyType(e.target.value)}
            placeholder="e.g., Snickers, Reese's, M&Ms"
            style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="quantity" style={{ display: 'block', marginBottom: '5px' }}>
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Add Candy
        </button>
      </form>
      
      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e9',
          color: message.includes('Error') ? '#c62828' : '#2e7d32',
          borderRadius: '4px',
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default CandyForm;
