const blk_pitn = {
    block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]], block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]], block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]], block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
    block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]], block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
    block9: [[0, -1], [0, 0], [-1, 0], [1, 0]], block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
    block11: [[2, 0], [0, 0], [-1, 0], [1, 0]], block12: [[0, 1], [0, 0], [-1, 0], [0, -1]],
    block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]], block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
    block15: [[1, -1], [0, 0], [-1, 0], [1, 0]], block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
    block17: [[0, 1], [0, 0], [-1, 0], [0, -1]], block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
    block19: [[0, -1], [0, 0], [-1, 0], [1, 0]], block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
    block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]], block22: [[1, 1], [0, 0], [-1, 0], [1, 0]],
    block23: [[0, 2], [0, 0], [0, -1], [0, 1]]
};

const offset_pitn = {
    block1: [5, 3], block2: [5, 1], block3: [3, 4], block4: [3, 2], block5: [3, -1],
    block6: [2, 5], block7: [2, 1], block8: [1, -1], block9: [1, -3], block10: [1, 2],
    block11: [0, 3], block12: [0, 0], block13: [-1, -4], block14: [0, -2], block15: [-2, 4],
    block16: [-2, 2], block17: [-2, 0], block18: [-3, -2], block19: [-4, 0], block20: [-3, 5],
    block21: [-5, 3], block22: [-4, 1], block23: [-6, 1]
};

let blocks = document.getElementsByClassName("block"),
    block = blocks[0],
    love = document.getElementsByClassName("love")[0],
    timer = null, index = 0;

function Next() {
    index++;
    if (index >= 24) {
        clearInterval(timer);
        // انتظر ثانية واحدة بعد اكتمال الرسم ثم اصعد
        setTimeout(Rise, 1000);
        return;
    }
    block.style.visibility = "visible";
    let block_left = parseFloat(window.getComputedStyle(block).left);
    let block_top = parseFloat(window.getComputedStyle(block).top);

    let new_block = block.cloneNode(true);
    new_block.style.left = block_left + 40 * offset_pitn["block" + index][0] + "px";
    new_block.style.top = block_top - 40 * offset_pitn["block" + index][1] + "px";
    
    for (let i = 0; i < new_block.children.length; i++) {
        new_block.children[i].style.left = blk_pitn["block" + index][i][0] * -40 + "px";
        new_block.children[i].style.top = blk_pitn["block" + index][i][1] * -40 + "px";
    }
    love.appendChild(new_block);
}

function Rise() {
    let distance = 0;
    const target = 180; // المسافة التي سيصعدها القلب للأعلى
    let love_top = parseFloat(window.getComputedStyle(love).top);

    let timer2 = setInterval(() => {
        distance += 1; // حركة بطيئة وناعمة
        if (distance >= target) {
            clearInterval(timer2);
            // إظهار الرسالة والكلمة النهائية
            document.getElementById("message-box").classList.add("reveal");
            setTimeout(() => {
                document.getElementById("words").style.opacity = "1";
            }, 1500);
        }
        love.style.top = (love_top - distance) + "px";
    }, 15);
}

window.onload = function () {
    // الانتظار الأصلي 12 ثانية
    setTimeout(() => {
        timer = setInterval(Next, 300);
    }, 12000); 
};