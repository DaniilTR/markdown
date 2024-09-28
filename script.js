document.addEventListener('DOMContentLoaded', () => {
    const noteNameInput = document.getElementById('note-input-name'); // Поле для ввода названия заметки
    const noteContentInput = document.getElementById('note-input'); // Поле для ввода содержимого заметки
    const saveNoteButton = document.getElementById('save-note'); // Кнопка для сохранения заметки
    const noteList = document.getElementById('notes-container'); // Контейнер для списка заметок
    const searchInput = document.getElementById('search'); // Поле для поиска заметок

    let editingNoteId = null; // Для отслеживания редактируемой заметки

    // Проверяем доступность библиотеки Showdown
    if (typeof showdown === 'undefined') {
        console.error('Библиотека Showdown не доступна. Проверьте подключение.');
        return;
    }
    const converter = new showdown.Converter(); // Конвертер Markdown в HTML

    // Функция для загрузки заметок из Local Storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.forEach(displayNote); // Отображаем все заметки
    }

    // Создание кнопок редактирования и удаления для заметки
    function createNoteButtons(note, noteItem) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Изменить';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editNote(note));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteNote(note.id);
            noteItem.remove();
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        return buttonContainer;
    }

    // Функция для отображения заметки
    function displayNote(note) {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.dataset.id = note.id; // Устанавливаем ID заметки

        const noteContent = `
            ${converter.makeHtml(note.title)}
            ${converter.makeHtml(note.content)}
        `;
        noteItem.innerHTML = noteContent;
        noteItem.appendChild(createNoteButtons(note, noteItem));
        noteList.appendChild(noteItem);
    }

    // Функция для редактирования заметки
    function editNote(note) {
        noteNameInput.value = note.title;
        noteContentInput.value = note.content;
        editingNoteId = note.id;
    }

    // Функция для обновления заметки в DOM
    function updateNoteInDOM(note) {
        const noteItem = document.querySelector(`.note-item[data-id="${note.id}"]`);
        if (noteItem) {
            noteItem.innerHTML = `
                ${converter.makeHtml(note.title)}
                ${converter.makeHtml(note.content)}
            `;
            noteItem.appendChild(createNoteButtons(note, noteItem));
        }
    }

    // Функция для сохранения/обновления заметки
    function saveNote() {
        const noteName = noteNameInput.value.trim();
        const noteContent = noteContentInput.value.trim();

        if (noteName && noteContent) {
            const notes = JSON.parse(localStorage.getItem('notes') || '[]');
            if (editingNoteId) {
                const noteIndex = notes.findIndex(note => note.id === editingNoteId);
                if (noteIndex !== -1) {
                    notes[noteIndex].title = noteName;
                    notes[noteIndex].content = noteContent;
                    updateNoteInDOM(notes[noteIndex]); // Обновляем заметку в DOM
                }
                editingNoteId = null; // Сброс ID после сохранения
            } else {
                const newNote = {
                    id: new Date().getTime(),
                    title: noteName,
                    content: noteContent
                };
                notes.push(newNote);
                displayNote(newNote); // Отображаем новую заметку
            }

            localStorage.setItem('notes', JSON.stringify(notes));
            noteNameInput.value = '';
            noteContentInput.value = '';
        }
    }

    // Функция для удаления заметки
    function deleteNote(noteId) {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        const updatedNotes = notes.filter(note => note.id !== noteId);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    // Обработчик на кнопку "Сохранить"
    saveNoteButton.addEventListener('click', saveNote);

    // Поиск по заметкам
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        document.querySelectorAll('.note-item').forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('p').textContent.toLowerCase();
            item.style.display = (title.includes(searchText) || content.includes(searchText)) ? '' : 'none';
        });
    });

    loadNotes(); // Загружаем заметки при загрузке страницы
});
