// Container settings
let container = document.getElementById("container");
container.style.width = window.innerWidth - 40 + "px";
container.style.height = window.innerHeight - 40 + "px";
let width = Number(container.style.width.split("px")[0]);
let height = Number(container.style.height.split("px")[0]);

ballWidth = Math.min(width, height) * 0.1

// Run the moveBalls function every 15ms
let movement = setInterval(moveBalls, 15);

// Random Angle Ball
let speed = 10;

let ballsArray = [];

function ballFactory() {
    return {
        ballName: 'ball_' + ballsArray.length,
        xDirection: ((Math.random() - 0.5) * 2) * speed,
        yDirection: ((Math.random() - 0.5) * 2) * speed,
    }
}

let radius = "100%";

// On click of Add Ball add new ball to array
let addBtn = document.getElementById("add-ball");
addBtn.addEventListener('click', () => {
    ballsArray.push(ballFactory());
    ballsArray.forEach(element => {
        if (ballsArray.indexOf(element) === ballsArray.length - 1) {
            let newBall = document.createElement('div');
            newBall.id = element.ballName;
            newBall.style.width = ballWidth + "px";
            newBall.style.height = newBall.style.width;
            // Save width in object use in boundary check
            element.currentWidth = newBall.style.width;
            newBall.style.backgroundColor = `hsl(${Math.floor(Math.random() * 361)}, 80%, 50%)`;
            newBall.style.position = "absolute";
            newBall.style.top = height / 2 - ballWidth / 2 + "px";
            newBall.style.left = width / 2 - ballWidth / 2 + "px";
            newBall.style.borderRadius = radius; 
            container.appendChild(newBall);
        }
    })
})

// Button to change shape from circle to square
let changeShape = document.getElementById("change-shape");
changeShape.addEventListener('click', () => {
    radius = document.getElementById("ball_0").style.borderRadius;
    if (radius === "100%") {
        ballsArray.forEach(obj => {
            let currentBall = document.getElementById(obj.ballName);
            currentBall.style.borderRadius = "0%";
        })
        radius = "0%";
    } else {
        ballsArray.forEach(obj => {
        let currentBall = document.getElementById(obj.ballName);
        currentBall.style.borderRadius = "100%";
        })
        radius = "100%";
    }
});

// Slider to change ball size
let slider = document.getElementById("my-range");
slider.oninput = function() {
    ballWidth = this.value;
    ballsArray.forEach(obj => {
        obj.currentWidth = ballWidth + "px";
        let currentBall = document.getElementById(obj.ballName);
        currentBall.style.width = obj.currentWidth;
        currentBall.style.height = obj.currentWidth;
    })
}

// Move the balls by the specified amount in each object
function moveBalls() {
    ballsArray.forEach(obj => {
        // Get each ball current position
        let currentBall = document.getElementById(obj.ballName);
        let y = currentBall.style.top.split("px")[0];
        let x = currentBall.style.left.split("px")[0];

        // Check if outside boundaries
        if (y >= height - obj.currentWidth.split("px")[0]) {
            obj.yDirection = -Math.abs(obj.yDirection);
        } else if (y < 0) {
            obj.yDirection = Math.abs(obj.yDirection);
        } else if (x >= width - obj.currentWidth.split("px")[0]) {
            obj.xDirection = -Math.abs(obj.xDirection);
        } else if (x < 0) {
            obj.xDirection = Math.abs(obj.xDirection);
        }

        // Update ball position
        currentBall.style.top = (Number(y) + obj.yDirection) + "px";
        currentBall.style.left = (Number(x) + obj.xDirection) + "px";

    })

}

