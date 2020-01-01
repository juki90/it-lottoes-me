import React from 'react'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9,
		10, 11, 12, 13, 14, 15, 16, 17, 18,
		19, 20, 21, 22, 23, 24, 25, 26, 27,
		28, 29, 30, 31, 32, 33, 34, 35, 36,
		37, 38, 39, 40, 41, 42, 43, 44, 45,
		46, 47, 48, 49]

const NumField = ({selected, num, mousedown, boardid}) => (
		<span boardid={boardid} className={selected ? "active" : null} onMouseDown={mousedown}>{num}</span>
)

const LottoBoard = ({cost, id, click, nummousedown, numsSelected, numType, selectrandom}) => {

	const allNrs = numbers.map(number => {
		return (
			<NumField mousedown={nummousedown} 
					  key={`${id}-${number}`} 
					  num={number} 
					  selected={numsSelected.indexOf(number) >= 0 ? true : false}
					  boardid={id} 
			/>
		)
	})

	return (
		<div className="LottoBoard">
			<h3><strong>{numType}</strong> numbers board</h3>
			{allNrs}
			<p>Selected: {`${numsSelected.length}/${numType}`}</p>
			<button className="confirm" 
					onClick={selectrandom} 
					boardid={id}
					num={numType}>
						Select random
			</button>
			<button className="warning" 
					costreturn={cost}					
					boardid={id} 					
					onClick={click}>
						Remove this board
			</button>
		</div>
	)
}


export default LottoBoard