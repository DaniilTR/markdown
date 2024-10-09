window.addEventListener('load', () => {
    const notesContainer = document.getElementById('notes-container');
    
    if (notesContainer) {
        // Функция для обновления flex-wrap
        const updateFlexWrap = () => {
            const noteItems = notesContainer.querySelectorAll('.note-item'); // обновляем количество noteItems
            
            if (noteItems.length > 3) {
                notesContainer.style.flexWrap = 'wrap';
            } else {
                notesContainer.style.flexWrap = 'nowrap'; // Если элементов 3 или меньше, возвращаем обратно nowrap
            }
        };
  
        // Первоначальная проверка
        updateFlexWrap();
  
        // Следим за изменениями в контейнере
        const observer = new MutationObserver(() => {
            updateFlexWrap();
        });
  
        observer.observe(notesContainer, { childList: true, subtree: true });
    } else {
        console.error('Контейнер с ID notes-container не найден.');
    }
  });
  
function updatePlaceholder() {
    const searchInput = document.getElementById('search');
    if (window.innerWidth <= 480) {
        searchInput.placeholder = 'Поиск';
    } else {
        searchInput.placeholder = 'Поиск заметок...';
    }
}

window.addEventListener('resize', updatePlaceholder);
window.addEventListener('load', updatePlaceholder);

  