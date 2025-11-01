# 🍬 Halloween Candy Tracker

Our Halloween Haul Charted and Graphed

## Features

- 📊 **Interactive Bar Chart**: Visualize candy collection by type with overlay of multiple users and aggregate totals
- 🔐 **Google OIDC Authentication**: Secure login using Google OAuth
- 📝 **Simple Data Entry**: Add candy types and quantities when logged in
- 👥 **Multi-User Support**: Track collections from multiple users
- 📈 **Aggregated View**: See both individual and combined totals
- 💾 **JSON Storage**: Simple file-based storage mechanism

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials (Web application)
   - Add `http://localhost:5173` to authorized JavaScript origins
   - Copy the Client ID

3. **Set Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Google Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open your browser to `http://localhost:5173`

## Usage

### For Visitors (Not Logged In)
- View the home page showing the candy collection bar graph
- See aggregated data from all users
- View individual user contributions overlayed on the chart

### For Logged-In Users
- Login using Google account
- View the same chart as visitors
- Access the candy entry form
- Add candy types and quantities to your collection
- Data is associated with your Google account name

## Data Storage

The application uses a simple JSON file (`public/data.json`) for storage. Each candy entry includes:
- `candyType`: Name of the candy
- `quantity`: Number of pieces collected
- `userName`: Name from Google account
- `userEmail`: Email from Google account
- `timestamp`: When the entry was added

**Note**: In the current browser-based implementation, changes are logged to the console. For full persistence, you would need to implement a backend API to handle data updates.

## Technologies Used

- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **Chart.js** & **react-chartjs-2**: Data visualization
- **@react-oauth/google**: Google OAuth integration
- **jwt-decode**: JWT token parsing

## Project Structure

```
candy-charting/
├── public/
│   └── data.json          # Candy collection data
├── src/
│   ├── components/
│   │   ├── CandyChart.jsx    # Bar chart component
│   │   ├── CandyForm.jsx     # Data entry form
│   │   ├── Header.jsx        # App header with user info
│   │   └── LoginButton.jsx   # Google OAuth login
│   ├── AuthContext.jsx    # Authentication context
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── .env.example          # Environment variables template
└── package.json          # Dependencies and scripts
```

## Development

- **Lint**: `npm run lint`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Future Enhancements

- Backend API for persistent data storage
- Real-time updates using WebSockets
- Export data to CSV/PDF
- Additional chart types (pie, line)
- Candy photo uploads
- Social sharing features
