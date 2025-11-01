import { useAuth } from '../AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{
      backgroundColor: '#282c34',
      padding: '20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h1 style={{ margin: 0, fontSize: '24px' }}>🍬 Halloween Candy Tracker</h1>
      
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          )}
          <div>
            <div style={{ fontSize: '14px' }}>{user.name}</div>
            <button
              onClick={logout}
              style={{
                marginTop: '5px',
                padding: '5px 10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: '14px' }}>
          Login to add your candy collection
        </div>
      )}
    </header>
  );
};

export default Header;
