# MapGestureController visualization extension

Chrome web browser extension for [MapGestureController](https://github.com/jonas-hurst/MapGestureController). Visualizes where the user points at on the screen.

## Supported Sites

Currently, only OpenStreetMap, Google Maps and locally hosted map applications are supported. To add more sites, add them to this respository's manifest.json file.

## Functionality
This extension tries to open a websocket conection to localhost:8765, which is the websocket server opened by MapGestureController. If the connection establishes successfully, two div elements are inserted into the web page. They serve as a pointer, one for each hand. The extension receives the location on the screen where the user points at through the websocket connection. The div elements will be placed there.

## Usage
* Start MapGestureController
* Start the camera and enable TouchControl
* Open a supported web page (e.g. [OpenStreetMap](openstreetmap.org))
* The extension will ask whether a conection should be established to the websocket server -> click Okay
* Start using the gestures

## Installation
* go to Chrome's [extension page](chrome://extensions)
* activate developer mode (toggle in the upper right corner)
* Click _Load unpacked_
* Select this folder