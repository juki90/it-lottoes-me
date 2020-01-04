import React from 'react'
import styled from 'styled-components'
import { variables } from '../styles.js'
import PropTypes from 'prop-types'

const LottoBoardWrapper = styled.div`
    width: 320px;
	background: ${variables.panel_background};
	border: ${variables.panel_border};
    overflow: hidden;
    text-align: left;
    display: inline-block;
    margin: 15px;
    padding: 15px;
    border-radius: 4px;
    box-shadow: ${variables.panel_box_shadow}, ${variables.panel_box_shadow_outer};

	h3 {
        margin: 10px;
        color: #888;

        strong {
            color: black;
        }
    }
    
    span {
        font-family: ${variables.number_font_family}, sans-serif;
        font-size: 20px;
        display: inline-block;
        width: 29px;
        text-align: center;
        border-radius: 3px;
        border-top: 1px solid black;
        border-bottom: 2px solid black;
        margin: 2px 3px;
        background-color: #fff;
        cursor: pointer;
        user-select: none;

        &.active {
            background-color: #8df;
        }

        &::selection {
            background-color: transparent;
        }
    }

    p {
        display: inline-block;
        margin: 0 15px;
    }
`

const Button = styled.button`
	font-weight: bold;
	display: inline-block;
	padding: 5px 8px;
	margin: 10px 5px;
	border-radius: 3px;
	min-width: 100px;
	transition: 0.3s;
	cursor: pointer;
	background-color: transparent;
	border-style: solid;
	border-width: 1px;
	outline: 0 none !important;
	color: ${({type}) => variables.colors_resolver(type)};
	border-color: ${({type}) => variables.colors_resolver(type)};
	&:hover {
		background-color: ${({type}) => variables.colors_resolver(type, true)};
	}	
`


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
		<LottoBoardWrapper>
			<h3><strong>{numType}</strong> numbers board</h3>
			{allNrs}
			<p>Selected: {`${numsSelected.length}/${numType}`}</p>
			<br />
			<Button type="confirm" 
					onClick={selectrandom} 
					data-boardid={id}
					data-num={numType}>
						Select random
			</Button>
			<Button type="warning" 
					data-costreturn={cost}					
					data-boardid={id} 					
					onClick={click}>
						Remove this board
			</Button>
		</LottoBoardWrapper>
	)
}

NumField.propTypes = {
	selected: PropTypes.number.isRequired, 
    num: PropTypes.number.isRequired,
    mousedown: PropTypes.func.isRequired,
    boardid: PropTypes.number.isRequired
}

LottoBoard.propTypes = {
	cost: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    click: PropTypes.func.isRequired,
    nummousedown: PropTypes.func.isRequired,
    numsSelected: PropTypes.array.isRequired,
    numType: PropTypes.number.isRequired,
    selectrandom: PropTypes.func.isRequired
   
}



export default LottoBoard