## App Functionality
3 screens with proper navigation using React Stack Navigation

A large list of data loaded from a public API

Search functionality

Infinite scrolling using Flatlist

Implements Redux for state management

Local data storage so content is restored after app restart

## How to run the project ?
If you run it in an emulator, use the `npx react-native run-android` command. I've also created an APK file, which is available in `android/app/build/outputs/apk/release`, so you can easily install it on a physical device.

## Key technical decisions
Used FlatList to efficiently render large datasets and improve overall app performance.

Implemented React Navigation (Stack Navigator) to handle screen-to-screen navigation as per the project requirements.

Utilized Redux for centralized and scalable state management across the application.

Integrated AsyncStorage to persist data locally and support offline access.

## Improvements you’d make with more time
I will display product categories along with category-wise data, implement login and signup authentication, add a Buy Now feature, show order tracking updates, and implement pagination for efficient data loading.

