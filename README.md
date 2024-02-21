# News Headlines App

This React Native app fetches and displays the top news headlines, allowing users to refresh the list, pin their favorite headlines, and delete the ones they're not interested in. It uses local storage to cache headlines for offline access and introduces new headlines at specified intervals.

![Example GIF](screen_recording/demo.gif)

## Features

- Fetch top 100 news headlines from a news API.
- Display the first 10 headlines with the ability to refresh for more.
- Pin/unpin headlines to prioritize viewing.
- Delete headlines from the view.
- Cache headlines for offline viewing.
- Dynamically add up to 5 random headlines every 10 seconds.
- Swipe to refresh functionality to update the headlines list.

## Packages Used

- `react-native`: The framework for building the mobile app.
- `axios`: For making HTTP requests to fetch headlines from the news API.
- `@react-native-async-storage/async-storage`: To store and retrieve headlines for offline access.
- Initially used `uuid` for generating unique identifiers for each headline (later replaced with a custom `Math.random` based ID generator).

## Approach

### Fetching and Storing Headlines

Upon the initial load, the app checks for cached headlines in local storage. If not found, it fetches the top headlines from the news API and caches them. Each headline is assigned a unique identifier using a custom function based on `Math.random` and the current timestamp to ensure uniqueness without relying on external libraries.

### Display and Interaction

The app displays the headlines in a `FlatList`, which supports dynamic loading, refresh control, and efficient rendering of the list. Users can swipe to refresh to fetch new headlines, which are then added to the top of the list without duplicating existing items. Headlines can be pinned/unpinned or deleted, with pinned headlines always appearing at the top of the list.

### Offline Access and Dynamic Updates

Cached headlines ensure that users have access to news even without an internet connection. The app introduces new random headlines at regular intervals to keep the content fresh, with a countdown timer indicating when the next update will occur.
