import React from 'react'

const AddNewBoardPanel = ({click, clickremove, noCash}) => (
    <div className="addNewBoard">
        <p>Buy a new board:</p>
        <button className="notification"
                cost="1" 
                num="6" 
                onClick={click}
        >
            6 numbers (1$)
        </button>
        <button className="notification"
                cost="10" 
                num="10" 
                onClick={click}
        >
            10 numbers (10$)
        </button>
        <button className="notification"
                cost="30" 
                num="15" 
                onClick={click}
        >
            15 numbers (30$)
        </button>
        <button className="danger" 
                onClick={clickremove}>
            Remove All boards
        </button>
        {noCash ? <p className="warning">Not enough money!</p> : null}
    </div>
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
                    <span>{numbersDraw[0]}</span>
                    <span>{numbersDraw[1]}</span>
                    <span>{numbersDraw[2]}</span>
                    <span>{numbersDraw[3]}</span>
                    <span>{numbersDraw[4]}</span>
                    <span>{numbersDraw[5]}</span>
                </div>
            </div>
        </div>
    )
}

export {AddNewBoardPanel, ResultPanel}
