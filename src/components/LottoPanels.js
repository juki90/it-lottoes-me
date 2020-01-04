import React from 'react'
import styled from 'styled-components'
import { variables } from '../styles.js'
import PropTypes from 'prop-types'

const DrawingTableWrapper = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.75);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const DrawingTable = styled.div`
    position: relative;
    border-radius: 4px;
	background: ${variables.panel_background};
	border: ${variables.panel_border};
    min-width: 320px;
    max-width: 800px;
    min-height: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const DrawingTableInfo = styled.div`
    padding: 15px;
    text-align: center;
    background: none;
    .result {
        vertical-align: center;
        line-height: 20px;
        font-size: 18px;
        height: 28px;
        text-align: center;
        span {
            display: inline-block;
            width: 28px !important;
            height: 28px !important;
            font-size: 18px;
            line-height: 28px;
            color: white;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.35);
            border-radius: 100%;
            background-color: #08f;
            box-shadow: -3px -1px 2px 5px rgba(0, 0, 0, 0.15) inset, -1px -3px 0px 0px rgba(0, 0, 0, 0.15) inset;
        }
    }
`
const DrawingTableResult = styled.div`
    width: 320px !important;
    height: 50px !important;
    margin: 0 auto;
    background: none;
    span {
        display: inline-block;
        background-color: #8D6;
        box-shadow: -3px -1px 2px 2px rgba(0, 0, 0, 0.15) inset, -1px -3px 0px 0px rgba(0, 0, 0, 0.15) inset;
        width: 50px;
        height: 50px; 
        margin-left: 2px;
        border-radius: 100%;
        color: #030;
        font-size: 25px;
        line-height: 50px;
        font-weight: bold;
        text-align: center;
        text-shadow: 1px 1px 1px #0F0;
        transform: scale(0.1) rotate(1800deg);
        user-select: none;
        
    }

    span:nth-of-type(1) {
        animation: 1.2s 0.35s ballsJump ease-out forwards;
    }
    span:nth-of-type(2) {
        animation: 1.1s 0.2s ballsJump ease-out forwards;
    }
    span:nth-of-type(3) {
        animation: 1.3s 0.1s ballsJump ease-out forwards;
    }
    span:nth-of-type(4) {
        animation: 1.0s 0.3s ballsJump ease-out forwards;
    }
    span:nth-of-type(5) {
        animation: 1.2s 0.2s ballsJump ease-out forwards;
    }
    span:nth-of-type(6) {
        animation: 1.3s 0.1s ballsJump ease-out forwards;
    }

    @keyframes ballsJump {
        0% {
            transform: scale(0.5) rotate(1800deg);
        }
        80% {
            transform: scale(1) rotate(-30deg);

        }
        90% {
            transform: scale(1) rotate(10deg);

        }
        100% {
            transform: scale(1) rotate(0);

        }
    }

    @media screen and (min-width: ${variables.tablet_breakpoint}) {
        width: 1002px;
        height: 750px;
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
const AddNewPanel = styled.div`
    text-align: center;
	background: ${variables.panel_background};
	border: ${variables.panel_border};
    border-radius: 4px;
    box-shadow: ${variables.panel_box_shadow}, ${variables.panel_box_shadow_outer};
    display: block;
    width: 320px;
    margin: 15px auto;
    padding: 10px 8px;
    overflow: hidden;
    button {
            display: inline-block;
            margin: 5px 5px;
            width: 130px;
            padding: 5px 0;
        }
    .warning {
        color: #d00;
    }
`


const AddNewBoardPanel = ({click, clickremove, noCash}) => (
    <AddNewPanel>
        <p>Buy a new board:</p>
        <Button type="notification"
                data-cost="1" 
                data-num="6" 
                onClick={click}
        >
            6 numbers (1$)
        </Button>
        <Button type="notification"
                data-cost="10" 
                data-num="10" 
                onClick={click}
        >
            10 numbers (10$)
        </Button>
        <Button type="notification"
                data-cost="30" 
                data-num="15" 
                onClick={click}
        >
            15 numbers (30$)
        </Button>
        <Button type="danger" 
                onClick={clickremove}>
            Remove All boards
        </Button>
        {noCash ? <p className="warning">Not enough money!</p> : null}
    </AddNewPanel>
)


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
        <DrawingTableWrapper>
            <DrawingTable>
                <DrawingTableInfo>
                    <h2>{three || four || five || six ? 'Congratulations!' : 'No luck!'}</h2>
                    <h3 className="notification">{msg ? msg : 'You did not win anything this time'}</h3>
                    {six ? <h3 className='drawing-result notification result'><span>6</span> {`- numbers have been matched in: ${six} board${six > 1 ? 's' : ''}` }</h3> : null}
                    {five ? <h3 className='drawing-result notification result'><span>5</span> {`- numbers have been matched in: ${five} board${five > 1 ? 's' : ''}` }</h3> : null}
                    {four ? <h3 className='drawing-result notification result'><span>4</span> {`- numbers have been matched in: ${four} board${four > 1 ? 's' : ''}` }</h3> : null}
                    {three ? <h3 className='drawing-result notification result'><span>3</span> {`- numbers have been matched in: ${three} board${three > 1 ? 's' : ''}` }</h3> : null}
                    {cashWon ? <h2 className='drawing-result confirm'>{`So you won: ${cashWon}$`}</h2> : null}
                    {peopleWon ? <h4>{`${peopleWon} of players matched 6`}</h4> : <h4>{'Nobody matched 6. Cumulation rises!'}</h4>}
                    <Button type="confirm" onClick={close}>Return to game</Button>
                </DrawingTableInfo>
                <DrawingTableResult>
                    <span>{numbersDraw[0]}</span>
                    <span>{numbersDraw[1]}</span>
                    <span>{numbersDraw[2]}</span>
                    <span>{numbersDraw[3]}</span>
                    <span>{numbersDraw[4]}</span>
                    <span>{numbersDraw[5]}</span>
                </DrawingTableResult>
            </DrawingTable>
        </DrawingTableWrapper>
    )
}

AddNewBoardPanel.propTypes = {
    click: PropTypes.func.isRequired,
    clickremove: PropTypes.func.isRequired,
    noCash: PropTypes.bool.isRequired
}

Button.propTypes = {
    type: PropTypes.string,
    "data-cost": PropTypes.number.isRequired,
    "data-num": PropTypes.number.isRequired, 
    onClick: PropTypes.func.isRequired
}

ResultPanel.propTypes = {
    cashWon: PropTypes.number.isRequired,
    peopleWon: PropTypes.number.isRequired,
    close: PropTypes.func.isRequired,
    numbersDraw: PropTypes.number.isRequired 
}


export {AddNewBoardPanel, ResultPanel}
