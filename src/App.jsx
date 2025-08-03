import { createSignal, For, onMount, Show } from 'solid-js'
import './app.css'
import LetterButton from './components/LetterButton'
import { effect } from 'solid-js/web'

const hebrewLetters = [
	'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
	'כ', 'ך', 'ל', 'מ', 'ם', 'נ', 'ן', 'ס', 'ע', 'פ',
	'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת'
]


function App() {
	const [question, setQuestion] = createSignal('טליה')
	const [answer, setAnswer] = createSignal('')
	const [currentLetter, setCurrentLetter] = createSignal('')
	const [isCorrect, setIsCorrect] = createSignal(undefined)
	const [win, setWin] = createSignal(false)

	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const questionParam = searchParams.get('q');
		if (questionParam) {
			setQuestion(questionParam);
		}
	})

	const handleClickLetter = (letter) => {
		console.log('currentLetter', currentLetter())
		console.log('answer', answer())

		const questionCurrentLetter = question().at(answer().length)
		if (letter !== questionCurrentLetter) {
			setCurrentLetter(letter)
			setIsCorrect(false)
			return
		}

		setIsCorrect(true)
		setCurrentLetter('')
		setAnswer(answer() + letter)
	}

	effect(() => {
		if (answer() !== question()) { return }

		setWin(true)
		setIsCorrect(true)
	})
	return (
		<>
			<div class="app">
				{isCorrect() === true ? (
					<div class="correct"> כל הכבוד! 😊 </div>
				) : isCorrect() === false && (
					<div class="incorrect">נסו שוב.. 🙁</div>
				)}

				<div class='question'>
					<p>
						{question()}
					</p>
				</div>

				<div class="answer">
					<p>
						{answer().split('').map((letter) => <span> {letter} </span>)}
						<span class='incorrect'>{currentLetter()}</span>
						<For each={Array.from({ length: question().length - (answer().length + currentLetter().length) })}>
							{() => <span class='empty'> _ </span>}
						</For>
					</p>
				</div>
				<Show when={win()}>
					<div class="win-message">
						<p>כל הכבוד! זכית במשחק! 🎉</p>
					</div>
				</Show>
				<Show when={!win()}>
					<div class="win-message">
						<p>נסו להשלים את המילה!</p>
					</div>
					<div class="letter-container">
						<For each={hebrewLetters}>
							{(letter) => (
								<LetterButton letter={letter} onClick={handleClickLetter} />
							)}
						</For>
					</div>
				</Show>
			</div>
		</>
	)
}

export default App
