
# 🌤️ Weather Forecast App

A modern, fully-featured weather forecasting application with real-time data, intuitive UI, and comprehensive weather information for any location worldwide.

[![GitHub](https://img.shields.io/badge/GitHub-jyotiprakash05%2FWeather--Forcast-blue?style=flat-square&logo=github)](https://github.com/jyotiprakash05/Weather-Forcast)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📚 Table of Contents

- [🌐 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🚀 Usage](#-usage)
- [📡 API Reference](#-api-reference)
- [🏗️ Project Structure](#-project-structure)
- [🎨 Screenshots](#-screenshots)
- [🌐 Browser Support](#-browser-support)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [👨‍💻 Author](#️-author)

---

## 🌐 Live Demo

🔗 https://jyotiprakash05.github.io/Weather-Forcast/


### Quick Features Preview:
- ⚡ **Real-time weather data** - Updated instantly
- 🌍 **Global coverage** - Any city, any country
- 📱 **Fully responsive** - Works on all devices
- 🎨 **Dark mode support** - Eye-friendly interface
- 🔄 **No API key required** - Open-Meteo API (free)

---

## ✨ Features

### 🌡️ Current Weather Display
```
✅ Real-time temperature (°C / °F)
✅ Weather condition with animated emoji icons
✅ "Feels like" temperature
✅ Humidity percentage
✅ Wind speed and direction
✅ Atmospheric pressure
✅ UV Index
✅ Cloud cover percentage
✅ Visibility distance
✅ Sunrise & Sunset times
```

### 📊 Hourly Forecast
```
✅ 24-hour weather predictions
✅ Temperature trends
✅ Precipitation probability
✅ Weather icons for each hour
✅ Horizontal scrollable view
```

### 📅 5-Day Forecast
```
✅ Daily high/low temperatures
✅ Weather descriptions
✅ Precipitation amount
✅ Wind speed information
✅ Visual weather icons
```

### 📍 Location Features
```
✅ Auto-detect current location (HTML5 Geolocation API)
✅ Search any city worldwide
✅ Quick access buttons for major Indian cities
✅ Reverse geocoding for location names
✅ Fallback to default location if permission denied
```

### ⚙️ Customization Options
```
✅ Temperature unit toggle (°C ⟷ °F)
✅ Wind speed conversion (km/h ⟷ mph)
✅ Light/Dark theme toggle
✅ Smooth animations and transitions
✅ Mobile-responsive design
```

### 🎨 Visual Design
```
✅ Clean, minimalist interface
✅ Gradient backgrounds based on time of day
✅ Animated weather icons
✅ Color-coded temperature indicators
✅ Professional typography
✅ Smooth hover effects
✅ Loading spinners
✅ Error messages
```

---

## 🛠️ Tech Stack

| Technology | Purpose | Why |
|-----------|---------|-----|
| **HTML5** | Semantic markup | Accessibility & SEO |
| **CSS3** | Styling & animations | Modern design with Flexbox/Grid |
| **JavaScript (ES6+)** | Interactivity | Vanilla JS, no dependencies |
| **Open-Meteo API** | Weather data | Free, no API key required |
| **HTML5 Geolocation API** | User location | Browser native, privacy-friendly |

### Why Open-Meteo?
- ✅ **Completely Free** - No API key needed
- ✅ **Accurate Data** - Weather forecasts & historical data
- ✅ **Fast & Reliable** - Quick response times
- ✅ **Open Source** - Transparent & trustworthy
- ✅ **Global Coverage** - Works anywhere in the world

---

## 📦 Installation

### Option 1: Direct Use (No Installation)
Just visit: **https://jyotiprakash05.github.io/Weather-Forcast/**

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/jyotiprakash05/Weather-Forcast.git
cd Weather-Forcast

# Open in browser (choose one)
# Method 1: Direct file
open index.html

# Method 2: Local server (Python)
python -m http.server 8000
# Visit: http://localhost:8000

# Method 3: Local server (Node.js)
npx http-server
# Visit: http://localhost:8080
```

### Option 3: Deploy to Your Own GitHub Pages
```bash
1. Fork the repository
2. Go to Settings → Pages
3. Select 'main' branch as source
4. Your site will be live at: https://YOUR-USERNAME.github.io/Weather-Forcast/
```
### 🔍 Searching for Weather

**By City Name:**
1. Type the city name in the search bar
2. Press Enter or click the search button
3. Weather data updates instantly

**By Location:**
1. Click the 📍 (Location) button
2. Allow browser permission
3. Your current location is detected automatically

**Quick Access:**
1. Click any city button (Bhubaneswar, Mumbai, Delhi, etc.)
2. Instant weather update for that city

### 🎛️ Customizing the Display

**Change Temperature Unit:**
- Click the °C/°F button to toggle between Celsius and Fahrenheit
- Wind speed automatically converts too!

**Switch Theme:**
- Click the 🌙 (Moon) button to toggle Dark/Light mode
- Theme preference is saved automatically

**Read the Data:**

| Section | What It Shows |
|---------|---------------|
| **Hero Section** | Current temp, weather icon, condition, "feels like" |
| **Detail Cards** | Humidity, wind, pressure, UV, visibility, sunrise/sunset |
| **Hourly Section** | Next 24 hours with temps and rain chance |
| **Daily Section** | Next 5 days with high/low temps and conditions |

---

## 📡 API Reference

### Open-Meteo Weather API
```
Endpoint: https://api.open-meteo.com/v1/forecast
Method: GET
Authentication: None required
```

**Example Request:**
```javascript
const url = `https://api.open-meteo.com/v1/forecast?latitude=20.2961&longitude=85.8245&current=temperature_2m,relative_humidity_2m,weather_code&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
```

**Response Includes:**
- Current weather conditions
- Hourly forecast (168 hours)
- Daily forecast (16 days)
- Sunrise/sunset times
- UV index
- Precipitation data

### Open-Meteo Geocoding API
```
Endpoint: https://geocoding-api.open-meteo.com/v1/search
Method: GET
Purpose: Convert city names to coordinates (reverse geocoding)
```

**Example:**
```javascript
const query = 'Mumbai';
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data.results[0]));
```

---

## 🏗️ Project Structure

```
Weather-Forcast/
├── index.html          # Main HTML file (structure & content)
├── styles.css          # CSS styling (design & animations)
├── script.js           # JavaScript (functionality & logic)
└── README.md           # Documentation (this file)
```

### File Details

**index.html** (Semantic Structure)
- Header with search & controls
- Current weather display
- Detail cards grid
- Hourly forecast section
- 5-day forecast section
- Error handling elements
- Proper accessibility labels

**styles.css** (Modern Design)
- CSS variables for theming
- Light & dark mode styles
- Responsive grid layouts
- Smooth animations & transitions
- Mobile-first approach
- Professional color scheme

**script.js** (Full Functionality)
- Weather data fetching
- Geolocation handling
- City search & geocoding
- Temperature unit conversion
- Theme management
- DOM manipulation
- Event listeners
- Error handling

---

## 🎨 Screenshots

Coming soon! 📸

For now, visit: **https://jyotiprakash05.github.io/Weather-Forcast/** to see the app in action!

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| **Chrome** | 90+ | ✅ Full |
| **Firefox** | 88+ | ✅ Full |
| **Safari** | 14+ | ✅ Full |
| **Edge** | 90+ | ✅ Full |
| **Opera** | 76+ | ✅ Full |

### Requirements:
- Modern browser with ES6 support
- JavaScript enabled
- Internet connection
- Location permission (optional, for auto-detection)

---

## 🐛 Troubleshooting

### ❌ Location Not Detected
**Problem:** "Location not detected" or app doesn't request permission
**Solutions:**
```
1. Check if location is enabled in browser settings
2. Make sure you're using HTTPS (not HTTP)
3. Check browser console for errors (F12 → Console)
4. Allow permission when browser asks
5. Try a different browser
```

### ❌ Weather Data Not Loading
**Problem:** Data doesn't show or shows as "Loading..."
**Solutions:**
```
1. Check internet connection
2. Open browser console (F12 → Console) for error messages
3. Check if Open-Meteo API is accessible
4. Try searching for a different city
5. Clear browser cache (Ctrl+Shift+Delete)
5. Try a hard refresh (Ctrl+F5)
```

### ❌ Search Not Working
**Problem:** City search returns no results
**Solutions:**
```
1. Check spelling of city name
2. Use full city name instead of abbreviations
3. Include country name if needed
4. Make sure you're typing in English
5. Some small towns may not be available
```

### ❌ App Looks Broken
**Problem:** Layout is messed up, colors are wrong
**Solutions:**
```
1. Clear browser cache
2. Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
3. Try a different browser
4. Check if JavaScript is enabled
5. Check browser console for errors
```

### ❌ Time Zone Issues
**Problem:** Sunrise/sunset times seem wrong
**Solutions:**
```
1. The app automatically detects your timezone
2. Check if your system timezone is correct
3. Different locations have different times
4. Use the location you're currently in
```

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

### Steps to Contribute:

1. **Fork the Repository**
   ```bash
   Click "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Weather-Forcast.git
   cd Weather-Forcast
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**
   - Edit HTML, CSS, or JavaScript as needed
   - Test thoroughly
   - Keep code clean and commented

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes
   - Submit!

### Ideas for Contributions:
- 🌍 Add more cities to quick access
- 🎨 New color themes
- 🌐 Multi-language support
- 📊 Air quality index (AQI)
- 📱 PWA (Progressive Web App)
- 📈 Weather history/statistics
- 🔔 Weather alerts
- 🗺️ Map integration
- 📤 Export weather data
- 🎬 GIF animations for weather

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary:
```
✅ Use commercially
✅ Modify the code
✅ Distribute freely
✅ Use privately
✅ Use for patent claims

⚠️ Include license and copyright notice
❌ No liability (use at your own risk)
```

---

## 👨‍💻 Author

**Jyoti Prakash**

- 🔗 GitHub: [@jyotiprakash05](https://github.com/jyotiprakash05)
- 📍 Location: Bhubaneswar, Odisha, India
- 💻 Skills: Web Development, JavaScript, Data Structures

### Connect:
- 📧 GitHub Issues for bug reports
- ⭐ Star the repo if you like it!
- 🍴 Fork and contribute

---

## 🎯 Project Roadmap

### ✅ Completed
- [x] Real-time weather data
- [x] Hourly & 5-day forecasts
- [x] City search functionality
- [x] Geolocation detection
- [x] Temperature unit toggle
- [x] Dark/Light mode
- [x] Responsive design
- [x] Error handling

### 🚧 In Progress
- [ ] Screenshots & demo GIFs
- [ ] More city shortcuts
- [ ] Weather alerts

### 📋 Planned Features
- [ ] Air quality index (AQI)
- [ ] Weather history
- [ ] Multi-language support
- [ ] PWA support
- [ ] Weather map visualization
- [ ] Social sharing
- [ ] Export weather data (CSV/PDF)

---

## 🙏 Acknowledgments

- **Open-Meteo** - Free weather API
- **HTML5 Geolocation API** - Browser location detection
- **MDN Web Docs** - Documentation reference
- **Community** - Thank you for using this app!

---

## 📞 Support & Feedback

Found a bug or have a suggestion?

1. **Report Issues**: [GitHub Issues](https://github.com/jyotiprakash05/Weather-Forcast/issues)
2. **Check Troubleshooting**: See the [Troubleshooting](#-troubleshooting) section above
3. **Browse Q&A**: Check if someone already reported it

---

## 📊 Repository Stats

- **Created**: November 2025
- **Language**: HTML, CSS, JavaScript
- **License**: MIT
- **Status**: Active Development
- **Last Updated**: November 16, 2025

---

## 🎉 Thank You!

Thank you for visiting this project! If you found it useful:

- ⭐ **Star the repository** to show your support
- 🍴 **Fork and improve** it
- 📢 **Share** with your friends
- 💬 **Provide feedback** on improvements

---

<div align="center">

**Made with ❤️ by [Jyoti Prakash](https://github.com/jyotiprakash05)**
