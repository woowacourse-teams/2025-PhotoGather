import { useEffect, useRef } from 'react';
import { theme } from '../../../styles/theme';
import * as S from './SparkleLightTrail.styles';

<<<<<<< HEAD
/**
 * Inspired by CodePen by Jack Rugile
 * Original animation concept by Ramiro Galan
 * https://codepen.io/jackrugile/pen/WNxLvrm
 * Modified and adapted for React + Emotion by [Your Name], [Date]
 */

=======
>>>>>>> develop
const SparkleLightTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    let cw = 0;
    let ch = 0;

    const rand = (a: number, b: number) => ~~(Math.random() * (b - a + 1) + a);
    const dToR = (degrees: number) => degrees * (Math.PI / 180);

    const circle = {
      x: cw / 2 + 5,
      y: ch / 2 + 22,
      radius: 260,
      speed: 3,
      rotation: 0,
      angleStart: 270,
      angleEnd: 90,
      hue: 260,
      thickness: 12,
      blur: 300,
    };

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }[] = [];

    const particleMax = 100;

    ctx.shadowBlur = circle.blur;
    ctx.shadowColor = theme.colors.primary;
    ctx.lineCap = 'round';

    const gradient1 = ctx.createLinearGradient(
      0,
      -circle.radius,
      0,
      circle.radius,
    );
    gradient1.addColorStop(0, `hsla(${circle.hue}, 60%, 50%, .25)`);
    gradient1.addColorStop(1, `hsla(${circle.hue}, 60%, 50%, 0)`);

    const gradient2 = ctx.createLinearGradient(
      0,
      -circle.radius,
      0,
      circle.radius,
    );
    gradient2.addColorStop(0, `hsla(${circle.hue}, 100%, 100%, .7)`);
    gradient2.addColorStop(0.1, `hsla(${circle.hue}, 100%, 100%, .7)`);
    gradient2.addColorStop(1, `hsla(${circle.hue}, 100%, 100%, .7)`);

    const updateCircle = () => {
      circle.rotation = (circle.rotation + circle.speed) % 360;
    };

    const resizeCanvas = () => {
      const rect = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      c.width = rect.width * dpr;
      c.height = rect.height * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cw = rect.width;
      ch = rect.height;

      circle.x = cw / 2;
      circle.y = ch / 2;
      const size = Math.min(cw, ch);
      circle.radius = size * 0.4;
    };

    const renderCircle = () => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation));
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        circle.radius,
        dToR(circle.angleStart),
        dToR(circle.angleEnd),
        true,
      );
      ctx.lineWidth = circle.thickness;
      ctx.strokeStyle = gradient1;
      ctx.stroke();
      ctx.restore();
    };

    const renderCircleBorder = () => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation));
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        circle.radius + circle.thickness / 2,
        dToR(circle.angleStart),
        dToR(circle.angleEnd),
        true,
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = gradient2;
      ctx.stroke();
      ctx.restore();
    };

    const renderCircleFlare = () => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation + 185));
      ctx.scale(1, 1);
      ctx.beginPath();
      ctx.arc(0, circle.radius, 30, 0, Math.PI * 2, false);
      ctx.closePath();
      const gradient3 = ctx.createRadialGradient(
        0,
        circle.radius,
        0,
        0,
        circle.radius,
        30,
      );
      gradient3.addColorStop(0, 'hsla(330, 50%, 50%, .35)');
      gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
      ctx.fillStyle = gradient3;
      ctx.fill();
      ctx.restore();
    };

    const renderCircleFlare2 = () => {
      ctx.save();
      ctx.translate(circle.x, circle.y);
      ctx.rotate(dToR(circle.rotation + 165));
      ctx.scale(1.5, 1);
      ctx.beginPath();
      ctx.arc(0, circle.radius, 25, 0, Math.PI * 2, false);
      ctx.closePath();
      const gradient4 = ctx.createRadialGradient(
        0,
        circle.radius,
        0,
        0,
        circle.radius,
        25,
      );
      gradient4.addColorStop(0, 'hsla(30, 100%, 50%, .2)');
      gradient4.addColorStop(1, 'hsla(30, 100%, 50%, 0)');
      ctx.fillStyle = gradient4;
      ctx.fill();
      ctx.restore();
    };

    const createParticles = () => {
      if (particles.length < particleMax) {
        particles.push({
          x:
            circle.x +
            circle.radius * Math.cos(dToR(circle.rotation - 85)) +
            (rand(0, circle.thickness * 2) - circle.thickness),
          y:
            circle.y +
            circle.radius * Math.sin(dToR(circle.rotation - 85)) +
            (rand(0, circle.thickness * 2) - circle.thickness),
          vx: (rand(0, 100) - 50) / 1000,
          vy: (rand(0, 100) - 50) / 1000,
          radius: rand(1, 6) / 2,
          alpha: rand(10, 20) / 100,
        });
      }
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx += (rand(0, 100) - 50) / 750;
        p.vy += (rand(0, 100) - 50) / 750;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;
        if (p.alpha < 0.02) particles.splice(i, 1);
      }
    };

    const renderParticles = () => {
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillRect(p.x, p.y, p.radius, p.radius);
        ctx.closePath();
        ctx.fillStyle = `hsla(0, 0%, 100%, ${p.alpha})`;
      }
    };

    const clear = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = 'lighter';
    };

    let animationFrameId: number;

    const loop = () => {
      clear();
      updateCircle();
      renderCircle();
      renderCircleBorder();
      renderCircleFlare();
      renderCircleFlare2();
      createParticles();
      updateParticles();
      renderParticles();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <S.Container>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </S.Container>
  );
};

export default SparkleLightTrail;
