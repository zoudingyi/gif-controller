# gif-controller

It can control your GIF to pause or play!

# Installation

```
npm i gif-controller
```

OR

```
<script src="https://cdn.jsdelivr.net/npm/gif-controller@1.0.2/dist/bundle.js"></script>
```

# Usage

```
const gifRenderer = new GifRenderer('#img');
gifRenderer.startRendering();
```

Example:

```
  <img id="gifImg" style="width: 200px; height: 200px;" src="/image/lofi.gif" alt="">
  <p><button id="b">stop</button></p>

  <script src="https://cdn.jsdelivr.net/npm/gif-controller@1.0.2/dist/bundle.js"></script>
  <script>
    const gifRenderer = new GifRenderer('#gifImg');
    gifRenderer.startRendering();
    b.onclick = function () {
      if (gifRenderer.paused) {
        this.textContent = 'stop';
        gifRenderer.play();
      } else {
        this.textContent = 'play';
        gifRenderer.pause();
      }
    };
  </script>
```

# License

MIT
