const todoList = document.querySelector('.todo-list')
const input = document.getElementById('new-todo')
const addButton = document.getElementById('add-todo')
const clearButton = document.getElementById('clear-todos')

// Get the list from local storage (or start with an empty list)
const todos = JSON.parse(localStorage.getItem('todo-list')) || []

// Which item is being edited right now (null = none)
let editingIndex = null

// Save the list to local storage
const saveTodos = () => {
    localStorage.setItem('todo-list', JSON.stringify(todos))
}

// Make a small button for an item
const makeButton = (label, className, onClick) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = label
    button.classList.add('todo-btn')
    if (className) button.classList.add(className)
    button.addEventListener('click', onClick)
    return button
}

// Create and add the list items to the DOM
const renderTodos = () => {
    // Clear the li's before we recreate them
    todoList.innerHTML = ''

    todos.forEach((todo, index) => {
        const li = document.createElement('li')
        li.classList.add('todo')

        const actions = document.createElement('div')
        actions.classList.add('todo-actions')

        if (index === editingIndex) {
            // Edit mode: show a text box with Save / Cancel
            const editInput = document.createElement('input')
            editInput.type = 'text'
            editInput.value = todo.text
            editInput.classList.add('edit-input')

            const saveEdit = () => {
                const newText = editInput.value.trim()
                if (newText !== '') {
                    todo.text = newText
                    saveTodos()
                }
                editingIndex = null
                renderTodos()
            }

            const cancelEdit = () => {
                editingIndex = null
                renderTodos()
            }

            editInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') saveEdit()
                if (event.key === 'Escape') cancelEdit()
            })

            actions.append(
                makeButton('Save', '', saveEdit),
                makeButton('Cancel', '', cancelEdit)
            )
            li.append(editInput, actions)
            todoList.append(li)
            editInput.focus()
        } else {
            // Normal mode: show the text with Edit / Delete
            const text = document.createElement('span')
            text.classList.add('todo-text')
            text.textContent = todo.text

            actions.append(
                makeButton('Edit', '', () => {
                    editingIndex = index
                    renderTodos()
                }),
                makeButton('Delete', 'delete', () => {
                    todos.splice(index, 1)
                    editingIndex = null
                    saveTodos()
                    renderTodos()
                })
            )
            li.append(text, actions)
            todoList.append(li)
        }
    })

    // Only show "Clear All" when there is something to clear
    clearButton.hidden = todos.length === 0
}

// Show any existing items when the page loads
renderTodos()

// Add a new item when the button is clicked
addButton.addEventListener('click', () => {
    const text = input.value.trim()
    if (text === '') return // ignore empty items

    todos.push({ text: text, completed: false })
    saveTodos()

    input.value = ''
    renderTodos()
})

// Let the Enter key add an item too
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addButton.click()
})

// Clear the whole list (after asking)
clearButton.addEventListener('click', () => {
    if (todos.length === 0) return
    if (!confirm('Clear all items from your to-do list?')) return

    todos.length = 0
    editingIndex = null
    saveTodos()
    renderTodos()
})