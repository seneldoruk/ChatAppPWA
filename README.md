## ChatAppPWA

My aim is to implement some functionalities that are normally implemented in native apps (including cross platform frameworks like React Native or Flutter) using Web APIs in a Progressive Web App (PWA) to find out what the pain points are and if they are even possible.

## Compatibility

Not all Web APIs are implemented in all platforms and browsers. Below is the compability table for the relevant APIs.

| Functionality      | Web API                                                                                                         | iOS | Android |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | :-: | :-----: |
| Notifications      | [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)                         | ✅  |   ❕    |
| Gyroscope          | [Sensor APIs](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs)                                     | ❌️ |   ✅    |
| Geolocation        | [Geolocation APIs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)                            | ✅  |   ✅    |
| Camera             | [MediaStream Image Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API) | ❌  |   ✅    |
| Filesystem Access  | [File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)                             | ❕  |   ❕    |
| Offline Usage      | [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)                                             | ✅  |   ✅    |
| Local Data Storage | [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)                                 | ✅  |   ✅    |

## Polyfills

There are polyfills available for some of the Web APIs which is in scope of this project to test.

| Polyfill                                                                                   |   For   | Notes                                               |
| ------------------------------------------------------------------------------------------ | :-----: | --------------------------------------------------- |
| [Sensor APIs](https://github.com/kenchris/sensor-polyfills)                                |   iOS   |                                                     |
| [MediaStream Image Capture API](https://github.com/GoogleChromeLabs/imagecapture-polyfill) |   iOS   |                                                     |
| Notifications API                                                                          | Android | Polyfill isn't needed since it's mostly implemented |
| File System API                                                                            |  Both   | Polyfill isn't needed since it's mostly implemented |

## Implementation in Practice

| Functionality      | Implemented in | Notes                                                                                                 |
| ------------------ | :------------: | ----------------------------------------------------------------------------------------------------- |
| Notifications      |  example.tsx   |                                                                                                       |
| Gyroscope          |                |                                                                                                       |
| Geolocation        |                |                                                                                                       |
| Camera             |                |                                                                                                       |
| Filesystem Access  |                |                                                                                                       |
| Offline Usage      |                |                                                                                                       |
| Local Data Storage |                | IndexedDB is a low level API but there is a [wrapper](https://github.com/jakearchibald/idb) available |

## Helpful Articles

IndexedDB

- [Working with IndexedDB](https://web.dev/articles/indexeddb)
- [IndexedDB (IDB) Overview for Database People](https://chromium.googlesource.com/chromium/src/third_party/+/master/blink/renderer/modules/indexeddb/docs/idb_overview.md)