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

```javascript
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

Vue:

```javascript
<script setup>
import { GifRenderer } from "gif-controller";
import { onMounted, ref } from "vue";

const gif = ref(null);
let gifRenderer = null;

onMounted(() => {
  gifRenderer = new GifRenderer(gif.value);
  gifRenderer.startRendering();
});
</script>
```

# License

MIT
