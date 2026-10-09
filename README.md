My name is Dominic Onen.

# DOPortfolio

| | |
| --- | --- |
| **Registration number** | 25/28259 |
| **App name** | DOPortfolio |
| **Verification code** | MOB-A2-8259 (shown on the About screen) |
| **Android package** | `rw.ac.ines.ug2528259.doportfolio` |
| **Course** | SWE 3409 Mobile Application Development, INES-Ruhengeri, Individual Assignment 2 |

## Purpose

A personal portfolio that runs as a standalone Android app, without Expo Go. A recruiter can install the APK, open it and understand my
profile within two minutes. The whole portfolio works offline.

## Features

1. **Home**: the first sentence is "My name is Dominic Onen.", then profile picture (or initials avatar), headline, short biography, chips and the verification code.
2. **Skills and education**: six skills built from a reusable card, and an education and training timeline (reusable component).
3. **Projects**: three real projects, each with title, problem, my contribution, technology and a separate Project Details screen (stack route).
4. **Profile editor**: controlled fields for headline, short biography, primary skill and availability status, with four validation rules and a message under each field. An invalid save is blocked.
5. **Navigation**: bottom tabs (Home, Skills, Projects, Profile, About) and a native stack inside Projects. Back keeps the session.
6. **Profile picture**: take a photo or choose from the gallery, preview, replace and remove, with messages for denied permission and for cancelling.
7. **Local persistence**: AsyncStorage saves the profile and the picture location. The profile is restored after the app restarts. Reset deletes it.
8. **Offline**: everything works in Airplane Mode. Only the GitHub links on project pages need internet and say so.
9. **About**: app name, student name, registration number, verification code, version and a data-use statement.
10. **Standalone APK**: built with Expo (EAS profile `preview`, or the GitHub Actions workflow in this repository).

Stack: React Native, Expo SDK 54, TypeScript, React Navigation (bottom tabs and native stack), expo-image-picker, @react-native-async-storage/async-storage.

## Setup and run

```bash
git clone https://github.com/DominicOnen/MOB_A2_2528259.git
cd MOB_A2_2528259
npm install
npm run typecheck      # TypeScript check
npx expo start         # development only; the submitted app is the APK, not Expo Go
```

## Build the APK

**EAS Build** (needs a free Expo account):

```bash
npx eas-cli login
npx eas-cli build -p android --profile preview
```

**GitHub Actions** (no Expo account needed): the workflow `.github/workflows/build-apk.yml` builds `MOB_A2_2528259.apk` on every push to `main`.
Pushing a tag such as `v1.0.0` also creates the GitHub Release and attaches the APK:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Test and release information

| | |
| --- | --- |
| **Tested device** | _fill in: phone make and model_ |
| **Android version** | _fill in: for example Android 13_ |
| **Final commit hash** | _fill in: output of `git rev-parse HEAD`_ |
| **Release link** | https://github.com/DominicOnen/MOB_A2_2528259/releases/tag/v1.0.0 |
| **APK link** | https://github.com/DominicOnen/MOB_A2_2528259/releases/download/v1.0.0/MOB_A2_2528259.apk |
| **Demonstration video** | `MOB_A2_2528259_DEMO.mp4`, attached to the same release |

## Documents

- `docs/MOB_A2_2528259_UIUX.pdf`: UI and UX design (5 pages)
- `evidence/MOB_A2_2528259_TEST_LOG.pdf`: test log
- `evidence/MOB_A2_2528259_DECLARATION.pdf`: declaration
- `evidence/AI_USE.md`: how AI assistance was used

## Known limitations

- Android only. There is no iOS build.
- The picture is stored in the app's own storage. Clearing the app's data or uninstalling it deletes the profile and picture.
- The profile is not synced anywhere: it exists only on the phone it was edited on.
- The two GitHub links on project pages need internet and a browser.
- The release APK is signed with Expo's default debug key, so it is suitable for class testing and not for the Play Store.
