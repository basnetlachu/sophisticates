document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .bento-box, .list-item, .editorial-split, .section-title').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = '#fff';
            cursor.style.mixBlendMode = 'difference';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    // --- Flow Field Animation (Background) ---
    const flowCanvas = document.getElementById('flow-field');
    const flowCtx = flowCanvas.getContext('2d');
    let flowWidth, flowHeight;
    let flowParticles = [];
    const flowScale = 20;
    let flowCols, flowRows;
    let zOff = 0;

    function noise(x, y, z) {
        return Math.sin(x * 0.01 + z) * Math.cos(y * 0.01 + z) * Math.PI * 2;
    }

    function resizeFlow() {
        flowWidth = flowCanvas.width = window.innerWidth;
        flowHeight = flowCanvas.height = window.innerHeight;
        flowCols = Math.floor(flowWidth / flowScale);
        flowRows = Math.floor(flowHeight / flowScale);
        initFlowParticles();
    }

    class FlowParticle {
        constructor() {
            this.pos = { x: Math.random() * flowWidth, y: Math.random() * flowHeight };
            this.vel = { x: 0, y: 0 };
            this.acc = { x: 0, y: 0 };
            this.maxSpeed = 2;
            this.prevPos = { x: this.pos.x, y: this.pos.y };
        }

        update() {
            this.vel.x += this.acc.x;
            this.vel.y += this.acc.y;

            const speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
            if (speed > this.maxSpeed) {
                this.vel.x = (this.vel.x / speed) * this.maxSpeed;
                this.vel.y = (this.vel.y / speed) * this.maxSpeed;
            }

            this.prevPos.x = this.pos.x;
            this.prevPos.y = this.pos.y;
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            this.acc.x = 0;
            this.acc.y = 0;

            if (this.pos.x > flowWidth) { this.pos.x = 0; this.prevPos.x = 0; }
            if (this.pos.x < 0) { this.pos.x = flowWidth; this.prevPos.x = flowWidth; }
            if (this.pos.y > flowHeight) { this.pos.y = 0; this.prevPos.y = 0; }
            if (this.pos.y < 0) { this.pos.y = flowHeight; this.prevPos.y = flowHeight; }
        }

        applyForce(force) {
            this.acc.x += force.x;
            this.acc.y += force.y;
        }

        follow(vectors) {
            const x = Math.floor(this.pos.x / flowScale);
            const y = Math.floor(this.pos.y / flowScale);
            const index = x + y * flowCols;
            if (vectors[index]) {
                this.applyForce(vectors[index]);
            }
        }

        show() {
            flowCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            flowCtx.lineWidth = 1;
            flowCtx.beginPath();
            flowCtx.moveTo(this.prevPos.x, this.prevPos.y);
            flowCtx.lineTo(this.pos.x, this.pos.y);
            flowCtx.stroke();
        }
    }

    function initFlowParticles() {
        flowParticles = [];
        for (let i = 0; i < 500; i++) {
            flowParticles.push(new FlowParticle());
        }
    }

    function animateFlow() {
        flowCtx.clearRect(0, 0, flowWidth, flowHeight);

        let flowField = new Array(flowCols * flowRows);

        for (let y = 0; y < flowRows; y++) {
            for (let x = 0; x < flowCols; x++) {
                const index = x + y * flowCols;
                const angle = noise(x * flowScale, y * flowScale, zOff);
                const v = { x: Math.cos(angle), y: Math.sin(angle) };
                flowField[index] = v;
            }
        }
        zOff += 0.002;

        for (let i = 0; i < flowParticles.length; i++) {
            flowParticles[i].follow(flowField);
            flowParticles[i].update();
            flowParticles[i].show();
        }

        requestAnimationFrame(animateFlow);
    }

    window.addEventListener('resize', resizeFlow);
    resizeFlow();
    animateFlow();


    // --- Entropy to Order Simulation (Optimization Section) ---
    // Replaces the "Lightning" simulation with a smooth particle convergence
    const simCanvas = document.getElementById('optimization-sim');
    const simCtx = simCanvas.getContext('2d');
    let simWidth, simHeight;
    let particles = [];
    const particleCount = 400;
    let phase = 'chaos'; // 'chaos' or 'order'
    let phaseTimer = 0;
    let coherence = 0;

    function resizeSim() {
        const parent = simCanvas.parentElement;
        simWidth = simCanvas.width = parent.clientWidth;
        simHeight = simCanvas.height = parent.clientHeight;
        initParticles();
    }

    class SimParticle {
        constructor() {
            this.x = Math.random() * simWidth;
            this.y = Math.random() * simHeight;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;

            // Target position for 'order' phase (Sphere/Circle shape)
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * (Math.min(simWidth, simHeight) * 0.3);
            // Or make it a perfect grid? Let's do a Sphere for "Core"
            this.targetX = simWidth / 2 + Math.cos(angle) * radius;
            this.targetY = simHeight * 0.6 + Math.sin(angle) * radius; // Moved down

            // Or a grid?
            // Let's do a 3D-ish rotating sphere projection
            this.theta = Math.random() * Math.PI * 2;
            this.phi = Math.acos((Math.random() * 2) - 1);
            this.radius = Math.min(simWidth, simHeight) * 0.35;
        }

        update(phase, time) {
            if (phase === 'chaos') {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce
                if (this.x < 0 || this.x > simWidth) this.vx *= -1;
                if (this.y < 0 || this.y > simHeight) this.vy *= -1;
            } else {
                // Order: Move to rotating sphere surface
                const rotSpeed = 0.001 * time;
                // 3D projection
                const x3d = this.radius * Math.sin(this.phi) * Math.cos(this.theta + rotSpeed);
                const y3d = this.radius * Math.sin(this.phi) * Math.sin(this.theta + rotSpeed);
                const z3d = this.radius * Math.cos(this.phi);

                // Project to 2D
                const scale = 1; // Perspective
                const tx = simWidth / 2 + x3d * scale;
                const ty = simHeight * 0.6 + y3d * scale; // Moved down

                // Ease to target
                this.x += (tx - this.x) * 0.05;
                this.y += (ty - this.y) * 0.05;
            }
        }

        draw() {
            simCtx.fillStyle = '#fff';
            simCtx.beginPath();
            simCtx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
            simCtx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new SimParticle());
        }
    }

    function animateSim(time) {
        simCtx.clearRect(0, 0, simWidth, simHeight);

        // Phase logic
        phaseTimer++;
        if (phaseTimer > 300) { // Switch every ~5 seconds
            phase = phase === 'chaos' ? 'order' : 'chaos';
            phaseTimer = 0;

            // Update UI text
            const stateEl = document.getElementById('sim-state');
            if (stateEl) stateEl.innerText = phase === 'chaos' ? 'ENTROPY' : 'ORDER';
        }

        // Update coherence metric
        if (phase === 'order' && coherence < 100) coherence += 0.5;
        if (phase === 'chaos' && coherence > 0) coherence -= 0.5;
        const cohEl = document.getElementById('sim-coherence');
        if (cohEl) cohEl.innerText = Math.floor(coherence) + '%';


        particles.forEach(p => {
            p.update(phase, time);
            p.draw();
        });

        // Draw connections if close (only in order phase for structure look)
        if (phase === 'order') {
            simCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            simCtx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = dx * dx + dy * dy;
                    if (dist < 2000) { // Close enough
                        simCtx.moveTo(particles[i].x, particles[i].y);
                        simCtx.lineTo(particles[j].x, particles[j].y);
                    }
                }
            }
            simCtx.stroke();
        }

        requestAnimationFrame((t) => animateSim(t));
    }

    // Initialize Sim when visible
    const simObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            resizeSim();
            animateSim(0);
            simObserver.disconnect();
        }
    });
    const optSection = document.getElementById('optimization');
    if (optSection) simObserver.observe(optSection);

    window.addEventListener('resize', resizeSim);

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

});
