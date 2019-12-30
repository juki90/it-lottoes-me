import React from 'react'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9,
		10, 11, 12, 13, 14, 15, 16, 17, 18,
		19, 20, 21, 22, 23, 24, 25, 26, 27,
		28, 29, 30, 31, 32, 33, 34, 35, 36,
		37, 38, 39, 40, 41, 42, 43, 44, 45,
		46, 47, 48, 49]

const NumField = props => {

	return (
		<span className={props.selected ? 'active' : null} onMouseDown={props.mousedown}>{props.num}</span>
	)
}

class BigLottoBoard extends React.Component {

	state = {
		numsSelected: [],
		numType: 6
	}

	componentDidMount() {
		this.setState({
			numsSelected: [],
			numType: parseInt(this.props.numT)
		})
	}

	handleNumMouseDown = e => {

		const selected = parseInt(e.target.innerText)
		const arrSelected = [...this.state.numsSelected]

		if (arrSelected.length === this.state.numType) {
			if(arrSelected.indexOf(selected) === -1) {
				return null
			}
		}

		if (arrSelected.indexOf(selected) === -1) {
			arrSelected.push(selected)
		} else {
			arrSelected.splice(arrSelected.indexOf(selected), 1)
		}

		this.setState({
			numsSelected: arrSelected
		})
	}

	selectRandom = () => {
		let arr = [],
			i = 0
		while(i < this.state.numType) {
			let num = Math.floor(Math.random() * 49 + 1)
			if(arr.indexOf(num) === -1) {
				arr.push(num)
				i++
			}
		}
		this.setState({
			numsSelected: arr
		})
	}

	render() {



		const allNrs = numbers.map(number => {
			return (
				<NumField mousedown={this.handleNumMouseDown} 
						  key={`${this.props.nr}-${number}`} 
						  num={number} 
						  selected={this.state.numsSelected.indexOf(number) >= 0 ? true : false} 
				/>
			)
		})

		return (
			<div className="bigLottoBoard">
				<h3><strong>{this.state.numType}</strong> numbers board</h3>
				{allNrs}
				<p>Selected: {`${this.state.numsSelected.length}/${this.state.numType}`}</p>
				<button className="confirm" onClick={this.selectRandom}>Select random</button>
				<button className="warning" costreturn={this.props.cost} nr={this.props.nr} onClick={this.props.click}>Remove this board</button>
			</div>
		)
	}
}

export default BigLottoBoard