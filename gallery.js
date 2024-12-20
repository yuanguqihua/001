document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const artworks = document.querySelectorAll('.artwork-card');

    // 处理筛选按钮点击
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterBtns.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // 筛选作品
            artworks.forEach(artwork => {
                if (filter === 'all' || artwork.dataset.category === filter) {
                    artwork.style.display = 'block';
                } else {
                    artwork.style.display = 'none';
                }
            });
        });
    });
}); 