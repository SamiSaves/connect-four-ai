import AIGame from './AIGame'

const aiMove = (game) =>  {
    const COLS = 7
    let moves = 0

    if (game.winner) return console.log("Someone has already won")

    const getHeuristicValue = (connectionValue) => {
        let value = 0
        
        if (connectionValue.value >= 4) value += 1000
        else if (connectionValue.value === 3) value += 500
        else value += connectionValue.value * 100

        return value
    } 

    const negamax = (node, depth, color, game, currentValue) => {
        // TODO: Also end if board is full
        const connectionValue = game.getConnectionValue(node)
        if (depth === 0  || connectionValue.value >= 4) {
            const value = getHeuristicValue(connectionValue)
            return (value + currentValue) * color
        }

        let value = -1000000 // -infinity

        for (let i = 0; i < COLS; i++) {
            const gameClone = cloneGame(game)
            const movedPiece = gameClone.placePiece(i)
            if (!movedPiece) continue
            moves++
            const connectionValue = gameClone.getConnectionValue(movedPiece)

            // If no other pieces next to this piece, terminate
            if (connectionValue.value <= 1 && !connectionValue.nextToEnemy) continue
            
            const newValue = getHeuristicValue(connectionValue) + currentValue

            value = Math.max(value, -negamax(movedPiece, depth - 1, -color, gameClone, newValue))
        }

        return value
    }
    
    let nval = -10000000 // -inifinty
    let bestMove = 5
    let depth = 5
    if (game.pieces.length === 1) depth = 8
    if (game.pieces.length === 3) depth = 7

    for (let i = 0; i < COLS; i++) {
        const gameClone = cloneGame(game)
        const movedPiece = gameClone.placePiece(i)
        if (!movedPiece) continue
        moves++
        const connectionValue = gameClone.getConnectionValue(movedPiece)
        // If no other pieces next to this piece, terminate
        if (connectionValue.value <= 1 && !connectionValue.nextToEnemy) continue
        
        const currentValue = getHeuristicValue(connectionValue)
        let value = -negamax(movedPiece, depth, -1, gameClone, currentValue)
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