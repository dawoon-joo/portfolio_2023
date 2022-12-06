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