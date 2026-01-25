/* 각 항목에 대해 변수나 상수를 선언하고, 알맞은 값을 할당하세요. */

// 1. 영화 제목을 저장할 변수를 선언하고 좋아하는 영화 제목을 할당하세요.
let movieTitle = '시민 케인'

// 2. "빛의 속도(299,792,458 m/s)"를 담을 상수를 선언하세요.
const LIGHT_SPEED = '빛의 속도(299,792,458 m/s)'

// 3. "이메일 인증 완료 여부"를 확인하는 불리언 타입 변수를 선언하고 적절한 값을 할당하세요.
let isEmailVerified = false // 기본값은 false로

// 4. "상품 재고 수량(예: 47개)"을 담는 변수를 선언하고 숫자 값을 할당하세요.
let productStock = 47

// 5. "회원 포인트(예: 15,800점)"를 담는 변수를 작성하세요.
let memberPoint = 15_800

// 6. API 서버의 "기본 URL(예: https://api.example.com)을 담는 상수를 작성하고 값을 할당하세요.
const API_BASE_URL = 'https://api.example.com'

// 7. 게시글의 "조회수(예: 1,234)"를 담는 변수를 선언하고 값을 할당하세요.
let viewCount = 1_234

// 8. "배송 상태('준비중', '배송중', '배송완료' 중 하나)"를 담는 변수를 작성해보세요.
let deliveryStatus = '준비중'

// 9. "쿠폰 사용 가능 여부"를 담는 변수를 선언하고 불리언 타입 값을 설정하세요.
let isCanUseCoupon = true

// 10. "최대 업로드 파일 크기(예: 10MB를 바이트 단위로 10485760)"를 담는 상수를 작성하세요.
const MAX_FILE_SIZE = 10_485_760

// 11. "사용자 등급 점수(예: 85.5점)"를 담는 변수를 선언하고 소수점이 포함된 값을 할당하세요.
let userScore = 85.5

// 12. "알림 수신 동의 여부"를 담는 변수를 선언하고 불리언 타입 값을 설정하세요.
let isMarketingAgreed = false


/*
1. 환영 메시지 생성
회원 등급과 이름을 입력받아 맞춤형 환영 메시지를 출력하는 함수를 작성합니다.

VIP 회원 : "🌟 VIP {이름}님, 특별한 혜택이 준비되어 있습니다!"
일반 회원 : "안녕하세요, {이름}님! 즐거운 쇼핑 되세요."
*/

function greetingMessage(user, grade) {
  const vipWelcome = `🌟 VIP ${user}님, 특별한 혜택이 준비되어 있습니다!`
  const normalWelcome = `안녕하세요, ${user}님! 즐거운 쇼핑 되세요.`
  return (grade && vipWelcome) || (grade || normalWelcome)
}
console.log(greetingMessage('이동헌', true))
console.log(greetingMessage('이동헌', false))


// 다른 답안
{
  function greetingMessage(user, grade) {
    // nullish를 예습했습니다. 
    // 만약 이것 없이 쓰면 undifend나 null값이 입력되면 오류를 내뱉더라고요!
    // 대문자도 있으니 toLowerCase() 사용합니다.
    grade ??= ''
    user ??= '회원'
    let userGrade = grade.toLowerCase()
    const vipWelcome = `🌟 VIP ${user}님, 특별한 혜택이 준비되어 있습니다!`
    const normalWelcome = `안녕하세요, ${user}님! 즐거운 쇼핑 되세요.`

    // 리액트에 자주 쓴다고 해서 삼항연산자로 했습니다.
    return userGrade == 'vip' ? vipWelcome : normalWelcome
  }

  // 둘 다 결과값이 동일하게 나옵니다.
  console.log(greetingMessage('이동헌', 'vip'))
  console.log(greetingMessage('이동헌', 'VIP'))
  console.log(greetingMessage('이동헌', '브이아이피'))
  console.log(greetingMessage(undefined, null))
}



/*
> 배송비 정책
> 
> - 주문 금액이 50,000원 이상 : 무료 배송
> - 제주/도서 지역 : 추가 배송비 3,000원
> - 배송지역 값 예시 : "서울", "부산", "제주", "도서"
> - 일반 지역 : 기본 배송비 3,000원
> - 주문 금액이 0원 이하인 경우 : 0 반환
> - 배송지역이 빈 문자열인 경우 : 기본 배송비 적용
*/


function deliverFee(orderPrice, location) {
  // 가져온 변수 초기화입니다.
  const PRICE = parseInt(orderPrice)
  let result

  // 기본 변수 선언 '무료배송, 운임, 도서산간' 나중에 이곳만 수정하면 됩니다.
  const FREE_SHIPPING_THRESHOLD = 50_000
  const BASE_FEE = 3_000;
  const EXTRA_FEE = 3_000;
  const EXTRA_LOCATION = location === '제주' || location === '도서';
  

  // 만약에 5만원 이상이면 FREE_SHIPPING은 true값
  const FREE_FEE = (PRICE >= FREE_SHIPPING_THRESHOLD)

  // FREE_FEE가 false값을 가지면 3000원 운임으로 결정
  !FREE_FEE ? result = BASE_FEE : result = 0
  
  // 도서산간이 포함되면 운임 추가
  !EXTRA_LOCATION ? result : result += EXTRA_FEE
  
  // 만약에 값이 0이면, 운임은 0 처리
  !(PRICE <= 0) ? result : result = 0

  return result
}

console.log(deliverFee('0', '제주'))
console.log(deliverFee('50000', '서울'))
console.log(deliverFee('3200', '서울'))
console.log(deliverFee('3200', '도서'))

// if문 사용 답안입니다.
{
  function deliverCalc(orderPrice, location) {

    // 값을 number로 변환합니다. 소숫점까지는 필요없어 뺍니다.
    orderPrice = parseInt(orderPrice);
    let totalFee = 0;

    // 변수할당 시작 나중에 배송료와 무료배송 조건을 바꿀 때, 이곳의 값만 바꾸면 됩니다.
    const FREE_SHIPPING_THRESHOLD = 50_000;
    const BASE_FEE = 3_000;
    const EXTRA_FEE = 3_000;
    const EXTRA_LOCATION = ['제주', '도서'];

    // 주문 금액이 0원 이하인 경우 : 0 반환 <- 이것에 맞춥니다.
    if (orderPrice <= 0) {
      return deliverCharge = 0
    }

    // 5만원 이상 주문건은 무료 배송
    if (orderPrice >= FREE_SHIPPING_THRESHOLD) {
      totalFee = 0
    } else {
      totalFee = BASE_FEE
    }

    // 제주/도서 지역 할증
    if (EXTRA_LOCATION.includes(location)) {
      return totalFee += EXTRA_FEE
    } else {
      return totalFee
    }
  }

  console.log(deliverCalc('0', '제주'))
  console.log(deliverCalc('50000', '서울'))
  console.log(deliverCalc('3200', '서울'))
  console.log(deliverCalc('3200', '도서'))
}


/*
### 3. 비밀번호 유효성 검사

비밀번호 문자열을 입력받아 유효성 검사를 수행하는 함수를 작성합니다.

> 비밀번호 규칙
> 
> - 최소 8자 이상
> - 최대 20자 이하
> - 위 조건을 모두 만족하면 true, 아니면 false 반환
*/

function checkPassWordLength(password) {
  // length 메서드를 썼습니다.
  // string.length : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/length
  return password.length >= 8 && password.length <= 20 // true와 false변환이므로 연산자만 이용했습니다.
}

console.log(checkPassWordLength('1234567'))
console.log(checkPassWordLength('1234567890'))
console.log(checkPassWordLength('123456789012345789012'))

/*
### 4. 포인트 적립 계산

결제 금액과 회원 등급을 입력받아 적립될 포인트를 계산하는 함수를 작성합니다.

> 포인트 적립률
> 
> - VIP : 결제 금액의 5%
> - GOLD : 결제 금액의 3%
> - SILVER : 결제 금액의 1%
> - 일반 : 결제 금액의 0.5%
> 
> [예] VIP 회원이 100,000원 결제 시 → 5,000 포인트 적립
>
*/

function calcPoint(grade, price) {
  // 등급명에 소문자도 있으니 대문자로 변환해 상수로 정합니다.
  const userGrade = grade?.toUpperCase() ?? ''
  // 가격이라 소숫점이 없으므로 정수로 변환해 상수에 담습니다.
  const orderPrice = parseInt(price)
  // 포인트 변수를 선언 합니다. 값은 빼고요.
  let point

  // 등급별로 vip -> gold -> silver -> 일반 순으로 스위치 문을 사용합니다.
  // 배우진 않았지만 간결하고 보기 쉬워 이렇게 적어요!
  // case별로 백분율로 계산해 point 변수에 담습니다.
  switch (userGrade) {
    case 'VIP' :
      point = orderPrice * (0.05)
      break
    case 'GOLD':
      point = orderPrice * (0.03)
      break
    case 'SILVER':
      point = orderPrice * (0.01)
      break
    default:
      point = orderPrice * (0.005)
      break
  }

  // return이 없다면 undefined로 나오므로 point를 결과값으로 return합니다. 소숫점은 올려버립니다.
  // return Math.floor(point)
  return Math.floor(point)
}

console.log(calcPoint('vip', '100050원'))
console.log(calcPoint(null, '100050원'))


/*
### 5. 영화 티켓 가격 계산

영화 정보와 관람 인원을 입력받아 총 결제 금액을 계산하는 함수를 작성합니다.

> 요금 정책
> 
> - 일반 영화: 14,000원
> - 3D 영화: 17,000원
> - IMAX 영화: 20,000원
> - 조조 할인(10시 이전 상영): 20% 할인
> - 영화타입 값 : "일반", "3D", "IMAX"
> - 조조할인여부 값 : true 또는 false
> 
> [예] 3D 영화, 조조 상영, 2명 관람 → 27,200원 결제
>

*/

function calculateTicketPrice(movieType, isEarlyBird, personCount) {

  const PRICE_TABLE = {
      '일반': 14000,
      '3D': 17000,
      'IMAX': 20000
  };
  const DISCOUNT_RATE = 0.2;

  const typeKey = movieType ? movieType.trim() : ''; 

  // 3. 유효성 검사 (Validation)
  // 없는 영화 타입이 들어오면 에러를 던지거나 0을 반환해야 합니다.
  if (!PRICE_TABLE[typeKey]) {
    console.error(`[Error] 유효하지 않은 영화 타입입니다: ${movieType}`);
    return 0; 
  }

  // 4. 가격 계산 로직
  let unitPrice = PRICE_TABLE[typeKey];

  // 조조 할인 적용
  if (isEarlyBird) {
    unitPrice = unitPrice * (1 - DISCOUNT_RATE);
  }

    // 5. 인원 수 파싱
    // parseInt는 "2명" -> 2로 변환해주지만, "명2" -> NaN이 됩니다.
    // 실무에서는 확실하게 숫자만 추출하거나 유효성 검사를 더 엄격하게 합니다.
    const count = parseInt(personCount, 10) || 0;

    if (count <= 0) {
        console.warn('[Warning] 관람 인원은 1명 이상이어야 합니다.');
        return 0;
    }

    // 최종 금액 계산
    const totalCost = unitPrice * count;

    return totalCost;
}

console.log(calculateTicketPrice('IMAX', true, '1명'))
console.log(calculateTicketPrice('3D', false, '1명'))
console.log(calculateTicketPrice('Imax', true, NaN))




