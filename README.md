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
| Biometric Auth     | [Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)               | ❕  |   ❕    |

## Polyfills

There are polyfills available for some of the Web APIs which is in scope of this project to test.

| Polyfill                                                                                   |   For   | Notes                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------ | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Sensor APIs](https://github.com/kenchris/sensor-polyfills)                                |   iOS   |                                                                                                                                                                                                                                                                     |
| [MediaStream Image Capture API](https://github.com/GoogleChromeLabs/imagecapture-polyfill) |   iOS   |                                                                                                                                                                                                                                                                     |
| Notifications API                                                                          | Android | I won't use a polyfill because althouth new Notification() constructor isn't available for Chrome on Android, [notifications can still be sent from a service worker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification). |
| File System API                                                                            |  Both   | Polyfill isn't needed since it's mostly implemented                                                                                                                                                                                                                 |
| Biometric Auth                                                                             |  Both   | Polyfill isn't needed since it's mostly implemented                                                                                                                                                                                                                 |

## Implementation in Practice

| Functionality      |                          Implemented in                          | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | :--------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Notifications      | [notificationUtils.ts](/frontend/src/utils/notificationUtils.ts) | Sending notifications while the app is running is trivial. Notifications while the app is not running requires [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API), which requires a Push Service and the permitted service depends on the browser. Just fetching data on the background without sending any notification requires [Web Periodic Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API), which is experimental. |
| Gyroscope          |                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Geolocation        |                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Camera             |                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Filesystem Access  |                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Offline Usage      |            [vite.config.ts](/frontend/vite.config.ts)            | Requires designing the app around not making network requests just to load initial data, which I've done using storing messages locally, and caching everyting with the service worker. Also requires running the built (non-dev) server to work, which can be done with pnpm serve. [Vite PWA](https://vite-pwa-org.netlify.app/guide/) handles the service worker setup.                                                                                                                                               |
| Local Data Storage |        [idbUtils.ts](/frontend/src/utils/idb/idbUtils.ts)        | IndexedDB is a low level API but there is a [small wrapper](https://github.com/jakearchibald/idb) and a [SQL-Like API](https://dexie.org/) available. SQL-Like API is heavier, which is a problem if bundle size is important, although looking at the length of idbUtils, using a higher level API makes sense.                                                                                                                                                                                                         |
| Biometric Auth     |                                                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## Helpful Articles

IndexedDB

- [Working with IndexedDB](https://web.dev/articles/indexeddb)
- [IndexedDB (IDB) Overview for Database People](https://chromium.googlesource.com/chromium/src/third_party/+/master/blink/renderer/modules/indexeddb/docs/idb_overview.md)
- [How is localStorage different from indexedDB?](https://softwareengineering.stackexchange.com/questions/219953/how-is-localstorage-different-from-indexeddb)

PWAs

- [Learn PWA](https://web.dev/learn/pwa/)
- [Vite PWA](https://vite-pwa-org.netlify.app/guide/)
