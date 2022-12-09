// tab
const services = document.querySelector('#services');
const btns = services.querySelectorAll('.left_box ul li');
const boxs = services.querySelectorAll('.right_box ul');


btns.forEach((el, index) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let isOn = e.currentTarget.classList.contains('on');
        if (isOn) return;
        activatin(btns, index);
        activatin(boxs, index);
    })

})

function activatin(list, index) {
    for (let el of list) {
        el.classList.remove('on')
    }
    list[index].classList.add('on');
}

//slide
const visual = document.querySelector('#visual')
const slider = visual.querySelector('#slider')
const ul = slider.querySelector('ul');
const lis = ul.querySelectorAll('li');
const prev = visual.querySelector('.prev');
const next = visual.querySelector('.next');
const len = lis.length;
const ul2 = visual.querySelector('.lists');
const lis2 = ul2.querySelectorAll('li');
const len2 = lis2.length;

let enableClick = true;
init();

next.addEventListener('click', (e) => {
    e.preventDefault();
    if (enableClick) {
        nextSlide();
        enableClick = false;
    }
})

prev.addEventListener('click', (e) => {
    e.preventDefault();
    if (enableClick) {
        prevSlide();
        enableClick = false;
    }
})

lis2.forEach((el, index)=>{
    for(let el of lis2){
        el.addEventListener('click', (e)=>{
            if(enableClick){
                moveSlide(index);
                enableClick = false;
            }
        })
    }
})

// for (let i = 0; i < len2.length; i++) {
//     lis2[i].addEventListener('click', (e) => {
//         e.preventDefault();
//             if (enableClick) {
//                 ul.style.left = `${index * -100}%`;
//                 // enableClick = false;
//                 i++
//             }
//     })
// }

function init() {
    ul.style.left = '-100%';
    ul.prepend(ul.lastElementChild);
    ul.style.width = `${100 * len}%`;
    lis.forEach((el, index) => {
        el.style.width = `${100 / len}%`;
    })
}

function nextSlide() {
    new Anim(ul, {
        prop: 'left',
        value: '-200%',
        duration: 500,
        callback: () => {
            ul.style.left = '-100%';
            ul.append(ul.firstElementChild);
            enableClick = true;
        }
    })
}

function prevSlide() {
    new Anim(ul, {
        prop: 'left',
        value: '0%',
        duration: 500,
        callback: () => {
            ul.style.left = '-100%';
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }

    })
}

function moveSlide(index) {
    new Anim(ul, {
        prop: 'left',
        value: '0%',
        duration: 500,
        callback: () => {
            ul.style.left = `${index * -100}%`;
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }

    })
}