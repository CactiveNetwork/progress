# @cactive/progress

Extremely lightweight progress bar library with additional gradient support.

---

## Installation

```sh
$ yarn add @cactive/progress
```

## Usage

You can import the library and create a progress bar using the following command:

```js
import Progress from "@cactive/progress";

const progress = new Progress();
```

Show the progress bar and begin animating it by calling the `.start()` and it with the `.end()` method. 

```js
progress.start();
await new Promise((resolve) => setTimeout(resolve, 2000));
progress.end();
```

## Customisation

You can customise the progress bar by passing an options object to the constructor.

```js
const progress = new Progress({
  // You can set a static colour if you prefer.
  // colour: "#7289da",
  
  // By default the progress bar will use a gradient.
  variant: "gradient",
  gradient: {
		from: "#7289da",
        to: "#99aab5",
  },
});
```