"use strict";
// move status part
let zombieArray = [];
let reset_button = document.getElementById("reset_button");
let zombies_container = document.getElementById("cursor_container");
let mouse_status = document.getElementById("mouse__pos");
let button = document.getElementById("button");
let last_zombie_delay = 100;
let last_zombie_id = 0;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// click button code
class Zombie {
    constructor(position, delay, id) {
        this.position = position;
        this.id = id;
        this.delay = delay;
        this.ref = document.createElement("div");
        this.ref.setAttribute("id", `zombie_${this.id}`);
        this.ref.style.left = `${this.position[0]}px`;
        this.ref.style.backgroundColor = `#${getRandom(5, 9)}${getRandom(
            5,
            9
        )}${getRandom(5, 9)}`;
        this.ref.style.top = `${this.position[1]}px`;
        this.ref.style.transition = `top ${this.delay}ms, left ${this.delay}ms,transform 0.5s `;

        this.ref.style.transitionTimingFunction =
            "cubic-bezier(0.44, 0.47, 0.73, 0.72)";
        this.position = position;
        this.pos_diff = [getRandom(0, 100), getRandom(0, 100)];
    }
    updatePosition(new_position) {
        // se movera al zombie a new_position aplicando la diferencia de espacio del mismo
        this.position = [
            new_position[0] - this.pos_diff[0],
            new_position[1] - this.pos_diff[1],
        ];
        this.ref.style.left = `${this.position[0]}px`;
        this.ref.style.top = `${this.position[1]}px`;
    }
    updateRelativePosition(ref_pos, pos_move) {
        // se movera al zombie a ref_pos aplicando pos_move
        let random = getRandom(0, 50);
        if (random > 20) {
            this.position = [
                ref_pos[0] - pos_move[0],
                ref_pos[1] - pos_move[1],
            ];
        } else {
            this.position = [
                ref_pos[0] + pos_move[0],
                ref_pos[1] + pos_move[1],
            ];
        }
        this.ref.style.left = `${this.position[0]}px`;
        this.ref.style.top = `${this.position[1]}px`;
    }
}

button.addEventListener("click", (event) => {
    if (zombieArray.length === 0) {
        reset_button.style.left = "80%";
    }
    last_zombie_id++;
    last_zombie_delay += 50;
    let new_zombie = new Zombie([-800, 500], last_zombie_delay, last_zombie_id);
    zombieArray.push(new_zombie);
    zombies_container.appendChild(new_zombie.ref);
});

document.addEventListener("mousemove", (event) => {
    let new_position = [event.x, event.y];
    zombieArray.forEach(function (cursor) {
        cursor.updatePosition(new_position);
    });
});

reset_button.addEventListener("click", () => {
    while (zombieArray.length > 0) {
        zombies_container.removeChild(zombieArray.pop().ref);
    }
    last_zombie_delay = 100;
    last_zombie_id = 0;
    reset_button.style.left = "-20%";
});
window.setInterval(() => {
    zombieArray.forEach((zombie) => {
        zombie.updateRelativePosition(zombie.position, [
            getRandom(-10, 10),
            getRandom(-10, 10),
        ]);
    });
}, 150);
