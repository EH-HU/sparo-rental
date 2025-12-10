// 장비 선택 시 신청 폼으로 스크롤
function scrollToRental() {
    const rentalSection = document.getElementById('rental');

    // 폼 섹션으로 부드럽게 스크롤
    rentalSection.scrollIntoView({ behavior: 'smooth' });

    // 신청자명 입력란에 포커스
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 500);
}

// 폼 제출 처리
document.getElementById('rentalForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};

    // 폼 데이터 수집
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // 날짜/시간 유효성 검사
    const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
    const endDateTime = new Date(`${data.endDate}T${data.endTime}`);
    const now = new Date();

    if (startDateTime < now) {
        showMessage('대여 시작일시는 현재 이후로 선택해주세요.', 'error');
        return;
    }

    if (endDateTime <= startDateTime) {
        showMessage('반납 예정일시는 대여 시작일시 이후로 선택해주세요.', 'error');
        return;
    }

    // 대여 시간 계산 (시간 단위)
    const rentalHours = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60));

    // 최소 대여시간 검사 (25시간)
    if (rentalHours < 25) {
        showMessage('최소 대여시간은 25시간입니다. 반납 예정일시를 조정해주세요.', 'error');
        return;
    }

    // Google Forms 제출 URL (실제 사용 시 여기에 Google Forms URL을 입력하세요)
    // const googleFormsURL = 'YOUR_GOOGLE_FORMS_URL_HERE';

    // 실제 환경에서는 Google Forms로 데이터를 전송하거나
    // 백엔드 서버로 데이터를 전송합니다.
    // 현재는 시뮬레이션만 수행합니다.

    // 제출 중 표시
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '제출 중...';
    submitBtn.disabled = true;

    // 시뮬레이션: 2초 후 성공 메시지
    setTimeout(() => {
        showMessage('신청이 완료되었습니다! 담당자가 곧 연락드리겠습니다.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // 콘솔에 데이터 출력 (개발용)
        console.log('신청 데이터:', data);
    }, 2000);
});

// 메시지 표시 함수
function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;

    // 메시지를 보이도록 스크롤
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // 성공 메시지는 5초 후 자동 숨김
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// 대여 시간 및 요금 계산
function calculateRental() {
    const startDate = document.getElementById('startDate').value;
    const startTime = document.getElementById('startTime').value;
    const endDate = document.getElementById('endDate').value;
    const endTime = document.getElementById('endTime').value;

    // 모든 필드가 선택되었는지 확인
    if (!startDate || !startTime || !endDate || !endTime) {
        document.getElementById('rentalCalculation').style.display = 'none';
        return;
    }

    // 날짜/시간 객체 생성
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    // 유효성 검사
    if (endDateTime <= startDateTime) {
        document.getElementById('rentalCalculation').style.display = 'block';
        document.getElementById('totalHours').textContent = '0시간';
        document.getElementById('totalPrice').textContent = '0원';
        document.getElementById('calcNote').textContent = '⚠️ 반납 예정일시는 대여 시작일시 이후여야 합니다.';
        document.getElementById('calcNote').className = 'calc-note error';
        return;
    }

    // 시간 차이 계산 (밀리초 -> 시간)
    const diffMs = endDateTime - startDateTime;
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

    // 요금 계산 (시간당 25,000원)
    const hourlyRate = 25000;
    const totalPrice = diffHours * hourlyRate;

    // 결과 표시
    document.getElementById('rentalCalculation').style.display = 'block';
    document.getElementById('totalHours').textContent = `${diffHours}시간`;
    document.getElementById('totalPrice').textContent = `${totalPrice.toLocaleString()}원`;

    // 최소 대여시간 안내
    const noteElement = document.getElementById('calcNote');
    if (diffHours < 25) {
        noteElement.textContent = `⚠️ 최소 대여시간은 25시간입니다. (현재 ${diffHours}시간 선택됨)`;
        noteElement.className = 'calc-note warning';
    } else {
        noteElement.textContent = `✓ 대여 가능합니다.`;
        noteElement.className = 'calc-note';
    }
}

// 오늘 날짜를 최소값으로 설정
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').setAttribute('min', today);
    document.getElementById('endDate').setAttribute('min', today);

    // 시작일 변경 시 종료일 최소값 업데이트
    document.getElementById('startDate').addEventListener('change', function() {
        document.getElementById('endDate').setAttribute('min', this.value);
        calculateRental();
    });

    // 모든 날짜/시간 필드에 이벤트 리스너 추가
    document.getElementById('startDate').addEventListener('change', calculateRental);
    document.getElementById('startTime').addEventListener('change', calculateRental);
    document.getElementById('endDate').addEventListener('change', calculateRental);
    document.getElementById('endTime').addEventListener('change', calculateRental);
});

// 부드러운 스크롤 (네비게이션)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
