// AIzaSyAkj4gHYVRHLVLiPqRy3wSveyrq6ff1SeU

const vidList = document.querySelector('.vidList');
const key = 'AIzaSyAkj4gHYVRHLVLiPqRy3wSveyrq6ff1SeU';
const playListId = 'PLWKqsm200CTkG61cNeBTKl0Yc9ifFJYyc';
const num = 6;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;
		console.log(items);
		let result = '';

		items.map((el) => {
			let title = el.snippet.title;
			//조건문으로 만약 타이틀의 길이가 30글자보다 크면
			//타이틀 = 타이틀.문자열자르는매서드 +"...";
			if (title.length > 30) {
				title = title.substr(0, 20) + '...';
			}
			//문자열.substr(start, length) : 특정 문자인덱스에서 부터 특정 갯수만큼 문자열을 자름
			let con = el.snippet.description;
			if (con.length > 100) {
				con = con.substr(0, 40) + '...';
			}
			let date = el.snippet.publishedAt;
			//문자열을 T를 기준으로 분리해서 배열로 반환한뒤
			//배열의 0인텍스만 취해서 date에 대입한다
			date = date.split('T')[0];

			result += `
        <article>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.medium.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${con}</p>
            <span>${date}</span>
            <a href='#'>view more</a>
            <ul class='sns'>
              <li>
                <a href='#'>
                  <i></i>
                </a>
              </li>
              <li>
                <a href='#'>
                  <i></i>
                </a>
              </li>
              <li>
                <a href='#'>
                  <i></i>
                </a>
              </li>
            </ul>
          </div>
        </article>
      `;
		});

		vidList.innerHTML = result;
	});

vidList.addEventListener('click', (e) => {
	e.preventDefault();

	//

	if (!e.target.closest('a')) return;
	//이벤트위임의 단점인 이벤트 범위가 커져서 부작용이 발생하는데 그것을 이벤트발생의 목표가 아니라면 return하게 함으로 극복한다
	const vidId = e.target.closest('article').querySelector('a').getAttribute('href');
	//아티클에 이벤트가 걸쳐서 이벤트위임 현상을 발생시킴
	//부득이하게 이벤트위임을 걸쳐서 사용해야하는 경우에는
	//클릭한 요소의 부모태그가 a요소가 아니라면 어떻게 해야하는가는 고려해야합니다

	//만약 클릭이벤트가 a태그에만 있는것이 아니라면?

	// const vidId = e.target.closest("a").getAttribute("href"); //범위를 좁혀서 확실하게 a를 타겟팅하는 코드
	//이렇게 범위를 좁혀서 적용하는것이 가장 바람직한 코드

	let pop = document.createElement('figure');
	pop.classList.add('pop');
	pop.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
      <span class="btnClose">close</span>
    `;
	vidList.append(pop);
});

//이벤트위임을 해서 vidList에 클릭이벤트를 걸어준다
vidList.addEventListener('click', (e) => {
	const pop = vidList.querySelector('.pop'); //이안에서 pop을 찾아서

	if (pop) {
		//pop이 있는지를 물어봄
		//조건문으로 pop을 찾았다면 pop안의 span를 찾아서
		const close = pop.querySelector('span');
		if (e.target == close) pop.remove();
		//조건문으로 내가 클릭한 대상이 span태그인지를 물어봐서
		//맞다면 pop이라는 변수에 담은 figure태그를 모두 없앰
	}
});
