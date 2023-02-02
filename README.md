# 색칠쏙쏙 FrontEnd

![색칠쏙쏙](https://user-images.githubusercontent.com/42240965/216251429-0fe1b0d5-d38f-4d40-b754-8a678d578598.png)

Client for Paint_ssokssok (React Native)

# Live Service

![image](https://user-images.githubusercontent.com/42240965/216276319-33d2ff5e-f9f4-4094-b83f-c4806432d2ce.png)
`Only for IOS`

> 2023.02.02 현재 요금문제로 서버가 닫혀있습니다.

## User Manual

- [1조(색칠쏙쏙) UserManual.pdf](https://github.com/SsokSsok-CAU/.github/files/10566019/1.UserManual.pdf)

# Tech Stacks

## Core

- ReactNative
- React Navigation
- Valtio
- Axios
- Firebase
- AsyncStorage

## Feature

- expo-image-picker
- react-native-image-pan-zoom
- react-native-safe-area-context
- react-native-view-shot
- rn-perfect-sketch-canvas
- expo-sharing
- @react-native-camera-roll/camera-roll

## Styling

- ESLint
- Prettier

## Deploy

- Expo

# Getting Started

## Development

1. SignUp 'Expo Go'

2. Install expo-cli

   `npm install -g expo-cli`

3. Login Expo

   `expo login --username "Expo 사이트 가입당시 입력한 name"`

4. Clone this repository

   `git clone https://github.com/SsokSsok-CAU/client_ssokssok.git`

5. Install node packages

   `npm install`

6. Start developing

   `npx expo start`

## Trouble

`Invariant Violation: ViewPropTypes has been removed from React Native.`

1. Install deprecated-react-native-prop-types

   `npm install deprecated-react-native-prop-types`

2. Replace ALL

   `import {ViewPropTypes} from 'react-native'` To `import { ViewPropTypes } from 'deprecated-react-native-prop-types'`

> In Directory
>
> > \node_modules\react-native-snap-carousel\src
> >
> > ...etc

# Commit Message Rules

## Consider starting the commit message:

- `feat(####)`: prefix.
  - when creating new feature.
- `fix(####)`: prefix.
  - when fixing a bug.
- `refactor(####)`: prefix.
  - when setting new development environment or refactoring codes
- `docs(####)`: prefix.
  - when adding/modifying document.
