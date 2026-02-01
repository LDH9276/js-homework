// 인덱스 넘버, 플랜명, 한글명, 가격, 그리고 플랜 정보를 정해보자.
const planItems = [
  {
    index: 0,
    planName: 'Free',
    KoreanName: '무료',
    planPrice: 0,
    planInfo: ['기본 대시보드 제공', '월 10회 리포트', '커뮤니티 지원']
  },
  {
    index: 1,
    planName: 'Standard',
    KoreanName: '스탠다드',
    planPrice: 15000,
    planInfo: ['모든 기능 무제한', '광고 제거', '이메일 고객 지원', '데이터 내보내기']
  },
  {
    index: 2,
    planName: 'Premium',
    KoreanName: '프리미엄',
    planPrice: 30000,
    planInfo: ['Standard 혜택 전체', '전담 매니저 배정', 'API 액세스 권한', '초기 설정 컨설팅']
  },
]

// 전역 변수는 여기서 선언합니다.
const planWrap = document.querySelector('.plan-box--wrapper')
let tags = ''


// DOM이 열렸을 때, 해당 랜더링으로 추가합니다.
// 유지보수를 위해 for 문으로 추가합니다.
for (const item of planItems) {

  // 예습한 구조분해 할당으로 수정
  // 변수를 설정하면 앞의 객체 별로 변수로 설정한다.
  const {indexNumber, planName, planKoName, planPrice, planInfo} = item

  // if 문으로 설정하다 삼항 연산자로 수정
  const planTextName = typeof planPrice !== 'number'
  ? '가격 미정'
  : (planPrice === 0 ? 'Free' : `₩${planPrice.toLocaleString('ko-KR')}`);


  // 택스트
  const planHTML = `
      <div
          id="plan-id-${indexNumber}"
          class="plan-box--item"
          aria-label="${planKoName}"
      >
        <div class="plan-box--block">
          <div class="plan-header--box">
            <strong class="plan-name" aria-label="${planKoName}">${planName}</strong>
            <p class="plan-price">
              ${planTextName}
            </p>
          </div>
          <hr class="plan-info--border"/>
          <ul class="plan-bottom--box">
            ${planInfo.map((el) => `<li>${el}</li>`).join('')}
          </ul>
        </div>
        <button 
          type="button"
          class="js-plan-button"
          aria-pressed="false"
        >
          <span class="sr-only">${planKoName} 요금제 선택하기</span>
        </button>
      </div>
  `
  tags += planHTML;
}
planWrap.innerHTML = tags;

// 알게 된 것
// for 문 없이 map( 함수 ) 로 가능하다!
// map( (el) => '개별 배열마다 처리할 것'  )
// 그러므로 `<li> ${el} </li>`로 붙여줘! 하는 것이다.
// 다만, ','이 붙으므로 join으로 ''로 붙여야 가능
// 리액트에서 자주 쓸 것 같으니 외워둬야겠다.

// 이전 과제의 클릭 이벤트를 복습한다.
const planCard = document.querySelectorAll('.plan-box--item')
const planButton = planWrap.querySelectorAll('.js-plan-button')
const planModal = document.querySelector('.plan-select-modal')
const planModalName = planModal.querySelector('.modal-plan--name')
const planModalPrice = planModal.querySelector('[data-id="modal-plan-price"]')

// 클릭 이벤트를 주기 위한 함수
planButton.forEach((el, idx) => {
  el.addEventListener('click', (e) => {

    // 접근성과 클래스를 초기화 시킨다.
    for (let i = 0, j = planButton.length; i < j; i++) {
      planCard[i].classList.remove('is-active')
      planButton[i].setAttribute('aria-pressed', 'false')
    }
    
    // 해당 클릭 인덱스만 클래스 부여
    // 접근성 향상을 위해 aria-pressed를 조정
    planButton[idx].closest('.plan-box--item').classList.add('is-active')
    planButton[idx].setAttribute('aria-pressed', 'true')
    planModalName.textContent = planItems[idx].planName

    const planPrice = planItems[idx].planPrice

    const planTextName = 
    typeof planPrice !== 'number' ? '가격 미정'
    : (planPrice === 0 ? '무료' : `${planPrice.toLocaleString('ko-KR')}원`)
    planModalPrice.textContent = planTextName
  })
})
