window.addEventListener('load', () => {
  const notesContainer = document.getElementById('notes-container');
  
  if (notesContainer) {
      const noteItems = document.querySelectorAll('.note-item');
      
      // Изменение flex-wrap, если элементов больше 3
      const updateFlexWrap = () => {
          if (noteItems.length > 3) {
              notesContainer.style.flexWrap = 'wrap';
          }
      };

      // Первоначальная проверка
      updateFlexWrap();

      // Следим за изменениями в контейнере
      const observer = new MutationObserver(() => {
          updateFlexWrap();
      });

      observer.observe(notesContainer, { childList: true, subtree: true });
  }
});
window.addEventListener('load', () => {
  const notesContainer = document.getElementById('notes-container');
  
  // Проверяем, что контейнер существует
  if (notesContainer) {
      const noteItems = document.querySelectorAll('.note-item');
      
      // Проверяем количество .note-item и изменяем flex-wrap на wrap, если больше 3
      if (noteItems.length > 3) {
          notesContainer.style.flexWrap = 'wrap';
      }
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

  