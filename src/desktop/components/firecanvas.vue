<template>
  <canvas ref="canvas" class="fire-canvas"></canvas>
</template>

<script>
export default {
  name: "firecanvas",
  mounted() {
    const el = this.$refs.canvas;
    if (!el) return;
    const ctx = el.getContext("2d");
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      el.width = Math.floor(w * dpr);
      el.height = Math.floor(h * dpr);
      el.style.width = w + "px";
      el.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let particles = [];
    let time = 0;

    function randColor() {
      // base warm colors
      const cols = [
        [255, 60, 10],
        [255, 120, 10],
        [255, 200, 20],
        [255, 40, 160],
        [255, 100, 120],
      ];
      return cols[Math.floor(Math.random() * cols.length)];
    }

    class Particle {
      constructor(cx, cy) {
        const spread = Math.min(window.innerWidth, 600);
        this.baseX = cx + (Math.random() - 0.5) * spread * 0.2;
        this.x = this.baseX;
        this.y = cy + Math.random() * 40;
        this.sizeX = Math.random() * 8 + 6; // width
        this.sizeY = Math.random() * 40 + 40; // vertical length (longer = flame tongue)
        this.speedY = -(Math.random() * 2.5 + 1.2);
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.rgb = randColor();
        this.life = Math.random() * 40 + 80; // longer life for elongated flame
        this.maxLife = this.life;
        this.seed = Math.random() * 1000;
      }

      update(dt) {
        // vertical movement
        this.y += this.speedY * dt;
        // subtle lateral oscillation to simulate flicker
        const flick = Math.sin((time + this.seed) * 0.02) * 0.6;
        this.x = this.baseX + flick * (1 - (this.maxLife - this.life) / this.maxLife) * 30;
        this.sizeY *= 0.995;
        this.sizeX *= 0.995;
        this.life -= 0.8 * dt;
      }

      draw(ctx) {
        const t = 1 - Math.max(this.life / this.maxLife, 0);
        // color shifts from white/yellow center to orange/red outer
        const r = Math.min(255, this.rgb[0] + t * 80);
        const g = Math.max(20, this.rgb[1] - t * 60);
        const b = Math.max(0, this.rgb[2] - t * 60);
        const alpha = Math.max(this.life / this.maxLife, 0);

        // radial gradient but use ellipse by scaling context
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        // scale on y to create vertical flame tongue
        ctx.scale(1, this.sizeY / (this.sizeX + 1));
        const radius = Math.max(1, this.sizeX);
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        grd.addColorStop(0, `rgba(255,255,255, ${Math.min(1, 0.9 * (1 - t) + 0.2)})`); // bright core
        grd.addColorStop(0.25, `rgba(${r},${g},${b}, ${0.9 * alpha})`);
        grd.addColorStop(0.6, `rgba(${r},${Math.max(g - 40,0)},${Math.max(b - 40,0)}, ${0.5 * alpha})`);
        grd.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = grd;
        ctx.globalCompositeOperation = "lighter";
        ctx.shadowBlur = Math.min(60, this.sizeY * 0.6);
        ctx.shadowColor = `rgba(${r},${g},${b}, ${alpha})`;
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // frame timing
    let last = performance.now();
    function animate(now) {
      const dt = Math.min(2, (now - last) / 16.6667); // normalized ~1 per frame
      last = now;
      time += now * 0.001;

      // subtle trail
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.06)"; // lower = longer trails
      ctx.fillRect(0, 0, el.width / dpr, el.height / dpr);

      // spawn many across entire bottom
      if (particles.length < 1200) {
        for (let i = 0; i < 10; i++) {
          particles.push(new Particle(Math.random() * el.width / dpr, el.height / dpr * 0.95));
        }
      }

      // draw
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(dt);
        p.draw(ctx);
        if (p.life <= 0 || p.sizeY < 1) particles.splice(i, 1);
      }

      requestAnimationFrame(animate);
    }

    animate(performance.now());

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // cleanup
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", onResize);
      // cancelAnimationFrame handled implicitly when component destroyed, but we keep raf if needed
    });
  },
};
</script>

<style scoped>
.fire-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>



