import { useState, useEffect, useCallback, useRef } from 'react';
import { PRIZES, TOTAL_NUMBERS, GRID_SIZE, DRAW_INTERVAL, MAX_DRAWN_BALLS } from '../utils/constants';

export const useBingoGame = () => {
    const [gameState, setGameState] = useState('IDLE'); // IDLE, PLAYING, WON, LOST, FINISHED
    const [bingoCard, setBingoCard] = useState([]);
    const [drawnBalls, setDrawnBalls] = useState([]);
    const [currentBall, setCurrentBall] = useState(null);
    const [checkedNumbers, setCheckedNumbers] = useState(new Set());
    const [history, setHistory] = useState([]); // { ball, index, prize, isBingo }
    const [prize, setPrize] = useState(null);
    const [wigglingNumber, setWigglingNumber] = useState(null);

    const timerRef = useRef(null);
    const drawDeckRef = useRef([]);

    // Generate unique random numbers
    const generateNumbers = (count, max, min = 1) => {
        const nums = new Set();
        while (nums.size < count) {
            nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(nums);
    };

    const [maxBalls, setMaxBalls] = useState(MAX_DRAWN_BALLS);

    const startGame = useCallback(() => {
        // 50% chance to win
        const isWinner = Math.random() < 0.5;

        // Always draw all 36 balls
        const currentMaxBalls = MAX_DRAWN_BALLS;
        setMaxBalls(currentMaxBalls);

        // Generate Bingo Card (15 numbers from 1-36)
        const cardNumbers = generateNumbers(15, TOTAL_NUMBERS);

        // Fixed empty slot at index 10
        const emptyIndex = 10;
        const grid = [];
        let numIdx = 0;
        for (let i = 0; i < 16; i++) {
            if (i === emptyIndex) {
                grid.push(null);
            } else {
                grid.push(cardNumbers[numIdx++]);
            }
        }
        setBingoCard(grid);

        // Prepare Draw Deck
        const allNumbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
        const cardSet = new Set(cardNumbers);
        const nonCardNumbers = allNumbers.filter(n => !cardSet.has(n));

        let deck = [];

        if (isWinner) {
            // Winner: All 15 card numbers must be within the first 36 balls.
            // Since we draw all 36 (if needed), and the card is a subset of 1-36,
            // a simple shuffle of all numbers is sufficient to guarantee a win EVENTUALLY.
            // However, to support prizes for specific ball counts, we might want to ensure
            // they don't win TOO early or TOO late if we wanted to rig that.
            // But for now, random shuffle is fine, as long as we draw enough balls.

            // Actually, if we want to guarantee a win within 36 balls, just shuffling 1-36 is enough.
            // But we need to make sure we don't accidentally put all card numbers in the first 18 balls
            // if we want to avoid only high prizes? The user didn't ask for that.
            // Just "50% chance to win".

            deck = allNumbers.sort(() => Math.random() - 0.5);

        } else {
            // Loser: At least 1 card number must NOT be in the 36 balls drawn.
            // We'll exclude 1-3 card numbers from the deck entirely.

            const numMissing = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 missing numbers

            const shuffledCard = cardNumbers.sort(() => Math.random() - 0.5);
            const missingCardNums = shuffledCard.slice(0, numMissing);
            const presentCardNums = shuffledCard.slice(numMissing);

            const shuffledNonCard = nonCardNumbers.sort(() => Math.random() - 0.5);

            // The deck will only have 36 - numMissing balls
            // We need to fill it with presentCardNums + enough nonCardNumbers to make 36 total
            const neededNonCard = 36 - presentCardNums.length;
            const selectedNonCard = shuffledNonCard.slice(0, neededNonCard);

            const drawnPool = [...presentCardNums, ...selectedNonCard];
            const shuffledDrawnPool = drawnPool.sort(() => Math.random() - 0.5);

            deck = shuffledDrawnPool;
        }

        drawDeckRef.current = deck;

        setDrawnBalls([]);
        setCurrentBall(null);
        setCheckedNumbers(new Set());
        setHistory([]);
        setPrize(null);
        setGameState('PLAYING');
    }, []);

    const checkWin = useCallback((checked) => {
        // Win if all numbers in bingoCard (except null) are in checked
        const numbersToWin = bingoCard.filter(n => n !== null);
        const isWin = numbersToWin.every(n => checked.has(n));
        return isWin;
    }, [bingoCard]);

    const drawNextBall = useCallback(() => {
        // Stop if we reached max balls or deck is empty
        if (drawnBalls.length >= maxBalls || drawDeckRef.current.length === 0) {
            setGameState('FINISHED');
            return;
        }

        const nextBall = drawDeckRef.current.pop();
        const newDrawn = [...drawnBalls, nextBall];

        // Auto-check previous ball if it was on card and not checked
        if (currentBall && bingoCard.includes(currentBall) && !checkedNumbers.has(currentBall)) {
            setCheckedNumbers(prev => new Set(prev).add(currentBall));
        }

        setDrawnBalls(prev => [...prev, nextBall]);
        setCurrentBall(nextBall);

        // Update History
        // Check if this ball causes a win (if we auto-checked it or user checked it)
        // Actually, win check happens after check.
        // But for history display "Bingo! U wint...", we need to know if this ball *could* trigger bingo?
        // The prompt says: "The number of drawn balls that you needed for a full Bingo card, determines your prize."
        // So we check win condition *after* this ball is processed (and auto-checked).

        // Wait, auto-check happens for the *previous* ball when the *new* ball appears.
        // "if they dont check the number it will automatically be checked when the new number apperars"
        // So for the *current* ball (nextBall), the user has 4 seconds.

        // Add to history
        // We need to calculate the prize for the *current* step (index + 1).
        const ballIndex = newDrawn.length;
        const prizeInfo = PRIZES.find(p => p.balls === ballIndex);

        setHistory(prev => [{
            ball: nextBall,
            index: ballIndex,
            prize: prizeInfo,
            timestamp: Date.now()
        }, ...prev]);

    }, [drawnBalls, currentBall, bingoCard, checkedNumbers, maxBalls]);

    // Game Loop
    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        // Initial draw
        if (drawnBalls.length === 0) {
            drawNextBall();
        }

        timerRef.current = setInterval(() => {
            // Check if we won with the *previous* state (including auto-check)
            // Actually, we should check win condition continuously.
            // If we win, we stop.

            // But we need to draw the next ball.
            drawNextBall();
        }, DRAW_INTERVAL);

        return () => clearInterval(timerRef.current);
    }, [gameState, drawNextBall, drawnBalls.length]);

    // Check Win Effect
    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        if (checkWin(checkedNumbers)) {
            // WIN!
            clearInterval(timerRef.current);
            setGameState('WON');
            // Calculate prize based on drawnBalls count
            const count = drawnBalls.length;
            const lookupCount = Math.max(count, 19); // Minimum prize at 19 balls
            const wonPrize = PRIZES.find(p => p.balls === lookupCount);
            setPrize(wonPrize);
        }
    }, [checkedNumbers, gameState, checkWin, drawnBalls.length]);

    const handleCardClick = (number) => {
        if (gameState !== 'PLAYING') return;
        if (!number) return;

        if (drawnBalls.includes(number)) {
            // If the clicked number is the CURRENT ball, we can trigger a "fast forward" 
            // to fill all other currently drawn numbers that are on the card.

            const newChecked = new Set(checkedNumbers);
            newChecked.add(number);

            // Auto-fill other drawn numbers on the card
            bingoCard.forEach(n => {
                if (n && drawnBalls.includes(n) && !newChecked.has(n)) {
                    newChecked.add(n);
                }
            });

            setCheckedNumbers(newChecked);

            // Immediately draw the next ball to keep the pace
            drawNextBall();
        } else {
            // Wiggle
            setWigglingNumber(number);
            setTimeout(() => setWigglingNumber(null), 500);
        }
    };

    const finishGame = useCallback(() => {
        if (gameState !== 'PLAYING') return;

        clearInterval(timerRef.current);

        // Draw remaining balls UP TO maxBalls
        const currentDeck = [...drawDeckRef.current];
        const ballsNeeded = maxBalls - drawnBalls.length;

        // We need to take balls from the END of currentDeck because we use pop()
        // So we take the LAST 'ballsNeeded' elements
        const remainingToDraw = currentDeck.slice(-ballsNeeded).reverse();

        const allDrawn = [...drawnBalls, ...remainingToDraw];

        // Auto-check all numbers on card that are in allDrawn
        const newChecked = new Set(checkedNumbers);
        bingoCard.forEach(num => {
            if (num && allDrawn.includes(num)) {
                newChecked.add(num);
            }
        });

        setCheckedNumbers(newChecked);
        setDrawnBalls(allDrawn);
        setCurrentBall(allDrawn[allDrawn.length - 1]);

        // Check if won
        const numbersToWin = bingoCard.filter(n => n !== null);
        const isWin = numbersToWin.every(n => newChecked.has(n));

        if (isWin) {
            // Calculate Prize
            // Find the index of the last number needed to complete the card
            let maxIndex = -1;
            numbersToWin.forEach(num => {
                const idx = allDrawn.indexOf(num);
                if (idx > maxIndex) maxIndex = idx;
            });

            // Balls count = index + 1
            const ballsCount = maxIndex + 1;
            const lookupCount = Math.max(ballsCount, 19);
            const wonPrize = PRIZES.find(p => p.balls === lookupCount);

            setPrize(wonPrize);
            setGameState('WON');
        } else {
            setGameState('FINISHED'); // No Win
        }

    }, [gameState, drawnBalls, bingoCard, checkedNumbers, maxBalls]);

    return {
        gameState,
        bingoCard,
        currentBall,
        drawnBalls,
        checkedNumbers,
        history,
        prize,
        wigglingNumber,
        startGame,
        handleCardClick,
        finishGame
    };
};
