// 문서의 내용이 모두 로드되면 할일

 // 변수지정

 /*
클래스명 container1 변수명 $slidewrapper
클래스명 slider-container 변수명 $sliderContainer
클래스명 slide 변수명 $slide 
이전버튼 변수명 navPrev
다음버튼 변수명 navNext
*/

var $slideWrap = document.querySelector('.container1'),
$slideContainer = document.querySelector('.slider_container'),
$slide = document.querySelectorAll('.slide'),
$navPrev = document.getElementById('prev'),
$navNext = document.getElementById('next'),
$slideHeight = 0,
$slideCount = $slide.length, 
$timer = null, 
$pagerHTML  = '',
$pager = document.querySelector('.pager'),
//$pagerBtn = document.querySelectorAll('.pager span'),
$currentIndex = 0;

 	 // $slideWrap.style.height = '200px';
 	 //  슬라이드의 높이 확인하여 부모의 높이로 지정하기 - (대상.offsetHeight)
 	 for(var i = 0; i < $slideCount; i++){

 	 	if($slideHeight < $slide[i].offsetHeight){
 	 		$slideHeight = $slide[i].offsetHeight;
 	 	}
 	 }
 	 // $slideHeight = $slide[0].offsetHeight;
 	 // console.log($slideHeight);

 	 $slideWrap.style.height = $slideHeight + 'px';
 	 $slideContainer.style.height = $slideHeight + 'px';


	 // 슬라이드가 있으면 가로로 배열하기
	 for(var a = 0; a < $slideCount; a++) {
	 	$slide[a].style.left = a * 100 + '%';
	 	//<span data-idx="0">1</span>
	 	// var i = 2; i = i + 2; //$pagerHTML = $pagerHTML + <span".
	 	$pagerHTML += '<span data-idx="'+ a +'">' + (a+1) + '</span>';  	
	 	$pager.innerHTML = $pagerHTML;
	 } 

	 var $pagerBtn = document.querySelectorAll('.pager span');
 

	 // 슬라이드 이동 함수(go to slide)
	 function goToSlide(idx){
	 	$slideContainer.classList.add('animated');
	 	$slideContainer.style.left = -100 * idx + '%';
	 	$currentIndex = idx;

	 	// 모든 $pagerBtn에 active제거 클릭된 그 요소에만 active 추가
	 	for(var y = 0; y < $pagerBtn.length; y++){
	 		$pagerBtn[y].classList.remove('active');
	 	}
	 	$pagerBtn[idx].classList.add('active');

	 }//go to slide
	 goToSlide(0);	

	 // 버튼기능 업데이트 함수

	 // 버튼을 클릭하면 슬라이드 이동시키기
	 // 다음 버튼을 클릭하면 할일, 이전버튼을 클릭하면 할일.

	 $navPrev.addEventListener('click', function(){  
	 	// goToSlide($currentIndex - 1);

	 	if ($currentIndex == 0){
	 		// $navPrev.classList.add('disabled');	 		
	 		goToSlide($slideCount - 1);
	 	} else {
	 		// $navPrev.classList.remove('disabled');	 		
	 		goToSlide($currentIndex - 1);
	 	}

	 });


	 $navNext.addEventListener('click', function(){  
	 	// goToSlide($currentIndex + 1);
	 	/* 
	 	마지막이라면 %navNext 가 안보이도록, 아니라면 나타나도록(disabled)
	 	*/
	 	if ($currentIndex == $slideCount - 1) {
	 		// $navNext.classList.add('disabled');
	 		goToSlide(0);	 		
	 	} else {
	 		// $navNext.classList.remove('disabled');
	 		goToSlide($currentIndex + 1);	 		
	 	}
	 });

	 // 자동 슬라이드
	 // 4초마다 goToSlide(숫자); 0,1,2,3.....5,0
	 // setInterval(할일, 시간);
	 // 함수 = 할일 = function(){ 실제할일 }
	 // 실제할일



	 // 자동 슬라이드 함수
	 function startAutoSlide(){

	 	$timer = setInterval(function(){
	 	//ci = 0, 1 ,2 ,3
	 	// ci 0 4초 ni 1 ci 1 4초 n1 2...ci 5 4초 ni 0
	 	var nextIdx = ($currentIndex + 1) % $slideCount; // %는 나눈 나머지

	 	goToSlide(nextIdx);

	 }, 4000);

	 }

	 startAutoSlide(); 

	 /*
	 $slideWrap에 마우스가 들어오면 할일, 나가면 할일
	 */

	 function stopAutoSlide(){
	 	clearInterval($timer);
	 };

	 $slideWrap.addEventListener('mouseenter',function(){
	 	stopAutoSlide();
	 });

	 $slideWrap.addEventListener('mouseleave',function(){
	 	startAutoSlide();
	 });


	 // move slide by pager
	 for(var x = 0; x < $pagerBtn.length; x++) {
	 	$pagerBtn[x].addEventListener('click',function(event){
	 		console.log(event.target);
	 		// innerText 내용 반환
	 		// innerHTML 의 태그를 반환
	 		var pagerNum = event.target.getAttribute('data-idx');
	 		goToSlide(pagerNum);
	 		
	 		
	 	});
	 }


