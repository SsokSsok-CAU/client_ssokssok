# client_ssokssok

Client for Paint_ssokssok (React Native)

# PRETTIER

[VSCODE]
Prettier - Code formatter 사용

## MANUAL

1. 'expo go' 모바일에서 설치 && 회원가입

2. npm install -g expo-cli

3. expo login --username "Expo 사이트 가입당시 입력한 name"

4. git clone 받아서 npx expo start

5. 모바일 expo go 앱에 들어가서 QR 또는 local development 확인

## Error

```
Invariant Violation: ViewPropTypes has been removed from React Native.
```

1. `npm install deprecated-react-native-prop-types`

2. \node_modules\react-native-snap-carousel\src 모든 파일 중<br>
   `import {ViewPropTypes} from 'react-native'`를<br>
   `import { ViewPropTypes } from 'deprecated-react-native-prop-types';`로 바꿔준다.

3. npx expo start
