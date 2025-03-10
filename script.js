// 导航栏折叠功能
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');

// 切换导航菜单
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// 点击导航链接时关闭菜单
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('show');
    }
});

// 点击页面其他地方时关闭菜单
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
        navLinks.classList.remove('show');
    }
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// 设置当前活动导航项
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    
    // 如果在媒体中心页面，直接激活媒体中心链接
    if (currentPath.includes('media.html')) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'media.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        return;
    }
    
    // 如果在首页，根据滚动位置设置活动项
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentSection)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 页面加载和滚动时设置活动导航项
window.addEventListener('load', setActiveNavItem);
window.addEventListener('scroll', setActiveNavItem);

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 标签页切换功能
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // 添加当前活动状态
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // 这里可以添加表单验证和提交逻辑
        console.log('表单数据：', data);
        
        // 显示提交成功消息
        alert('感谢您的留言，我们会尽快与您联系！');
        contactForm.reset();
    });
}

// 新闻页面功能
// 分类筛选功能
const categoryBtns = document.querySelectorAll('.category-btn');
if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // 添加当前活动状态
            btn.classList.add('active');
            
            // 这里可以添加实际的筛选逻辑
            // 例如：根据分类显示或隐藏新闻卡片
            const category = btn.textContent.trim().replace(/^\S+\s+/, '');
            console.log('选择的分类：', category);
            
            // 模拟筛选效果
            const newsCards = document.querySelectorAll('.news-card, .featured-news');
            newsCards.forEach(card => {
                const cardTags = card.querySelectorAll('.news-tag');
                let matchFound = category === '全部';
                
                cardTags.forEach(tag => {
                    if (tag.textContent.includes(category)) {
                        matchFound = true;
                    }
                });
                
                if (matchFound) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 搜索功能
const searchBox = document.querySelector('.search-box input');
if (searchBox) {
    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase().trim();
        const newsCards = document.querySelectorAll('.news-card, .featured-news');
        
        newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// 分页功能
const pageBtns = document.querySelectorAll('.page-btn');
if (pageBtns.length > 0) {
    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            pageBtns.forEach(b => b.classList.remove('active'));
            
            // 添加当前活动状态
            btn.classList.add('active');
            
            // 这里可以添加实际的分页逻辑
            console.log('选择的页码：', btn.textContent.trim());
            
            // 模拟页面切换效果
            window.scrollTo({
                top: document.querySelector('.news-filters').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
}

// 新闻详情页功能
// 获取URL参数
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 根据URL参数加载对应的新闻详情
const newsId = getUrlParam('id');
if (newsId && document.querySelector('.news-detail-content')) {
    console.log('加载新闻ID：', newsId);
    // 这里可以添加实际的新闻加载逻辑
    // 例如：根据ID从服务器获取新闻详情
}