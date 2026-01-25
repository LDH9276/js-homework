// 우선 들어갈 내용을 객체로 만든다.
// 우선 고유 인덱스를 만들고
// 썸네일, 타이틀, 설명, 장르를 넣는다.
const items = [
  {
    itemNumber: 0,
    itemThumbnail: ['item1-1.png', 'item1-2.png'],
    itemTitle: "크로노 오디세이",
    itemDesc: "멈춰 있던 시간이 흐른다",
    itemType: "MMORPG"
  },
  {
    itemNumber: 1,
    itemThumbnail: ['item2-1.png', 'item2-2.png'],
    itemTitle: "아키에이지 워",
    itemDesc: "시대의 전설을 향해",
    itemType: "MMORPG"
  },
  {
    itemNumber: 2,
    itemThumbnail: ['item3-1.png', 'item3-2.png'],
    itemTitle: "패스 오브 엑자일 2",
    itemDesc: "얼리 액세스 오픈!",
    itemType: "핵앤슬래시"
  },
  {
    itemNumber: 3,
    itemThumbnail: ['item4-1.png', 'item4-2.png'],
    itemTitle: "오딘 : 발할라 라이징",
    itemDesc: "신의 영역을 차지하라",
    itemType: "MMORPG"
  },
  {
    itemNumber: 4,
    itemThumbnail: ['item5-1.png', 'item5-2.png'],
    itemTitle: "롬: 리멤버 오브 마제스티",
    itemDesc: "세계는 하나의 전장이 된다",
    itemType: "MMORPG"
  },
  {
    itemNumber: 5,
    itemThumbnail: ['item6-1.png', 'item6-2.png'],
    itemTitle: "배틀그라운드",
    itemDesc: "최후까지 생존하라!",
    itemType: "배틀로얄"
  }
]

// 현재 캐러셀 아이템 수와 현제 아이템 수를 나눈다.
let carouselIndex = 0
const CAROUSEL_MAX_ITEM = 2
const CAROUSEL_TOTAL_ITEM = items.length
const CAROUSEL_TOTAL_PAGE = (CAROUSEL_TOTAL_ITEM / CAROUSEL_MAX_ITEM) - 1

// 버튼 객체와 페이지 DOM에서 읽어오기.
const carouselController = document.querySelector('.carousel-controller')
const prevButton = carouselController.querySelector('.prev')
const nextButton = carouselController.querySelector('.next')

// 방향 설정
prevButton.addEventListener('click', () => carouselControll('prev'))
nextButton.addEventListener('click', () => carouselControll('next'))

function carouselControll(direction) {
  // 1. 방향에 따라 증감을 해야한다.
  // 2. 0이하로 내려가면 다시 마지막 페이지로 2 -> 1 -> 0 -> 2
  // 3. 반대로 페이지 이상 가면 다시 초기화 한다. 0 -> 1 -> 2 -> 0
  if (direction === 'prev') {
    if (carouselIndex <= 0) {
      carouselIndex = CAROUSEL_TOTAL_PAGE
    } else {
      carouselIndex --
    }
  } else {
    if (carouselIndex >= CAROUSEL_TOTAL_PAGE) {
      carouselIndex = 0
    } else {
      carouselIndex ++
    }
  }

  // 0    | 1    | 2
  // 0, 1 | 2, 3 | 4, 5
  // 실제 인덱스 (x2), 하지만 0,1,2,3
  // 인덱스 X 최대 갯수로 정하는게 좋을 것 같다.
  const carouselNumber = carouselIndex * CAROUSEL_MAX_ITEM

  // 너무 복붙이라 따로 함수를 호출해 좌우를 바꾼다.
  updateCard('left', carouselNumber)
  updateCard('right', (carouselNumber + 1))

  // 마지막 페이지 번호 변경
  const pageNumber = document.querySelector('.current-page')
  pageNumber.innerText = carouselIndex + 1
}

function updateCard(direction, index) {
  // 기본 변수 card로 접근 가능하도록 설정
  // 왼쪽인지 오른쪽인지 설정을 안해 TDZ로 변수만 설정.
  let card = null

  // 왼쪽인지 오른쪽인지 삼항연산자로 결정
  // getElementById가 더 빨라서 querySelector 대신 사용
  direction === 'left' ?
    (card = document.getElementById('carousel-left')) :
    (card = document.getElementById('carousel-right'))

  if (card) {
    // 아이템 변수 설정
    const cardCharacter = card.querySelector('[data-id="img-character"]')
    const cardBg = card.querySelector('[data-id="img-bg"]')
    const cardTitle = card.querySelector('.carousel-item-title')
    const cardDesc = card.querySelector('.carousel-item-desc')
    const cardType = card.querySelector('.carousel-item-type')

    // .src 속성과 .innerText로 변경합니다.
    cardCharacter.src = `./images/${items[index].itemThumbnail[0]}`
    cardBg.src = `./images/${items[index].itemThumbnail[1]}`
    cardTitle.textContent = items[index].itemTitle
    cardDesc.textContent = items[index].itemDesc
    cardType.textContent = items[index].itemType
  } else {
    console.error('데이터를 잘못 받아왔습니다!')
  }
}