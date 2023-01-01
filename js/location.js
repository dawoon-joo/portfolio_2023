// 	3b8bb01add99784f6780d17dde6467f5
var mapContainer = document.getElementById('map');
const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];
const branch_btns = document.querySelectorAll('.branch li');
let drag = true;
let zoom = true;
let nozoom = false;

mapOption = {
	center: new kakao.maps.LatLng(37.5258975, 126.9284261),
	level: 3,
};

var map = new kakao.maps.Map(mapContainer, mapOption);
var mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

setDraggable(drag);

window.addEventListener('resize', () => {
	let mobile_wid = window.innerWidth;
	if (mobile_wid <= 540) {
		setZoomable(nozoom);
	} else {
		setZoomable(zoom);
	}
});

var markerOptions = [
	{
		title: '본점',
		latlng: new kakao.maps.LatLng(37.5258975, 126.9284261),
		imgSrc: '../img/marker1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: branch_btns[0],
	},
	{
		title: '지점1',
		latlng: new kakao.maps.LatLng(47.5258975, 126.9284261),
		imgSrc: '../img/marker2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: branch_btns[1],
	},
	{
		title: '지점2',
		latlng: new kakao.maps.LatLng(57.5258975, 126.9284261),
		imgSrc: '../img/marker3.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: branch_btns[2],
	},
];

for (let i = 0; i < markerOptions.length; i++) {
	new kakao.maps.Marker({
		map: map,
		position: markerOptions[i].latlng,
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(
			markerOptions[i].imgSrc,
			markerOptions[i].imgSize,
			markerOptions[i].imgPos
		),
	});

	markerOptions[i].button.onclick = (e) => {
		e.preventDefault();

		for (let k = 0; k < markerOptions.length; k++) {
			markerOptions[k].button.classList.remove('on');
		}
		markerOptions[i].button.classList.add('on');

		moveTo(markerOptions[i].latlng);
	};
}

window.onresize = () => {
	let active_btn = document.querySelector('.branch li.on');
	let active_index = active_btn.getAttribute('data-index');

	map.setCenter(markerOptions[active_index].latlng);
};

t_on.addEventListener('click', (e) => {
	e.preventDefault();
	if (t_on.classList.contains('on')) return;
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.add('on');
	t_off.classList.remove('on');
});

t_off.addEventListener('click', (e) => {
	e.preventDefault();
	if (t_off.classList.contains('on')) return;
	map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.remove('on');
	t_off.classList.add('on');
});

function moveTo(target) {
	var moveLatlng = target;
	map.setCenter(moveLatlng);
}

function setDraggable(draggable) {
	map.setDraggable(draggable);
}
function setZoomable(zoomable) {
	map.setZoomable(zoomable);
}
