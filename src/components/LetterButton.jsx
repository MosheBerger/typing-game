import './LetterButton.css';

const LetterButton = (props) => {
	const { letter, onClick } = props;

	return (
		<button
			class="letter-button"
			onClick={() => onClick(letter)}
		>
			{letter}
		</button>
	);
}

export default LetterButton;