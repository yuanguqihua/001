// Sample artwork data
const artworks = [
    {
        image: 'images/1.png',
        title: '金漆山水',
        artist: '圆毂漆画品牌',
        description: '传统漆艺与现代美学的完美融合，金漆勾勒出东方山水的灵动之美。',
        details: '漆画 | 120cm × 80cm | 2023年'
    },
    {
        image: 'images/2.jpg',
        title: '荷塘月色',
        artist: '圆毂漆画品牌',
        description: '以传统漆艺技法描绘荷塘月色，层层叠加的漆面营造出深邃的空间感。',
        details: '漆画 | 100cm × 150cm | 2023年'
    },
    {
        image: 'images/3.jpg',
        title: '四季花语',
        artist: '圆毂漆画品牌',
        description: '结合螺钿工艺与漆画技法，展现四季花卉的绚丽色彩。',
        details: '漆画 | 180cm × 90cm | 2023年'
    }
];

// Gallery functionality
class Gallery {
    constructor() {
        this.galleryGrid = document.querySelector('.gallery-grid');
        this.initialize();
    }

    initialize() {
        artworks.forEach(artwork => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <div class="gallery-image" style="background-image: url(${artwork.image})"></div>
                <div class="gallery-info">
                    <h3>${artwork.title}</h3>
                    <p>${artwork.details}</p>
                </div>
            `;
            
            this.galleryGrid.appendChild(galleryItem);
        });
    }
}

// Carousel functionality
class Carousel {
    constructor() {
        this.currentIndex = 0;
        this.carousel = document.querySelector('.carousel-inner');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.artworkTitle = document.querySelector('.artwork-title');
        this.artistInfo = document.querySelector('.artist-info');
        this.artworkDescription = document.querySelector('.artwork-description');
        this.artworkDetails = document.querySelector('.artwork-details');
        
        this.initialize();
    }

    initialize() {
        // Create carousel items
        artworks.forEach((artwork, index) => {
            const div = document.createElement('div');
            div.className = 'carousel-item';
            
            const img = document.createElement('img');
            img.src = artwork.image;
            img.alt = artwork.title;
            
            div.appendChild(img);
            this.carousel.appendChild(div);
        });

        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.navigate('prev'));
        this.nextBtn.addEventListener('click', () => this.navigate('next'));
        
        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.navigate('next');
            } else if (touchEndX - touchStartX > 50) {
                this.navigate('prev');
            }
        });

        // Start autoplay
        this.startAutoplay();
        
        // Update initial info
        this.updateArtworkInfo();
    }

    navigate(direction) {
        if (direction === 'prev') {
            this.currentIndex = (this.currentIndex - 1 + artworks.length) % artworks.length;
        } else {
            this.currentIndex = (this.currentIndex + 1) % artworks.length;
        }

        this.updateCarousel();
        this.updateArtworkInfo();
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${offset}%)`;
    }

    updateArtworkInfo() {
        const artwork = artworks[this.currentIndex];
        this.artworkTitle.textContent = artwork.title;
        this.artistInfo.textContent = artwork.artist;
        this.artworkDescription.textContent = artwork.description;
        this.artworkDetails.textContent = artwork.details;
    }

    startAutoplay() {
        setInterval(() => this.navigate('next'), 5000);
    }
}

// Mobile navigation
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.links = document.querySelectorAll('.nav-links a');
        
        this.initialize();
    }

    initialize() {
        this.hamburger.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });

        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.hamburger.classList.remove('active');
            });
        });
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav-links a');
        
        this.initialize();
    }

    initialize() {
        // Update active link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图自动播放
    const carousel = new bootstrap.Carousel(document.querySelector('#artworkCarousel'), {
        interval: 3000, // 3秒切换一次
        pause: 'hover' // 鼠标悬停时暂停
    });

    // 处理联系表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // 处理称谓选择
        const titleDropdownItems = document.querySelectorAll('.dropdown-item[data-value]');
        const selectedTitleInput = document.getElementById('selectedTitle');
        const nameInput = contactForm.querySelector('input[placeholder="您的姓名"]');

        titleDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.getAttribute('data-value');
                selectedTitleInput.value = title;
                if (nameInput.value) {
                    // 如果已经有姓名，在姓名前添加称谓
                    nameInput.value = title + ' ' + nameInput.value.replace(/^(先生|女士)\s*/, '');
                }
            });
        });

        // 处理国家选择
        const countryDropdownItems = document.querySelectorAll('.country-dropdown .dropdown-item');
        const selectedCountryInput = document.getElementById('selectedCountry');
        const areaInput = contactForm.querySelector('input[placeholder="所在区域"]');

        countryDropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const countryCode = this.getAttribute('data-value');
                const countryName = this.textContent.split(' ')[0]; // 获取国家名称（不包含代码）
                selectedCountryInput.value = countryCode;
                if (areaInput.value) {
                    // 如果已经有区域信息，添加国家信息
                    areaInput.value = areaInput.value.split(',')[0] + ', ' + countryName;
                } else {
                    areaInput.value = countryName;
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('消息已发送！我们会尽快与您联系。');
            contactForm.reset();
            selectedTitleInput.value = '';
            selectedCountryInput.value = '';
        });
    }

    // 处理导航链接点击
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 导航菜单下拉功能
    const navMenuBtn = document.getElementById('navMenuBtn');
    const navDropdown = document.getElementById('navDropdown');
    let isDropdownOpen = false;

    // 点击菜单按钮时切换下拉菜单
    navMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        isDropdownOpen = !isDropdownOpen;
        navDropdown.classList.toggle('show');
    });

    // 点击下拉菜单外部时关闭菜单
    document.addEventListener('click', function(e) {
        if (!navDropdown.contains(e.target) && !navMenuBtn.contains(e.target)) {
            navDropdown.classList.remove('show');
            isDropdownOpen = false;
        }
    });

    // 点击链接后关闭菜单
    navDropdown.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navDropdown.classList.remove('show');
            isDropdownOpen = false;
        });
    });

    // 品牌使命和愿景卡片翻转效果
    document.querySelector('.mission-content').addEventListener('click', function() {
        this.classList.toggle('flipped');
    });

    document.querySelector('.vision-content').addEventListener('click', function() {
        this.classList.toggle('flipped');
    });

    // 处理称谓下拉菜单
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownButton = document.querySelector('.dropdown-toggle-split');
    const selectedTitleInput = document.getElementById('selectedTitle');
    const nameInput = document.querySelector('input[placeholder="您的姓名"]');
    let lastTitle = '';

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const value = this.getAttribute('data-value');
            selectedTitleInput.value = value;
            
            // 移除旧称谓（如果存在）
            let currentName = nameInput.value;
            if (lastTitle) {
                currentName = currentName.replace(lastTitle, '').trim();
            }
            
            // 更新姓名输入框的值
            nameInput.value = currentName + ' ' + value;
            lastTitle = value;
            
            // 更新按钮样式
            dropdownButton.classList.remove('btn-outline-secondary');
            dropdownButton.classList.add('btn-secondary');
        });
    });

    // 监听姓名输入框的变化
    nameInput.addEventListener('input', function() {
        // 如果已选择称谓，保持称谓在最后
        if (selectedTitleInput.value && lastTitle) {
            let currentName = this.value;
            // 只有当输入的内容不是以称谓结尾时才添加称谓
            if (!currentName.endsWith(lastTitle)) {
                currentName = currentName.replace(lastTitle, '').trim();
                this.value = currentName + ' ' + lastTitle;
            }
        }
    });

    // 八大技艺卡片图片点击翻转
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach(card => {
        // 获取卡片的图片容器和背面
        const cardFront = card.querySelector('.process-card-front');
        const cardBack = card.querySelector('.process-card-back');
        
        // 点击图片区域翻转到背面
        if (cardFront) {
            cardFront.addEventListener('click', function() {
                card.classList.add('flipped');
            });
        }
        
        // 点击背面翻转回正面
        if (cardBack) {
            cardBack.addEventListener('click', function() {
                card.classList.remove('flipped');
            });
        }
    });
}); 