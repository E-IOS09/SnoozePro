# SnoozePro Sleep Tracker

## 🎋 Intro
SnoozePro is a cross-platform sleep tracking application designed to help users build healthier sleep habits. Users can log their sleep, track their mood, view analytics, and stay motivated through streaks and badges.

## 📦 Tech Stack
- **React Native (Expo)**
- **TypeScript**
- **Firebase (Authentication + Firestore)**
- **React Navigation**
- **Expo Notifications**
- **react-native-chart-kit**

## 👩🏽‍🍳 Features
- Secure login/register using Firebase Authentication  
- Log sleep and wake times manually  
- Rate sleep mood on a scale (Happy, Neutral, Sad)  
- Sleep streak tracking and motivational badge system  
- Personalized greetings based on the time of day  
- Set preferred sleep and wake time  
- View 7-day graphs (sleep duration, mood trends)  
- Push notifications (reminders before sleep, log reminders)  
- Consistent dark-themed UI with calming visuals  
- Cross-platform: Works on iOS, Android, and Web

## 💭 Process
We began by analyzing existing sleep apps and reviewing user needs from sources like the Sleep Foundation. Using Figma, Paula designed the UI with a soothing visual style. Diana handled Firebase Firestore structure and authentication. Eshita implemented logic for sleep logging, mood tracking, badge unlocking, and analytics.  
We collaborated via Discord and Trello, splitting features based on individual strengths. Testing was done using Expo Go on real devices to ensure Firebase and notification functionality.

## 📚 Learnings
- Setting up secure Firebase rules and document structure  
- Using Expo CLI for cross-platform development  
- Implementing dynamic chart data with chart-kit  
- State management using Context API  
- Handling notification triggers based on custom times  
- Creating a clean and intuitive mobile UI

## ✨ Improvement
- Notification logic can be more reliable and customizable  
- Add onboarding help pop-ups and tips  
- Include biometric login (Face ID / Touch ID)  
- Add advanced analytics: monthly/yearly stats  
- Expand badge system with animations and sound feedback  
- Add offline support with data sync

## 🚦 Running the Project

### ✅ 1. Clone the Repository
```bash
git clone https://github.com/yourusername/snoozepro.git
cd snoozepro
```

### ✅ 2. Install Dependencies
```bash
npm install
```

### ✅ 3. Firebase Setup
- Create a `.env` file in the root directory.
- Add your Firebase config keys like this:
```env
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
...
```

### ✅ 4. Start the App with Expo
```bash
npx expo start
```
- Scan the QR code with Expo Go app on your real device  
- Or press `w` to open in web browser

### ✅ 5. Build Standalone Apps
- Make sure you’re logged into Expo:
```bash
npx expo login
```
- For Android:
```bash
npx expo build:android
```
- For iOS (Apple Developer Account required):
```bash
npx expo build:ios
```
📸 Video or Image:
📽️ https://mmutube.mmu.ac.uk/media/Restful+Sleep+Tracker_SnoozePro+/1_ow2ai52t
