import React from 'react'
import BigLottoBoard from './components/BigLottoBoard.js'

const AddNewBoard = (props) => {

	return (
		<div className="addNewBoard">
			<p>Buy a new board:</p>
			<button className="notification"
					cost="1" 
					num="6" 
					onClick={props.click}
			>
				6 numbers (1$)
			</button>
			<button className="notification"
					cost="10" 
					num="10" 
					onClick={props.click}
			>
				10 numbers (10$)
			</button>
			<button className="notification"
					cost="30" 
					num="15" 
					onClick={props.click}
			>
				15 numbers (30$)
			</button>
			<button onClick={props.clickremove} className="danger">Remove All boards</button>
			{props.noCash ? <p className="warning">Not enough money!</p> : null}
		</div>
	)
}

const ResultPanel = (props) => {

	const {three, four, five, six} = props.winningNums
	const {cashWon, peopleWon, close, numbersDraw} = props
	let msg = ''

	if (six) {
		msg = 'You are rich now, RICH!'
	} else if (five) {
		msg = 'You won a lot of money!'
	} else if (four) {
		msg = 'You won some money!'
	} else if (three) {
		msg = 'You won a bit of money'
	}

	return (
		<div className="drawing-table-container">
			<div className="drawing-table">
				<div className="drawing-table-info">
					<h2>{three || four || five || six ? 'Congratulations!' : 'No luck!'}</h2>
					<h3 className="notification">{msg ? msg : 'You did not win anything this time'}</h3>
					{six ? <h3 className='drawing-result notification result'><span>6</span> {`numbers have been matched in: ${six} board${six > 1 ? 's' : ''}` }</h3> : null}
					{five ? <h3 className='drawing-result notification result'><span>5</span> {`numbers have been matched in: ${five} board${five > 1 ? 's' : ''}` }</h3> : null}
					{four ? <h3 className='drawing-result notification result'><span>4</span> {`numbers have been matched in: ${four} board${four > 1 ? 's' : ''}` }</h3> : null}
					{three ? <h3 className='drawing-result notification result'><span>3</span> {`numbers have been matched in: ${three} board${three > 1 ? 's' : ''}` }</h3> : null}
					{cashWon ? <h2 className='drawing-result confirm'>{`So you won: ${cashWon}$`}</h2> : null}
					{peopleWon ? <h4>{`${peopleWon} of players matched 6`}</h4> : <h4>{'Nobody matched 6. Cumulation rises!'}</h4>}
					<button className="confirm" onClick={close}>Return to game</button>
				</div>
				<div className="drawing-table-result">
					<span>{`${numbersDraw[0]}`}</span>
					<span>{`${numbersDraw[1]}`}</span>
					<span>{`${numbersDraw[2]}`}</span>
					<span>{`${numbersDraw[3]}`}</span>
					<span>{`${numbersDraw[4]}`}</span>
					<span>{`${numbersDraw[5]}`}</span>
				</div>
			</div>
		</div>
	)
}



class BigLottoApp extends React.Component {


	state =  {
		everBoard: 0,
		cash: 1000,
		cashForCurrentBoards: 0,
		cashWon: 0,
		boards: [],
		noMoney: false,
		cumulation: Math.floor(800000 + 800000 * Math.random()),
		drawingStarted: false,
		numbersDraw: [],
		peopleWon: 0,
		winningNumbers: {
			three: 0,
			four: 0,
			five: 0,
			six: 0
		},
		err: ''
	}

	addNewBoard = (e) => {

		const numType = parseInt(e.target.getAttribute('num')),
			  moneyCost = parseInt(e.target.getAttribute('cost'))

		if (this.state.cash >= moneyCost) {
			this.setState({
				boards: this.state.boards.concat([{
					id: this.state.everBoard,
					numType: parseInt(numType),
					cost: moneyCost,
					ref: React.createRef()
				}]),
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

		const nr = parseInt(e.target.getAttribute('nr')),
			  c = parseInt(e.target.getAttribute('costreturn'))
	
		this.setState({
				boards: this.state.boards.filter((e) => e.id !== nr),
				cash: this.state.cash + c,
				cashForCurrentBoards: this.state.cashForCurrentBoards - c
			})
	}

	removeAllBoards = () => { 

		this.setState({
			boards: [],
			cash: this.state.cash + this.state.cashForCurrentBoards,
			cashForCurrentBoards: 0,
			err: ''
		})
	}

	handleRestartGame = () => {

		this.setState({
			everBoard: 0,
			cash: 1000,
			cashForCurrentBoards: 0,
			cashWon: 0,
			boards: [],
			noMoney: false,
			cumulation: Math.floor(800000 + 800000 * Math.random()),
			drawingStarted: false,
			numbersDraw: [],
			peopleWon: 0,
			winningNumbers: {
				three: 0,
				four: 0,
				five: 0,
				six: 0
			},
			err: ''
		})
	}

	startDrawing = () => {
		const listOfBoardNums = this.state.boards.map(board => board.ref.current.state.numsSelected),
			  randomDrawNums = [],
			  results = []

		let verified = [],
			match3, match4, match5, match6, 
			moneyWon, everythingSelected, peopleWon = Math.floor((Math.random() + 0.2) + Math.floor(Math.random() * 2.5))

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
				cumulation: peopleWon ? Math.floor(1000000 + 800000 * Math.random()) : this.state.cumulation + Math.floor(1000000 + 800000 * Math.random()),
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
				err: 'Not enough cash to buy next same amount of boards for next drawing'
			})
			return
		}
		this.setState({
			drawingStarted: false
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

		if (this.state.boards.length) {

			lottoBoards = this.state.boards.map( (board, i) =>
				(<BigLottoBoard key={board.id}
								nr={board.id}
								numT={board.numType} 
								click={this.removeBoard}
								cost={board.cost} 
								ref={board.ref}
				/>)
			)
		}
		
		return (
			<div className="big-lotto" >
				<div className="welcome-board">
					<h1>Welcome to <i>It lottoes Me</i> game</h1>
					<p>Please buy boards for drawing and fill them up. When filled up, please click 'Draw' button to start drawing. </p>
					<p>You can choose between 6, 10 and 15 numbers boards.</p>
					<p>If your numbers match:</p>
					<ul>
						<li>3 winning numbers - you get 10$</li>
						<li>4 winning numbers - you get 0.025% of cumulation</li>
						<li>5 winning numbers - you get 0.5% of cumulation</li>
						<li>6 winning numbers - you get 100% of cumulation divided by number of winning people</li>
					</ul>
					<p><strong>Your budget is: {`${this.state.cash.toLocaleString()}$`}</strong></p>
					<p><strong>This time's cumulation is: {`${this.state.cumulation.toLocaleString()}$`}</strong></p>
					<button className="confirm" onKeyPress={this.onKeyPress} onClick={this.startDrawing}>Start Drawing</button>
					<button className="danger" onClick={this.handleRestartGame}>Restart Game</button>
					{this.state.err ? <p className="error">{`${this.state.err}`}</p> : null}
				</div>
				<br />
				{lottoBoards}
				<AddNewBoard noCash={this.state.noMoney ? "1" : null}
							click={this.addNewBoard} 
							clickremove={this.removeAllBoards}
				/>
				{this.state.drawingStarted ? <ResultPanel close={this.closeDrawingTable} 
														winningNums={this.state.winningNumbers}
														numbersDraw={this.state.numbersDraw}
														peopleWon={this.state.peopleWon} 
														cashWon={this.state.cashWon}
											/> 
				: null}
			</div>
		)
	}
}

export default BigLottoApp

