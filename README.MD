# Murmure Front

## Description

> Murmure is an adventure into your mind, into your body, into the understanding of your emotions ! <3

This repository contains the frontend code of the project

## Setup of the project

### install from scratch
```
mkdir murmure; cd murmure

yarn create expo-app frontend --template blank; cd frontend

yarn add @react-navigation/native@6 @react-navigation/native-stack react-redux @reduxjs/toolkit socket.io-client 

npx expo install react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage react-native-maps expo-av

yarn install
yarn start
```

> Why sometimes NPX is used instead of YARN ? 
>>YARN will simply install the latest (or specified) version of a package.
>
>>NPX do version comparison to ensure the dependencies installed are compatible with the Expo version we are using. It will not get the latest version of a packages but the latest COMPATIBLE one.

#### Why thoses dependencies ?
* react-native-screens + @react-navigation/native: Base screen + navigation
* react-native-safe-area-context: Avoid overlaping status bar on Android/IOS 
* socket.io-client: WebSockets (used for chat communication, cf. exo week8/socketIO)
* react-redux + @reduxjs/toolkit: Used for Redux Store
* @react-native-async-storage : To use Store Persist with react native
* expo-av : Used for media player

#### Other actions needed
Create your own .env file at the root of the project to be able to save your api key ad password localy
> ! 👻 NEVER COMMIT YOUR PASSWORD OR API KEY 💀 !

content of your .env file:
```
BACKEND_ADDRESS=*Backend address*
```
