// tab
const services = document.querySelector('#services');
const services2 = document.querySelector('#about');
const btns = services.querySelectorAll('.left_box ul li');
const boxs = services.querySelectorAll('.right_box ul');
const btns2 = services2.querySelectorAll('.left_box ul li');
const boxs2 = services2.querySelectorAll('.right_box ul');



btns.forEach((el, index) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let isOn = e.currentTarget.classList.contains('on');
        if (isOn) return;
        activatin(btns, index);
        activatin(boxs, index);
    })
})

btns2.forEach((el, index) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let isOn = e.currentTarget.classList.contains('on');
        if (isOn) return;
        activatin(btns2, index);
        activatin(boxs2, index);
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

//skipNavi
const skipNavi = document.querySelectorAll('#skipNavi li a');

for(let el of skipNavi){
    el.addEventListener('focusin',()=>{
        el.classList.add('on');
    })
    el.addEventListener('focusout', ()=>{
        el.classList.remove('on');
    })
}