// localStorages에서 여행 기록 불러오기
document.addEventListener("DOMContentLoaded", loadEntries);
document.getElementById("addBtn").addEventListener("click", addEntry);

// local Storage에서 데이터 가져오기
function getStored() {
    return JSON.parse(localStorage.getItem("travelData")) || [];
}

// 새로 추가/삭제 뒤에 local Storage에 데이터 저장하기
function saveStored(data) {
    localStorage.setItem("travelData", JSON.stringify(data));
}

// 새로운 여행 기록 객체 만드는 부분
function addEntry() {
    const city = document.getElementById("city").value.trim();
    const date = document.getElementById("date").value.trim();
    const memo = document.getElementById("memo").value.trim();

  // 입력 안 했으니 경고
    if (!city || !date || !memo) {
        alert("모두 입력해라.");
    return;
    }

    const entry = { city, date, memo };

    const entries = getStored();
    entries.push(entry);
    saveStored(entries);

    renderEntry(entry, entries.length - 1);

  // 입력창 초기화
    document.getElementById("city").value = "";
    document.getElementById("date").value = "";
    document.getElementById("memo").value = "";
}

// 저장된 모든 여행 기록을 한 번에 화면에 불러오기
function loadEntries() {
    const entries = getStored();
    entries.forEach((entry, index) => {
        renderEntry(entry, index);
    });
}

// 화면에 추가
function renderEntry(entry, index) {
    const list = document.getElementById("list");

    const div = document.createElement("div");
    div.className = "entry";
    div.dataset.index = index;

    div.innerHTML = `
        <strong>${entry.city}</strong> (${entry.date})<br>
        ${entry.memo}<br>
        <button class="delBtn">Delete</button>
    `;

    // 삭제
    div.querySelector(".delBtn").addEventListener("click", () => deleteEntry(index));

    list.appendChild(div);
}

// 삭제 함수
function deleteEntry(index) {
    const entries = getStored();
    entries.splice(index, 1);
    saveStored(entries);

    ///초기화
    document.getElementById("list").innerHTML = "";
    loadEntries();
}
