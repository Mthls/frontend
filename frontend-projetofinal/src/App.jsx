import { useEffect, useState } from 'react'
import peopleLib from './lib/people.js'
import api from './services/api'
import './App.css'

function App() {
	const [people, setPeople] = useState([])

	// Adicionado: estado para livros e campos do formulário
	const [books, setBooks] = useState([])
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [year, setYear] = useState('')

	useEffect(() => {
		setPeople(peopleLib.getPeople())
		// popula livros via API
		fetchBooks()
	}, [])

	async function fetchBooks() {
		try {
			const res = await api.get('/api/books')
			setBooks(res.data || [])
		} catch (e) {
			console.error('Erro ao buscar livros', e)
			setBooks([])
		}
	}

	function addRandomPerson() {
		const names = ['Ana', 'Bruno', 'Carla', 'Diego', 'Eva']
		const name = names[Math.floor(Math.random() * names.length)]
		const age = Math.floor(Math.random() * 60) + 18
		peopleLib.createPerson({ name, age })
		setPeople(peopleLib.getPeople())
	}

	function remove(id) {
		peopleLib.removePerson(id)
		setPeople(peopleLib.getPeople())
	}

	function clearAll() {
		peopleLib.clearAll()
		setPeople(peopleLib.getPeople())
	}

	// Novas funções para livros usando API
	async function addBook(e) {
		e.preventDefault()
		if (!title.trim() || !author.trim()) return
		try {
			await api.post('/api/books', { title: title.trim(), author: author.trim(), year: year || '' })
			await fetchBooks()
			setTitle(''); setAuthor(''); setYear('')
		} catch (err) {
			console.error('Erro ao adicionar livro', err)
		}
	}

	async function removeBook(id) {
		try {
			await api.delete(`/api/books/${id}`)
			await fetchBooks()
		} catch (err) {
			console.error('Erro ao remover livro', err)
		}
	}

	async function clearBooks() {
		try {
			await api.delete('/api/books')
			await fetchBooks()
		} catch (err) {
			console.error('Erro ao limpar livros', err)
		}
	}

	return (
		<div className="app">
			<h1>Gerenciamento de Pessoas</h1>

			<div className="controls">
				<button onClick={addRandomPerson}>Adicionar pessoa aleatória</button>
				<button onClick={clearAll} className="danger">Limpar tudo</button>
			</div>

			<ul className="people-list">
				{people.length === 0 && <li className="empty">Nenhuma pessoa cadastrada</li>}
				{people.map(p => (
					<li key={p.id}>
						<span>{p.name} — {p.age} anos</span>
						<button className="remove" onClick={() => remove(p.id)}>Remover</button>
					</li>
				))}
			</ul>

			{/* Nova seção: livros */}
			<section className="books-section">
				<h1>Cadastro de Livros</h1>

				<form className="book-form" onSubmit={addBook}>
					<input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
					<input placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} />
					<input placeholder="Ano (opcional)" value={year} onChange={e => setYear(e.target.value)} />
					<button type="submit">Adicionar livro</button>
					<button type="button" className="danger" onClick={clearBooks}>Limpar livros</button>
				</form>

				<ul className="books-list">
					{books.length === 0 && <li className="empty">Nenhum livro cadastrado</li>}
					{books.map(b => (
						<li key={b.id}>
							<span>{b.title} — {b.author} {b.year && `(${b.year})`}</span>
							<button className="remove" onClick={() => removeBook(b.id)}>Remover</button>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}

export default App