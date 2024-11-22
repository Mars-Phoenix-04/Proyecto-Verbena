function toggleDropdown() {
    const dropdown = document.getElementById('forosDropdown');
    if (!dropdown.classList.contains('show')) {
        dropdown.style.display = 'block';
        setTimeout(() => {
            dropdown.classList.add('show'); 
        }, 10); 
    } else {
        dropdown.classList.remove('show');
        setTimeout(() => {
            dropdown.style.display = 'none'; 
        }, 500); 
    }
}
