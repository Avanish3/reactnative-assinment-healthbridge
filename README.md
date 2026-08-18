# HealthBridge

React Native Expo healthcare appointment app built for the HealthBridge assignment. It uses local JSON data, React Navigation, a login flow, doctor search/listing, doctor profile booking, and confirmation screens styled to match the supplied HealthBridge/Figma reference.

## Features

- Login with local validation (`src/data/users.json`)
- Doctor directory from `src/data/doctors.json`
- Screenshot-style search, filters, provider cards, ratings, distance, next-slot preview, and urgent-care banner
- Doctor profile with bio, care tags, selectable dates/times, office location, and booking action
- Confirmation screen with appointment summary, fees, insurance, calendar/SMS switches, and caregiver receipt
- Typed React Navigation flow and reusable UI components
- Expo SDK 54 for current Expo Go compatibility

## Run locally

Requirements: Node.js 22.13+ with npm, plus the latest Expo Go app or an Android emulator.

From the project root:

```bash
npm install
npm run start
```

Use the Metro `exp://...` URL printed in the terminal. In Expo Go, scan the QR code or choose **Enter URL manually** and paste that URL. Keep a phone and computer on the same Wi-Fi network.

For a different network:

```bash
npm run tunnel
```

For an Android emulator:

```bash
npm run android
```

If Expo Go reports incompatibility, update it from the Play Store; this project uses Expo SDK 54.

## Demo credentials

- Email: `patient@healthbridge.com`
- Username: `healthbridge`
- Password: `Health@123`





## Android APK

The source project is runnable by using the setup above. A directly installable APK is a separate build artifact.

```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile preview
```

The first command opens a browser login. Complete the login, return to the terminal, and run the build command if it was not already executed. EAS may ask to create the Android application identifier and signing credentials; accept the recommended options.

When the build finishes, the terminal shows a successful/finished status and an EAS build URL. Open that URL and download the `.apk`. `Waiting for browser login` means authentication is incomplete. `npm error could not determine executable to run` means the command did not start and no APK was generated.

Optional local build (requires JDK 17 and Android SDK):

```bash
npx expo prebuild --platform android
cd android
./gradlew.bat assembleRelease
```

The local APK is generated at `android/app/build/outputs/apk/release/app-release.apk`.

## Submission checklist

- GitHub repository containing the project
- This README with setup instructions and demo credentials
- Downloaded APK or EAS build link
- Assignment UI screenshots/video

## Current project setup

- Expo SDK 54 and React Native 0.81
- TypeScript with React Navigation native stack
- Local JSON demo data; no backend or API key required
- EAS preview profile configured to produce an Android APK

## Assumptions

- PDF instructions were treated as assignment requirements.
- Remote Unsplash portraits are placeholders; replace them with bundled images for offline operation.
