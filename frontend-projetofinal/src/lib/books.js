const STORAGE_KEY = 'books_v1'
let books = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

export default {
  getBooks() {
    return [...books]
  },
  createBook({ title, author, year }) {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    books.push({ id, title, author, year })
    save()
  },
  removeBook(id) {
    books = books.filter(b => b.id !== id)
    save()
  },
  clearAll() {
    books = []
    save()
  },
}
