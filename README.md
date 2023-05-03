# Scroll Right Button

Get the add-on from:
- [Mozilla add-on page]()
- [GitHub Release Page](https://github.com/nralbrecht/scroll-right-button/releases)

A Firefox addon that adds a button to scroll the tab bar all the way to the right.

## Building the add-on

A build pipeline using Gulp is set up to create artifacts that are then able to be installed and published.

First install the build dependencies.
```
npm install
```

Than you can build the Firefox artifact. The result can be found in the `build` directory.
```
npm run build
```

The build output can be found in the `build` directory. To debug the add-on see the respective documentation for [Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).
