const products = document.querySelectorAll('.product');
        const modal = document.getElementById('productModal');
        const closeModal = document.getElementById('closeModal');
        const modalImg = document.getElementById('modalImg');
        const modalName = document.getElementById('modalName');
        const modalDesc = document.getElementById('modalDesc');
        const modalPrice = document.getElementById('modalPrice');

        products.forEach(product => {
            const btn = product.querySelector('.btn');
            btn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = product.dataset.img;
                modalName.textContent = product.dataset.name;
                modalDesc.textContent = product.dataset.desc;
                modalPrice.textContent = product.dataset.price;
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });