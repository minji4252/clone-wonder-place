window.onload = function () {
  // 모달창 기능
  let modalWrap = document.querySelector(".modal-wrap");
  let modalClose = document.querySelector(".modal-close");
  modalClose.addEventListener("click", function () {
    modalWrap.classList.add("fadeOut");
    modalWrap.addEventListener("animationend", () => {
      modalWrap.style.display = "none";
    });
  });
  // 위로 가기
  const goTopBt = document.querySelector(".gotop");
  goTopBt.addEventListener("click", function () {
    // 구글검색 추천
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // 스크롤시에 부드럽게 goTop 보이고/숨기기
  window.addEventListener("scroll", function () {
    // 1. 스크롤바의 위치 값
    const scY = window.scrollY;
    // 2. 스크로바가 80픽셀 읻오시
    if (scY > 80) {
      goTopBt.classList.add("active");
    } else {
      goTopBt.classList.remove("active");
    }
  });

  // AOS 셋팅
  AOS.init();

  // 모바일 메뉴 관련
  const navMb = document.querySelector(".nav-mb");
  const mbWrap = document.querySelector(".mb-wrap");
  navMb.addEventListener("click", function () {
    // 인라인 방식
    // if (mbWrap.style.display === "block") {
    //   mbWrap.style.display = "none";
    // } else {
    //   mbWrap.style.display = "block";
    // }

    // 클래스 추가 방식
    const state = mbWrap.classList.contains("active");
    if (state) {
      navMb.classList.remove("active");
      mbWrap.classList.remove("active");
    } else {
      navMb.classList.add("active");
      mbWrap.classList.add("active");
    }
  });

  // 비주얼 슬라이드
  // 동적 즉, 서버에서 슬라이드를 생성하는 경우
  const slideTotal = document.querySelectorAll(
    ".swVisual .swiper-slide"
  ).length;
  const slideControlUl = document.querySelector(".sw-visual-control");
  let html = "";
  for (let i = 0; i < slideTotal; i++) {
    let tempI = i + 1;
    if (i < 9) {
      tempI = "0" + (i + 1);
    }
    html += `<li>${tempI}</li>`;
  }
  slideControlUl.innerHTML = html;

  const swVisual = new Swiper(".swVisual", {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".sw-visual-next",
      prevEl: ".sw-visual-prev",
    },
  });

  // swVisual.on("slideChange", function () {
  //   console.log("slide changed");
  // });
  swVisual.on("slideChangeTransitionStart", function () {
    // console.log("slide changed", this.realIndex);
    changeSwVisual(this.realIndex);
  });

  // 비주얼 슬라이드 제어 목록
  let swVisualControlLi = document.querySelectorAll(".sw-visual-control li");
  // console.log(swVisualControlLi);
  swVisualControlLi.forEach((item, index) => {
    // console.log(item);
    item.addEventListener("click", function () {
      // 내가 만드는 함수
      changeSwVisual(index);
    });
  });

  function changeSwVisual(_idx) {
    // css 처리 (포커스 클래스 추가 및 제거)
    // 1. active 클래스 모두 제거
    swVisualControlLi.forEach((item, index) => {
      item.classList.remove("active");
    });
    // 2. 클릭된 번호를 이용해서 클래스 추가하기
    swVisualControlLi[_idx].classList.add("active");
    // 3. 클릭된 번호를 이용해서 Swiper 를 이동
    // * 주의 사항 (loop 를 옵션으로 준 경우는 아래 구문 금지)
    // swVisual.slideTo(_index);
    swVisual.slideToLoop(_idx, 500);
  }

  // 최초 클릭된 것처럼  active 클래스 추가
  if (slideTotal > 0) {
    changeSwVisual(0);
  }

  // brandSlide
  let swBrandBts = document.querySelectorAll(".swBrandMenu > li");
  const swBrand = new Swiper(".swBrand", {
    pagination: {
      el: ".swBrand-pg ",
      clickable: true,
    },
    effect: "fade",
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });

  swBrand.on("slideChangeTransitionStart", function () {
    // console.log("slide changed", this.realIndex);
    changeSwBrandFocus(this.realIndex);
  });

  swBrandBts.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      // href 막기
      e.preventDefault();
      // 인덱스 번호를 넘겨서 슬라이드를 이동한다.
      changeSwBrand(index);
    });
  });

  function changeSwBrand(index) {
    // 슬라이드 이동
    swBrand.slideTo(index);
    changeSwBrandFocus(index);
  }

  // active 클래스 이동
  function changeSwBrandFocus(index) {
    // li 태그에서 active 클래스 모두 지우기
    swBrandBts.forEach((item) => {
      item.classList.remove("active");
    });
    // 하나만 포커스(active) 클래스 적용
    swBrandBts[index].classList.add("active");
  }

  // 자동 플레이 막기/재실행
  const swBrandWrap = document.querySelector(".swBrandWrap");

  swBrandWrap.addEventListener("mouseenter", function () {
    swBrand.autoplay.stop();
  });
  swBrandWrap.addEventListener("mouseleave", function () {
    swBrand.autoplay.start();
  });

  // Visual Swiper 스케일 효과
  // 참조 https://bkstudio.tistory.com/6
  // window 의 안쪽(웹브라우저 안쪽만) 높이
  let winHeight = window.innerHeight;

  // 수직으로 몇 픽셀 만큼 스크롤 되었는지 파악
  let scTop = window.scrollY || window.pageYOffset;

  // 변화를 줄 대상
  let swVisualWrap = document.querySelector(".swVisual-wrap");

  /* effectText 인터렉션 */
  let stX = 50; // 50% 를 기준으로 한다. (translate)
  let effect_01 = document.querySelector(".effect-01");
  let effect_02 = document.querySelector(".effect-02");

  // 변화를 적용할 함수
  function swVisualMove() {
    // scale 적용 비율값
    // transform: scale(ratio)
    let ratio = 1 + scTop * 0.001;
    // y 축 적용
    // transform: translateY(transY)
    let transY = scTop * 0.05;
    // 한계값 설정
    if (ratio > 1.2) {
      ratio = 1.2;
    }
    if (transY > 10) {
      transY = 10;
    }

    // 최종 transform 에 적용할 글자 완성
    let cssTxt = `translateY(${transY}%) scale(${ratio})`;
    // console.log(cssTxt);
    swVisualWrap.style.transform = cssTxt;
  }

  function effectText() {
    let value02 = stX * 2;
    //https://developer.mozilla.org/ko/docs/Web/API/Element/getBoundingClientRect
    let rect =
      document.querySelector(".effect").getBoundingClientRect().top +
      window.scrollY;
    // windHeight: 웹브라우저 내용(상단 웹브라우저 메뉴 제거한 높이)
    let offset = rect - winHeight;

    let calvalue = scTop - offset;
    let ratio = stX - (calvalue / winHeight) * value02;
    if (ratio >= value02) ratio = value02;
    if (window.innerWidth <= 540) {
      ratio = ratio * 0.5;
    }
    let cssTxt = "translate(" + ratio + "%,0px)";
    effect_01.style.transform = cssTxt;
    // console.log(cssTxt);

    // ratio = -ratio;
    let cssTxt2 = "translate(" + -1 * ratio + "%,0px)";
    effect_02.style.transform = cssTxt2;
    // console.log(cssTxt2);
  }

  // 기준값 갱신
  window.addEventListener("scroll", function () {
    winHeight = window.innerHeight;
    scTop = window.scrollY || window.pageYOffset;
    swVisualMove();
    effectText();
  });
  window.addEventListener("resize", function () {
    winHeight = window.innerHeight;
    scTop = window.scrollY || window.pageYOffset;
    swVisualMove();
    effectText();
  });
};
