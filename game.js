const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 50,
  y: 0,
  width: 30,
  height: 30,
  color: '#00f',
  dy: 0,
  gravity: 1,
  grounded: false,
  jump: function () {
    if (this.grounded) {
      this.dy = -15;
      this.grounded = false;
    }
  },
  update: function () {
    this.dy += this.gravity;
    this.y += this.dy;

    if (this.y + this.height > ground.y) {
      this.y = ground.y - this.height;
      this.dy = 0;
      this.grounded = true;
    }
  },
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

const ground = {
  y: 270,
  height: 50,
  color: '#654321',
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, this.y, canvas.width, this.height);
  }
};

const obstacle = {
  x: canvas.width,
  y: ground.y - 30,
  width: 30,
  height: 30,
  speed: 5,
  color: '#f00',
  update: function () {
    this.x -= this.speed;
    if (this.x + this.width < 0) {
      this.x = canvas.width + Math.random() * 300;
    }
  },
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

let gameOver = false;

function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  obstacle.update();

  ground.draw();
  player.draw();
  obstacle.draw();

  if (detectCollision(player, obstacle)) {
    gameOver = true;
    alert("Game Over! Refresh to try again.");
    return;
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    player.jump();
  }
});

gameLoop();
