// key : 2a1a0aebb34012a99c23e13b49175343

//https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

//flickr.interestingness.getList
const body = document.querySelector('body');
const frame = document.querySelector('#list');
const main = document.querySelector('main');
const loading = document.querySelector('.loading');

const base = 'https://www.flickr.com/services/rest/?';
const method1 = 'flickr.interestingness.getList'; //가장 관심있는 사진들의 리스트를 가지고오는

const key = '2a1a0aebb34012a99c23e13b49175343';
const per_page = 30;
const format = 'json';

//처음로딩시 호출하는 메서드
const url1 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

frame.addEventListener('click', (e) => {
	e.preventDefault();
	let target = e.target.closest('.item').querySelector('.thumb');

	if (e.target == target) {
		let imgSrc = target.parentElement.getAttribute('href');
		let pop = document.createElement('aside');
		pop.classList.add('pop');
		let pops = `
			<img src='${imgSrc}'>
			<span class='close'>close</span>
		`;
		pop.innerHTML = pops;
		document.querySelector('body').append(pop);
	} else {
		return;
	}
});

body.addEventListener('click', (e) => {
	let pop = body.querySelector('.pop');
	if (pop !== null) {
		let close = pop.querySelector('.close');
		if (e.target == close) {
			pop.remove();
		}
	}
});

//리스트를 만드는 함수
callData(url1);
//함수 분리는 기능의 단위대로 분리한다
//함수 분리 후 해당 분리된 자리에 만든 함수를 호출해야 한다
//함수안에 매개변수를 넣어야 하는지를 살펴봐야한다
function callData(url) {
	frame.innerHTML = '';
	loading.classList.remove('off');
	frame.classList.remove('on');

	fetch(url)
		.then((data) => {
			//console.log(data);// 가져온 데이터 전체를 보여줌
			let result = data.json(); // 가져온 데이터 중에 json형태의 값으로 변환함
			//console.log(result); //결과로 만들어진 데이터를 보여준다
			return result; //해당 결과를 리턴(반환)해줘야 쓸수있다
		})
		.then((json) => {
			// 반환된 값을 json이라는 매개변수로 받은뒤
			let items = json.photos.photo; //콘솔에서 본것처럼 그안의 photos안의 photo로 접근함
			console.log(items); // 500장의 사진이 json객체배열로 가져와짐
			//--------------------------------------------------------- url에서 데이터를 불러오는 기능을 한다

			if (items.length > 0) {
				createList(items);
				//---------------------------------------------- 진짜 list 만드는 기능을 한다

				delayLoading();

				//-------------------------------- 로딩을 시켜서 딜레이를 하는 기능
			} else {
				loading.classList.remove('off');
				alert('데이터가 없습니다.');
			}
		});
}

function createList(items) {
	let htmls = '';

	items.map((el) => {
		console.log(el);

		let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
		//이미지의 썸네일 url주소
		let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
		//큰이미지 url주소

		htmls += `
    <li class="item">
      <div>
        <a href=${imgSrcBig}>
          <img class='thumb' src=${imgSrc}>
        </a>
        <p>${el.title}</p>
        <span>
          <img class='profile' src="http://farm${el.farm}.staticflickr.com/${el.server}/buddyicons/${el.owner}.jpg">
          <strong>${el.owner}</strong>
        </span>
      </div>
    </li>
  `;
	});

	frame.innerHTML = htmls;
}

function delayLoading() {
	const imgs = frame.querySelectorAll('div a img');
	const len = imgs.length;

	let count = 0;

	for (let el of imgs) {
		el.addEventListener('load', () => {
			count++;

			if (count == len) isoLayout();
		});
		//만약 img DOM요소에 이미지 소스가 없거나 로드에 에러가나서 엑박이 뜨게되면 해당 내용의 숨기기위해 li(.item)를 숨기게함

		let thumb = el.closest('.item').querySelector('.thumb');
		thumb.onerror = (e) => {
			e.currentTarget.closest('.item').querySelector('div a img').setAttribute('src', 'img/k1.jpg');
		};
		let profile = el.closest('.item').querySelector('.profile');
		profile.onerror = (e) => {
			e.currentTarget
				.closest('.item')
				.querySelector('div span img')
				.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
	}
}

//해당 url값으로 비동기식 데이터 호출

//isotope layout 플러그인을 적용시킬 함수제작
function isoLayout() {
	loading.classList.add('off');
	frame.classList.add('on');

	new Isotope('#list', {
		itemSelection: '.item',
		columnWidth: '.item',
		transitionDuration: '0.5s',
	});
}
