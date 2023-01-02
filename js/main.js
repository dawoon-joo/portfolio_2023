// tab
const services = document.querySelector('#services');
const services2 = document.querySelector('#about');
const right_box = services.querySelector('.right_box');
const right_box2 = services2.querySelector('.right_box');
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
		new Anim(right_box, {
			prop: 'height',
			value: matchHT(boxs, index),
			duration: 500,
		});
	});
});
btns2.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;
		activatin(btns2, index);
		activatin(boxs2, index);
		new Anim(right_box2, {
			prop: 'height',
			value: matchHT(boxs2, index),
			duration: 500,
		});
	});
});

function matchHT(el, index) {
	let ht = getComputedStyle(el[index]).height; //height값을 가지고 오되, 400px이라는 문자값으로 가지고 온다
	ht = parseInt(ht); //ht를 정수값으로 변환해서 다시 ht에 대입함
	//console.log(ht);
	return ht; //함수밖에서 값을 적용시키위해 반환시킴
}

function activatin(list, index) {
	for (let el of list) {
		el.classList.remove('on');
	}
	list[index].classList.add('on');
}

//slide
const visual = document.querySelector('#visual');
const slider = visual.querySelector('#slider');
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
});

prev.addEventListener('click', (e) => {
	e.preventDefault();
	if (enableClick) {
		prevSlide();
		enableClick = false;
	}
});

function init() {
	ul.style.left = '-100%';
	ul.prepend(ul.lastElementChild);
	ul.style.width = `${100 * len}%`;
	lis.forEach((el, index) => {
		el.style.width = `${100 / len}%`;
	});
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
		},
	});
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
		},
	});
}

//skipNavi
const skipNavi = document.querySelectorAll('#skipNavi li a');

for (let el of skipNavi) {
	el.addEventListener('focusin', () => {
		el.classList.add('on');
	});
	el.addEventListener('focusout', () => {
		el.classList.remove('on');
	});
}

const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');

btnCall.onclick = function (e) {
	e.preventDefault();
	btnCall.classList.toggle('on');
	menuMo.classList.toggle('on');
};

//textmotion
function txtMotion(el) {
	setTimeout(() => {
		el.classList.add('on');
	}, 500);
	const txtBox = el.querySelector('.txt_box h1');
	const txtLen = txtBox.innerText;
	console.log(txtLen);
	let txtTags = '';
	for (const el of txtLen) txtTags += `<span>${el}</span>`;
	txtBox.innerHTML = txtTags;

	const txtSpan = txtBox.querySelectorAll('span');
	txtSpan.forEach((el, idx) => {
		el.style.transitionDelay = 0.1 * (idx / 4) + 's';
		if (el.innerText == '') {
			el.style.display = 'initial';
		}
	});
}

window.addEventListener('load', () => {
	txtMotion(visual);
});
