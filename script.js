// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initSmoothScrolling();
    initDownloadTracking();
    initParticleAnimation();
});

// 导航功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 导航链接点击效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // 更新活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 滚动时更新导航链接状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // 打开移动端菜单
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭移动端菜单
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 汉堡菜单点击事件
    mobileMenuToggle.addEventListener('click', openMobileMenu);
    
    // 关闭按钮点击事件
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    
    // 遮罩层点击事件
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // 移动端导航链接点击事件
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // 关闭移动端菜单
            closeMobileMenu();
            
            // 更新移动端导航链接状态
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 窗口大小改变时处理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // 滚动时更新移动端导航链接状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// 滚动效果
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.download-card, .contact-card, .author-info, .usage-instructions');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}



// 平滑滚动
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 下载跟踪
function initDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.closest('.download-card').querySelector('h3').textContent;
            const fileName = this.getAttribute('href');
            
            // 显示下载开始通知
            showNotification(`开始下载 ${platform} 版本`, 'success');
            
            // 模拟下载进度（实际项目中可以集成真实的下载进度）
            setTimeout(() => {
                showNotification(`${platform} 版本下载完成！`, 'success');
            }, 2000);
        });
    });
}

// 粒子动画
function initParticleAnimation() {
    const particlesContainer = document.querySelector('.floating-particles');
    
    // 创建更多粒子
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.3});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle-float ${Math.random() * 4 + 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
    `;
    
    container.appendChild(particle);
}

// 添加粒子浮动动画到CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.3; 
        }
        50% { 
            transform: translateY(-30px) translateX(20px) scale(1.5); 
            opacity: 1; 
        }
    }
`;
document.head.appendChild(style);

// 复制功能
function copyWeChat() {
    const wechatId = 'DXH08060927';
    copyToClipboard(wechatId, '微信号已复制到剪贴板！');
}

function copyQQ() {
    const qqId = '3878919117';
    copyToClipboard(qqId, 'QQ号已复制到剪贴板！');
}

function copyToClipboard(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
        // 使用现代 Clipboard API
        navigator.clipboard.writeText(text).then(() => {
            showNotification(message, 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text, message);
        });
    } else {
        // 降级方案
        fallbackCopyToClipboard(text, message);
    }
}

function fallbackCopyToClipboard(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification(message, 'success');
    } catch (err) {
        showNotification('复制失败，请手动复制', 'error');
    }
    
    document.body.removeChild(textArea);
}

// 通知系统
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    
    // 设置消息和样式
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 添加通知类型样式
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification.success {
        background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ff4444 0%, #cc3333 100%);
    }
    
    .notification.warning {
        background: linear-gradient(135deg, #ffaa00 0%, #ff8800 100%);
    }
`;
document.head.appendChild(notificationStyles);

// 鼠标移动效果
document.addEventListener('mousemove', function(e) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(0, 212, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: cursor-fade 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        document.body.removeChild(cursor);
    }, 600);
});

// 添加鼠标轨迹动画样式
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    @keyframes cursor-fade {
        0% { 
            opacity: 1; 
            transform: scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0.5); 
        }
    }
`;
document.head.appendChild(cursorStyles);

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 显示欢迎消息
    setTimeout(() => {
        showNotification('欢迎来到炘灏墨麒麟下载中心！', 'success');
    }, 1000);
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 跳转到下载区域
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const downloadsSection = document.querySelector('#downloads');
        if (downloadsSection) {
            downloadsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // ESC 键关闭通知
    if (e.key === 'Escape') {
        const notification = document.getElementById('notification');
        notification.classList.remove('show');
    }
});

// 性能优化：节流滚动事件
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 应用节流到滚动事件
window.addEventListener('scroll', throttle(function() {
    // 滚动相关的性能敏感操作
}, 16)); // 约60fps

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    showNotification('页面出现错误，请刷新重试', 'error');
});

// 离线检测
window.addEventListener('offline', function() {
    showNotification('网络连接已断开', 'warning');
});

window.addEventListener('online', function() {
    showNotification('网络连接已恢复', 'success');
});

// 移动端触摸手势支持
function initTouchGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    // 触摸开始
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, false);
    
    // 触摸结束
    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        // 计算滑动距离
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // 水平滑动检测（用于移动端菜单）
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (diffX > 0 && mobileMenu.classList.contains('active')) {
                // 向左滑动关闭菜单
                document.querySelector('.mobile-menu-toggle').click();
            }
        }
        

    }, false);
    
    // 双击缩放禁用
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// 移动端性能优化
function initMobileOptimizations() {
    // 检测移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 减少粒子数量
        const particlesContainer = document.querySelector('.floating-particles');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
        
        // 优化触摸反馈
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        
        // 添加触摸反馈样式
        const touchStyles = document.createElement('style');
        touchStyles.textContent = `
            .btn:active,
            .download-card:active,
            .contact-card:active {
                transform: scale(0.95) !important;
                transition: transform 0.1s ease !important;
            }
            
            .mobile-menu-toggle:active span {
                background: var(--accent-color) !important;
            }
        `;
        document.head.appendChild(touchStyles);
    }
}

// 初始化移动端功能
if (window.innerWidth <= 768) {
    initTouchGestures();
    initMobileOptimizations();
}

// 窗口大小改变时重新初始化移动端功能
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        initTouchGestures();
        initMobileOptimizations();
    }
});
