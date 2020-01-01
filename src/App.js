import React from 'react'
import LottoBoard from './components/LottoBoard.js'
import {AddNewBoardPanel, ResultPanel} from './components/LottoPanels.js'


class LottoApp extends React.Component {

	state =  {
		everBoard: 0,
		cash: 500,
		cashForCurrentBoards: 0,
		cashWon: 0,
		boards: [],
		noMoney: false,
		cumulation: Math.floor(800000 + 800000 * Math.random()),
		drawingStarted: false,
		numbersDraw: [],
		peopleWon: 0,
		everBoard: 0,
		winningNumbers: {
			three: 0,
			four: 0,
			five: 0,
			six: 0
		},
		err: ''
	}

	initialState = this.state

	addNewBoard = (e) => {

		const numType = parseInt(e.target.getAttribute('num')),
			  moneyCost = parseInt(e.target.getAttribute('cost'))

		if (this.state.cash >= moneyCost) {
			this.setState({
				boards: [...this.state.boards, {
					id: this.state.everBoard,
					numType: numType,
					cost: moneyCost,
					numsSelected: [],
				}],
				cashForCurrentBoards: this.state.cashForCurrentBoards + moneyCost,
				cash: this.state.cash - moneyCost,
				noMoney: false,
				everBoard: this.state.everBoard + 1,
				err: ''
			})
		} else {
			this.setState({
				noMoney: true
			})
		}

	}

	removeBoard = (e) => {

		const which = parseInt(e.target.getAttribute('boardid')),
			  boardList = this.state.boards,	
			  c = parseInt(e.target.getAttribute('costreturn'))
	
		this.setState({
				boards: boardList.filter(b => b.id !== which),
				cash: this.state.cash + c,
				cashForCurrentBoards: this.state.cashForCurrentBoards - c
			})
	}

	removeAllBoards = () => { 

		this.setState({
			boards: [],
			cash: this.state.cash + this.state.cashForCurrentBoards,
			cashForCurrentBoards: 0,
			everBoard: 0,
			err: ''
		})
	}

	handleRestartGame = () => {
		this.setState(this.initialState)
	}

	startDrawing = () => {
		
		const listOfBoardNums = this.state.boards.map(b => b.numsSelected),
			  randomDrawNums = [],
			  results = []

		let verified = [],
			match3, match4, match5, match6, 
			moneyWon, everythingSelected, peopleWon = Math.floor(Math.random() * 2.1)

		while (randomDrawNums.length < 6) {
			let num = 1 + Math.floor(Math.random() * 48.9)
			if(randomDrawNums.indexOf(num) === -1) { 
				randomDrawNums.push(num)
			}
		}

		for (let i = 0; i < listOfBoardNums.length; i++) {
			results[i] = 0
			for(let j = 0; j < 7; j++) {
				if (listOfBoardNums[i].indexOf(randomDrawNums[j]) >= 0) {
					results[i]++
				}
			}
		}

		verified = results.filter(result => result >= 3)
		match3 = verified.filter(ver => ver === 3).length
		match4 = verified.filter(ver => ver === 4).length
		match5 = verified.filter(ver => ver === 5).length
		match6 = verified.filter(ver => ver === 6).length

		if (!match6) {
			moneyWon = this.state.cumulation * (match4 * 0.00025 + match5 * 0.005) + match3 * 10
		} else {
			peopleWon++
			moneyWon = this.state.peopleWon ? this.state.cumulation / this.state.peopleWon : this.state.cumulation
		}
		
		everythingSelected = 0
		for(let i = 0; i < listOfBoardNums.length; i++) {
			everythingSelected = listOfBoardNums[i].length ? everythingSelected + 1 : everythingSelected
		}

		if(everythingSelected === listOfBoardNums.length && listOfBoardNums.length) {
			this.setState({
				winningNumbers: {
					three: match3,
					four: match4,
					five: match5,
					six: match6
				},
				cash: this.state.cash - this.state.cashForCurrentBoards + Math.floor(moneyWon),
				cashWon: Math.floor(moneyWon),
				cumulation: peopleWon || match6 ? Math.floor(1000000 + 800000 * Math.random()) : this.state.cumulation + Math.floor(1000000 + 800000 * Math.random()),
				drawingStarted: true,
				numbersDraw: randomDrawNums,
				peopleWon: Math.floor(peopleWon),
				err: ''
			})
		} else {
			this.setState({
				err: 'Please, select numbers'
			})
		}
	}

	closeDrawingTable = () => {
		if (this.state.cash < 0) {
			this.setState({
				boards: [],
				cash: this.state.cash + this.state.cashForCurrentBoards + this.state.cashWon,
				cashForCurrentBoards: 0,
				drawingStarted: false,
				err: 'Not enough cash to buy next same amount of boards for next drawing',
				peopleWon: 0
			})
			return
		}
		this.setState({
			drawingStarted: false
		})	
	}

	handleNumMouseDown = e => {

		const selected = parseInt(e.target.innerText),
		 	  boardList = this.state.boards,
			  which = parseInt(e.target.getAttribute("boardid")),
			  theBoard = boardList.filter(b => b.id === which)
		let arrSelected = theBoard[0].numsSelected

		if (arrSelected.length === theBoard.numType) {
			if(arrSelected.indexOf(selected) === -1) {
				return null
			}
		}

		if (arrSelected.indexOf(selected) === -1) {
			arrSelected.push(selected)
		} else {
			arrSelected.splice(arrSelected.indexOf(selected), 1)
		}

		boardList.map(b => {
			if (b.id === which) {
				b.numsSelected = arrSelected
			}
			return b
		})

		this.setState({
			boards: boardList
		})
	}

	selectRandom = (e) => {
		const arr = [],
			  boardList = this.state.boards,
			  which = parseInt(e.target.getAttribute("boardid")),
			  type = parseInt(e.target.getAttribute("num"))
		let i = 0

		while(i < type) {
			let num = Math.floor(Math.random() * 49 + 1)
			if(arr.indexOf(num) === -1) {
				arr.push(num)
				i++
			}
		}

		boardList.map(b => {
			if (b.id === which) {
				b.numsSelected = arr
			}
			return b
		})

		this.setState({
			boards: boardList
		})
	}

	onKeyPress = (e) => {
	    if (e.which === 13 /* Enter */) {
	      e.preventDefault();
	      if (this.state.drawingStarted) {
	      	 this.closeDrawingTable()
	      }
	    }	
	}

	render() {

		let lottoBoards = []
		const { cash, cumulation, err, noMoney, winningNumbers, numbersDraw, peopleWon, cashWon, drawingStarted, boards} = this.state

		if (boards.length) {

			lottoBoards = boards.map( (board) =>
				(<LottoBoard key={board.id}
							 click={this.removeBoard}
							 nummousedown={this.handleNumMouseDown}
							 selectrandom={this.selectRandom}
							 {...board}
				/>)
			)
		}
		
		return (
			<div className="lotto" >
				<div className="welcome-board">
					<h1>Welcome to <span className="confirm">It Lottoes Me</span> game</h1>
					<p>Please buy boards for drawing and fill them up. When filled up, please click 'Draw' button to start drawing. </p>
					<p>You can choose between 6, 10 and 15 numbers boards.</p>
					<p>If your numbers match:</p>
					<ul>
						<li>3 winning numbers - you get 10$</li>
						<li>4 winning numbers - you get 0.025% of cumulation</li>
						<li>5 winning numbers - you get 0.5% of cumulation</li>
						<li>6 winning numbers - you get 100% of cumulation divided by number of winning people</li>
					</ul>
					<h2>Your budget is: {cash.toLocaleString()}$</h2>
					<p><strong><small>This time's cumulation is: {cumulation.toLocaleString()}$</small></strong></p>
					<button className="confirm" onKeyPress={this.onKeyPress} 
												onClick={this.startDrawing}>
						Start Drawing
					</button>
					<button className="danger" onClick={this.handleRestartGame}>Restart Game</button>
					{err ? <p className="error">{err}</p> : null}
				</div>
				<br />
				{lottoBoards}
				<AddNewBoardPanel noCash={noMoney ? "1" : null}
							 	  click={this.addNewBoard} 
								  clickremove={this.removeAllBoards}
				/>
				{drawingStarted ? <ResultPanel close={this.closeDrawingTable} 
													  winningNums={winningNumbers}
													  numbersDraw={numbersDraw}
													  peopleWon={peopleWon} 
													  cashWon={cashWon}
											/> 
				: null}
			</div>
		)
	}
}

export default LottoApp

