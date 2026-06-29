import { useEffect, useMemo, useRef } from 'react';
import './DynamicTechStack.css';

const techItems = [
  { id: 'html', label: 'HTML', color: '#f97316', icon: '<>' },
  { id: 'css', label: 'CSS', color: '#38bdf8', icon: '#{}' },
  { id: 'js', label: 'JS', color: '#facc15', icon: 'JS' },
  { id: 'react', label: 'React', color: '#60a5fa', icon: '⚛' },
  { id: 'tailwind', label: 'Tailwind', color: '#14b8a6', icon: 'TW' },
  { id: 'php', label: 'PHP', color: '#8b5cf6', icon: 'php' },
  { id: 'wordpress', label: 'WordPress', color: '#0ea5e9', icon: 'WP' },
  { id: 'shopify', label: 'Shopify', color: '#22c55e', icon: 'SH' },
  { id: 'elementor', label: 'Elementor', color: '#f43f5e', icon: 'EL' },
];

function DynamicTechStack() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, pressed: false });
  const scrollRef = useRef(0);

  const items = useMemo(() => techItems, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;
    let width = 0;
    let height = 0;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const balls = items.map((item, index) => {
      const radius = index % 2 === 0 ? 44 : 50;
      const x = width / 2 + (index - (items.length - 1) / 2) * 42;
      const y = height / 2 + (index % 2 === 0 ? -40 : 40);
      const vx = (Math.random() - 0.5) * 1.2;
      const vy = (Math.random() - 0.5) * 1.2;

      return {
        ...item,
        radius,
        x,
        y,
        vx,
        vy,
      };
    });

    const update = () => {
      const { x: mouseX, y: mouseY, active, pressed } = mouseRef.current;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const groupRadius = Math.min(width, height) * 0.16;
      const scrollOffset = scrollRef.current * 0.002;

      balls.forEach((ball, index) => {
        const angle = (index / balls.length) * Math.PI * 2;
        const targetX = centerX + Math.cos(angle + scrollOffset) * groupRadius;
        const targetY = centerY + Math.sin(angle + scrollOffset) * groupRadius;

        ball.vx += (targetX - ball.x) * 0.006;
        ball.vy += (targetY - ball.y) * 0.006;
        ball.vx *= 0.965;
        ball.vy *= 0.965;

        const springForce = 0.0022;
        const anchorX = centerX + Math.cos(angle + 0.2 + scrollOffset * 0.7) * groupRadius * 1.08;
        const anchorY = centerY + Math.sin(angle + 0.2 + scrollOffset * 0.7) * groupRadius * 1.08;

        ball.vx += (anchorX - ball.x) * springForce;
        ball.vy += (anchorY - ball.y) * springForce;

        ball.vx += Math.sin((ball.y + index) * 0.01 + scrollOffset) * 0.012;
        ball.vy += Math.cos((ball.x + index) * 0.01 + scrollOffset) * 0.012;

        if (active && pressed) {
          const dx = mouseX - ball.x;
          const dy = mouseY - ball.y;
          const dist = Math.hypot(dx, dy) || 1;

          if (dist < 140) {
            const force = (1 - dist / 140) * 1.8;
            ball.vx += (dx / dist) * force;
            ball.vy += (dy / dist) * force;
          }
        }

        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -0.9;
        } else if (ball.x + ball.radius > width) {
          ball.x = width - ball.radius;
          ball.vx *= -0.9;
        }

        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= -0.9;
        } else if (ball.y + ball.radius > height) {
          ball.y = height - ball.radius;
          ball.vy *= -0.9;
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${ball.color}22`;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `${ball.color}88`;
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ball.label, ball.x, ball.y);
      });

      frameId = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handlePointerDown = () => {
      mouseRef.current.pressed = true;
    };

    const handlePointerUp = () => {
      mouseRef.current.pressed = false;
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.pressed = false;
    };

    resizeCanvas();
    update();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handleLeave);
    canvas.addEventListener('pointercancel', handleLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handleLeave);
      canvas.removeEventListener('pointercancel', handleLeave);
    };
  }, [items]);

  return (
    <section className="dynamic-tech-stack">
      <div className="dynamic-tech-stack__header">
        <p className="dynamic-tech-stack__eyebrow">Tech Stack Playground</p>
        <h2>Interactive tools that bounce, collide, and respond to your cursor.</h2>
      </div>
      <div className="dynamic-tech-stack__canvas-wrap">
        <canvas ref={canvasRef} className="dynamic-tech-stack__canvas" />
      </div>
    </section>
  );
}

export default DynamicTechStack;
