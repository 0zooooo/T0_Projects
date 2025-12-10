const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const navItems = document.querySelectorAll('.nav-item');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    sidebarOverlay.classList.add('open');
    sidebar.classList.add('open');
    document.body.classList.add('no-scroll');
}

function closeSidebar() {
    sidebarOverlay.classList.remove('open');
    sidebar.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

navToggle?.addEventListener('click', () => {
    if (window.innerWidth <= 720) {
        mainNav.classList.toggle('open');
        closeSidebar();
    } else {
        if (sidebarOverlay.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
});

sidebarOverlay?.addEventListener('click', (e) => {
    if (e.target === sidebarOverlay) closeSidebar();
});
sidebarClose?.addEventListener('click', closeSidebar);

// 모바일에서 하위메뉴 토글
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth <= 720) {
            item.classList.toggle('open');
            e.stopPropagation();
        }
    });
});
