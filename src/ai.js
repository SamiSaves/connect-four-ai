import AIGame from './AIGame'

const aiMove = (game) =>  {
    const COLS = 7
    let moves = 0

    const getHeuristicValue = (node, game) => {
        const connectionValue = game.getConnectionValue(node) || 0
        let value = 0
        if (connectionValue.nextToEnemy) value += 100
        
        if (connectionValue.value >= 4) value += 1000
        else if (connectionValue.value === 3) value += 500
        else value += connectionValue.value * 100

        return value
    } 

    const negamax = (node, depth, color, game, currentValue) => {
        // TODO: Also end if board is full
        if (depth === 0) {
            const value = getHeuristicValue(node, game)
            return (value + currentValue)* color
        }

        let value = -1000000 // -infinity

        for (let i = 0; i < COLS; i++) {
            const gameClone = cloneGame(game)
            const movedPiece = gameClone.placePiece(i)
            if (!movedPiece) continue
            moves++
            const currentValue = getHeuristicValue(node, gameClone)
            value = Math.max(value, -negamax(movedPiece, depth - 1, -color, gameClone, currentValue))
        }

        return value
    }
    
    let nval = -10000000 // -inifinty
    let bestMove = 5
    
    for (let i = 0; i < COLS; i++) {
        const gameClone = cloneGame(game)
        const movedPiece = gameClone.placePiece(i)
        if (!movedPiece) continue
        moves++
    
        let value = -negamax(movedPiece, 6, -1, gameClone)
        if (value > nval) {
            bestMove = i
            nval = value
        }
    }
    
    console.log(`I checked ${moves} moves, and I think the best move is ${bestMove} because the value was ${nval}`)
    game.placePiece(bestMove)
}

const cloneGame = game => {
    const newGame = new AIGame()
    newGame.pieces = [...game.pieces]
    newGame.currentTurn = game.currentTurn === 'red' ? 1 : -1
    return newGame
}

export default aiMove