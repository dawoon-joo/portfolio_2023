const sections = document.querySelectorAll('section');
const scroll = document.querySelector('#scroll');
const scroll_lis = scroll.querySelectorAll('li');
let posArr = [];
const base = -300;

for (let el of sections) {
	posArr.push(el.offsetTop);
}

window.addEventListener('scroll', () => {
	let scroll = window.scrollY || window.pageYOffset;
	sections.forEach((el, index) => {
		if (scroll >= posArr[index] + base) {
			scroll_lis.forEach((el, index) => {
				el.classList.remove('on');
				sections[index].classList.remove('on');
			});

			scroll_lis[index].classList.add('on');
			sections[index].classList.add('on');
		}
	});
});

scroll_lis.forEach((el, index) => {
	el.addEventListener('click', () => {
		new Anim(window, {
			prop: 'scroll',
			value: posArr[index] + base,
			duration: 500,
		});
	});
});
