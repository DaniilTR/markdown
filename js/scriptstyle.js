window.addEventListener('load', () => {
    const notesContainer = document.getElementById('notes-container');
    const noteItems = document.querySelectorAll('.note-item'); // Используем querySelectorAll для выбора всех элементов с классом .note-item
    
    // Проверяем количество .note-item и изменяем flex-wrap на wrap, если больше 3
    if (noteItems.length > 3) {
      notesContainer.style.flexWrap = 'wrap'; // Изменяем стиль flex-wrap на wrap
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

  