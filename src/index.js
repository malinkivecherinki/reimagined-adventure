// GameEngine - Simple 2D game engine framework
class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.entities = [];
        this.running = false;
    }
    
    addEntity(entity) {
        this.entities.push(entity);
    }
    
    update(deltaTime) {
        this.entities.forEach(entity => {
            if (entity.update) {
                entity.update(deltaTime);
            }
        });
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.entities.forEach(entity => {
            if (entity.render) {
                entity.render(this.ctx);
            }
        });
    }
    
    start() {
        this.running = true;
        let lastTime = 0;
        
        const gameLoop = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            
            this.update(deltaTime);
            this.render();
            
            if (this.running) {
                requestAnimationFrame(gameLoop);
            }
        };
        
        gameLoop(0);
    }
    
    stop() {
        this.running = false;
    }
}

module.exports = GameEngine;
