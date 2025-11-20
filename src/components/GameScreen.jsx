import React from 'react';
import { GRID_SIZE } from '../utils/constants';

const GameScreen = ({
    bingoCard,
    currentBall,
    checkedNumbers,
    history,
    wigglingNumber,
    onCardClick,
    onSkip,
    progress
}) => {
    return (
        <div className="h-full w-full overflow-hidden relative flex flex-col">
            <div className="flex-1 grid grid-rows-[auto_auto_minmax(0,1fr)] md:grid-rows-[1fr_1fr] md:grid-cols-2 gap-0 overflow-hidden">
                {/* Bingo Card */}
                <div className="flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden h-full min-h-[50vh] md:min-h-0 md:row-span-2 md:col-start-1 md:row-start-1">
                    <div className="w-full max-w-md space-y-4">
                        {/* Grid */}
                        <div
                            className="grid border border-white/20"
                            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                        >
                            {bingoCard.map((num, idx) => {
                                const isChecked = num && checkedNumbers.has(num);
                                const isCurrentMatch = num === currentBall && !isChecked;
                                const isWiggling = wigglingNumber === num;
                                const isEmpty = idx === 10;

                                return (
                                    <div
                                        key={idx}
                                        className="border border-white/20 aspect-square flex items-center justify-center relative"
                                    >
                                        {isEmpty ? (
                                            <div className="w-2 h-2 bg-white/40 rounded-full" />
                                        ) : (
                                            <button
                                                onClick={() => onCardClick(num)}
                                                disabled={!num || isChecked}
                                                className={`
                          w-full h-full flex items-center justify-center text-2xl md:text-4xl font-bold transition-all duration-200 relative z-10
                          ${isChecked ? 'text-white/60' : 'text-white hover:bg-white/5'}
                          ${isCurrentMatch ? 'animate-pulse-blue bg-white/10' : ''}
                          ${isWiggling ? 'animate-wiggle text-red-500' : ''}
                        `}
                                            >
                                                <span className="relative z-10">{num}</span>
                                                {isChecked && (
                                                    <div className="absolute inset-0 flex items-center justify-center z-0 text-[#333] p-2">
                                                        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pop">
                                                            <path d="M27.0484 54.7643C23.8779 56.8627 19.4382 56.224 17.1325 53.3382C14.8271 50.4522 15.5288 46.4109 18.6991 44.3121L21.6121 42.3841L16.7797 43.0123C13.4444 43.446 10.233 41.685 9.09442 38.7986C7.9561 35.9124 9.20352 32.6956 12.0798 31.099L16.8429 28.4573L7.9129 29.3939C4.62947 29.7386 1.51845 27.9743 0.410901 25.1396C-0.696459 22.305 0.492529 19.1496 3.27768 17.5298L31.6713 1.01726C34.9749 -0.903967 39.364 -0.0238753 41.4747 2.98317C43.5853 5.9903 42.6185 9.98557 39.315 11.9069L36.841 13.347L47.2992 12.2476C50.6101 11.9 53.7418 13.6962 54.8258 16.565C55.9097 19.4341 54.6538 22.6037 51.8081 24.1833L48.8119 25.8477C51.7021 25.8132 54.3694 27.3891 55.479 29.8791C56.7048 32.63 55.7134 35.7878 53.0759 37.5338L27.0484 54.7643Z" fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Current Ball */}
                <div className="flex items-center justify-center border-b border-white/10 md:border-b md:border-l md:border-white/10 relative md:col-start-2 md:row-start-1 py-4 md:py-0">
                    <div className="flex items-center md:flex-col gap-4 px-4 w-full justify-between md:justify-center">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 md:mb-4">Current</h3>

                        <div key={currentBall} className="relative">
                            <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center animate-pop">
                                <span className="text-3xl md:text-6xl font-black text-black">
                                    {currentBall || '—'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={onSkip}
                            className="text-xs md:text-sm px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase tracking-wider"
                        >
                            skip to results
                        </button>
                    </div>
                </div>

                {/* History */}
                <div className="flex flex-col border-t md:border-t-0 md:border-l border-white/10 relative overflow-hidden md:col-start-2 md:row-start-2 h-full">
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-900 relative shrink-0">
                        <div
                            className="h-full bg-white transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-0">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 px-4 sticky top-0 py-2 bg-black z-10">
                            History
                        </h3>

                        {history.map((item, idx) => (
                            <div
                                key={item.timestamp}
                                className="flex items-center gap-4 px-4 py-2 border-b border-white/5 animate-slide-in"
                                style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-sm text-gray-500 shrink-0 font-mono">
                                        #{String(item.index).padStart(2, '0')}
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold shrink-0 text-black text-lg">
                                        {item.ball}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    {item.prize ? (
                                        <div className="text-sm font-medium truncate">
                                            {item.prize.label}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-600 italic">
                                            De Bingo is nog niet gevallen
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
