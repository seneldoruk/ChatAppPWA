## ChatAppPWA

I aim to implement some functionalities that are normally implemented in native apps (including cross-platform
frameworks like React Native or Flutter) using Web APIs in a Progressive Web App (PWA) to find out what the pain points
are and if they are even possible.

## Compatibility

Not all Web APIs are implemented in all platforms and browsers. Below is the compatibility table compiled
from [caniuse.com](https://caniuse.com/) for the relevant APIs.

| Functionality      | Web API                                                                                                         |                           iOS                            |                                              Android                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| Notifications      | [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)                         |  Requires website to first be added to the Home Screen   | new Notification() constructor isn't available but notifications can be sent from a Service Worker |
| Gyroscope          | [Sensor APIs](https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs)                                     |                           ❌️                            |                                                 ✅                                                 |
| Geolocation        | [Geolocation APIs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)                            |                            ✅                            |                                                 ✅                                                 |
| Camera             | [MediaStream Image Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API) |                            ❌                            |                                                 ✅                                                 |
| Filesystem Access  | [File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)                             | Only supports the Origin Private File System (OPFS) part |                      Only supports the Origin Private File System (OPFS) part                      |
| Offline Usage      | [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)                                             |                            ✅                            |                                                 ✅                                                 |
| Local Data Storage | [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)                                 |                            ✅                            |                                                 ✅                                                 |
| Biometric Auth     | [Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)               |                            ✅                            |                                                 ✅                                                 |
| Contacts           | [Contact Picker API](https://developer.mozilla.org/en-US/docs/Web/API/Contact_Picker_API)                       |                            ❌                            |                                                 ✅                                                 |

## Workarounds

| API                           | Workaround                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sensor APIs                   | [DeviceMotion and DeviOrientation](https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Orientation_and_motion_data_explained) events are available for all browsers |
| MediaStream Image Capture API | Instead used an \<input type="file" accept="image/"/>, which is not customizable but can be used to take a photo                                                                           |
| Contact Picker API            | [HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) can make Safari autofill the fields with a contact                                |

## Implementation in Practice

| Functionality      | Example                                                                                                                                                |                                     Implemented in                                     | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Notifications      | ![Notification](/assets/notification.png) Shows notification when there are new messages                                                               |            [notificationUtils.ts](frontend/src/utils/notificationUtils.ts)             | Sending notifications while the app is running is trivial. Notifications while the app is not running require [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API), which requires a Push Service and the permitted service depends on the browser. Just fetching data in the background without sending any notification requires [Web Periodic Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API), which is experimental.                |
| Gyroscope          | ![Closes Chat ](/assets/shake.gif) Closes the chat when phone is shaken                                                                                |         [shakeListener.ts](frontend/src/components/main/chat/shakeListener.ts)         | Testing the event is rather hard, a lot of people have unanswered questions on StackOverflow about the event not getting triggered on simulators, although this is specific to DeviceMotion if only current position is required and the rate of change isn't relevant, it wouldn't cause any problems                                                                                                                                                                                                                                 |
| Geolocation        | ![Geolocation](/assets/location.gif) User can send a Google Maps link with the current location                                                        |    [useSpecialMessage.tsx](frontend/src/components/main/chat/useSpecialMessage.tsx)    | API is straightforward, no need to ask for permissions since it's automatically done when the getCurrentLocation function is called.                                                                                                                                                                                                                                                                                                                                                                                                   |
| Camera             | ![Camera](/assets/camera.jpeg) User can send a photo taken at the moment or from their photos                                                          | [SpecialMessageButton.tsx](frontend/src/components/main/chat/SpecialMessageButton.tsx) | API is a bit lower-level but there are [simpler abstractions](https://github.com/mabelanger/jslib-html5-camera-photo) available, and also [a react library](https://www.npmjs.com/package/react-html5-camera-photo). But just using an input with type="file" accepts="image/" and handling the rest with the File API is also possible and simpler.                                                                                                                                                                                   |
| Filesystem Access  | ![Filesystem Access](/assets/filesystem.png) User can send and download JS/JSON files                                                                  |    [useSpecialMessage.tsx](frontend/src/components/main/chat/useSpecialMessage.tsx)    | Picking files with the API is simple but [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and [Stream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) APIs to handle the data seems more complicated. It likely won't be a problem when using [backend to get a signed link to upload the file to a bucket](https://www.apollographql.com/blog/file-upload-best-practices#approach-1-signed-url-uploads) like S3 and uploading the file to bucket from the client/frontend.                                |
| Offline Usage      | ![Offline Usage](/assets/offline.gif) Messages are loaded even when there is no internet connection, when the app is accessed as a PWA/Home Screen App |                       [vite.config.ts](frontend/vite.config.ts)                        | Requires designing the app around not making network requests just to load initial data, which I've done using storing messages locally, and caching everything with the service worker. Also requires running the built (non-dev) server to work, which can be done with pnpm serve. [Vite PWA](https://vite-pwa-org.netlify.app/guide/) handles the service worker setup.                                                                                                                                                            |
| Local Data Storage | Messages stored locally for offline usage                                                                                                              |                   [idbUtils.ts](frontend/src/utils/idb/idbUtils.ts)                    | IndexedDB is a low-level API but there is a [small wrapper](https://github.com/jakearchibald/idb) and a [SQL-Like API](https://dexie.org/) available. SQL-Like API is heavier, which is a problem if bundle size is important, although looking at the length of idbUtils, using a higher level API makes sense, and bundle size might matter less in a PWA setting, since it will be cached. There are some [problems with IndexedDB's implementation in Safari](https://dexie.org/docs/safari-issues) that cause bugs on iOS devices |
| Biometric Auth     |                                                                                                                                                        |                                                                                        | Web Auth API is only avaliable for server auth and requires designing the users table in DB for the API, which is complicated but there are also some libraries avaliable for different languages. The problem for its use with PWAs is that it can't be used for local and offline auth, such as blurring messages before authenticating with finger/face so that functionality can only be implemented with a PIN as usual.                                                                                                          |
| Contact Picker     | ![Contacts](/assets/contacts.jpeg)                                                                                                                     |                [NewChat.tsx](frontend/src/components/main/NewChat.tsx)                 | It is an experimental API only implemented in Chrome in Android and in none of the other platforms/OSs/browsers.                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Thoughts

Overall, I don't think PWAs have good developer experience. APIs are implemented too inconsistently between platforms,
OSs, browsers, versions, and if the site is accessed from the homepage or directly inside the browser. Documentation
about the implementations isn't good either, I've different statuses for the same functions on "caniuse" and "mdn" (in
that case, caniuse is probably the correct one). Documentations in general are scarce.

Debugging is a bit complicated too. A PWA must be tested in different combinations of OSs, platforms, and so on due to
the inconsistencies of implementations. But since PWA and many of its APIs require connections over https, that must be
somehow enabled too. But other devices in the network, that can't access the app through "localhost" (including iOS
environment simulated by Xcode) won't trust a self-signed certificate. Even if the frontend is somehow trusted,
connections to the backend are somehow not. So just to be able to test the app correctly, you need to have a proper TLS
certificate (or figure out a way to make the browser accept the certificate) and maybe deploy the app to a trusted
domain.

Due to these reasons, I don't think choosing PWAs for cross-platform development over e.g. React Native makes sense for
a lot of use cases. If a responsive SPA is already built with an architecture that doesn't need many network calls, it
would be trivial to turn that app into a PWA, cache assets, and use some of the APIs that are dependent on Service
Workers. But this is about the only use case I can think of for the developer experience.

Adobe has compiled a list of [PWAs done right](https://business.adobe.com/blog/basics/progressive-web-app-examples).
Only in one of the 12 examples the PWA is designed as the "main" way of interacting with the product. All the other
PWAs are "lite" versions of the real app, created for its lower resource (including network) usage, so aimed at
accessibility rather than DX. Which might make sense for an established app trying to increase its reach.

## Testing the App

App can be tested at [chatapp.doruksenel.xyz](http://chatapp.doruksenel.xyz/). For local development `cd infra && skaffold dev` can be used but /etc/hosts should be edited to point chatapp.doruksenel.xyz to 127.0.0.1 before using skaffold.

## Helpful Articles

IndexedDB

- [Working with IndexedDB](https://web.dev/articles/indexeddb)
- [IndexedDB (IDB) Overview for Database People](https://chromium.googlesource.com/chromium/src/third_party/+/master/blink/renderer/modules/indexeddb/docs/idb_overview.md)
- [How is localStorage different from indexedDB?](https://softwareengineering.stackexchange.com/questions/219953/how-is-localstorage-different-from-indexeddb)

PWAs

- [Learn PWA](https://web.dev/learn/pwa/)
- [Vite PWA](https://vite-pwa-org.netlify.app/guide/)

WebAuth

- [Guide to Web Authentication](https://webauthn.guide/)
- [Meet Face ID and Touch ID for the Web](https://webkit.org/blog/11312/meet-face-id-and-touch-id-for-the-web/)

Gyroscope

- [Device Orientation & Motion](https://web.dev/articles/device-orientation)
