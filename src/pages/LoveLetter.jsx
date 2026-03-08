import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { GiCrossMark } from 'react-icons/gi'

const LoveLetter = () => {
    const navigate = useNavigate();
    const lettersData = [
        {
            id: 8,
            name: "Sarathi ❤️",
            msg: "Life is full of random moments. But meeting you was never random for my heart. So today, I just want to ask you something simple… Will you be my Valentine, the girl my heart chooses today, tomorrow, and every day after?",
        },
        {
            id: 7,
            name: "Sarathi",
            msg: "In my heart there is no ego, no jealousy, and no betrayal. Only a pure heart that loves you. You are the only girl I talk to, laugh with, and share my happiness with. For me… there is only you.",
        },
        {
            id: 6,
            name: "Sarathi",
            msg: "I promise you something from my heart. I will always respect you, care for you, and protect your heart. Your happiness will always matter more than my ego or pride. Because loving you means choosing you every day.",
        },
        {
            id: 5,
            name: "Sarathi",
            msg: "You're not just someone who came into my life. You are my life and my everything. Your smile, your happiness, and your peace mean more to me than anything else in this world.",
        },
        {
            id: 4,
            name: "Sarathi",
            msg: "Then came the day we met. Walking together, traveling, watching a movie… and seeing you in front of me felt unreal. That day you looked so beautiful… like an angel who quietly walked into my life.",
        },
        {
            id: 3,
            name: "Sarathi",
            msg: "Day by day, our bond started growing. From simple chats… to laughter… to caring about each other's day. Without even noticing, you slowly became someone very special to me.",
        },
        {
            id: 2,
            name: "Sarathi",
            msg: "For almost two years, I waited for the right person to enter my life. And then you came. It didn't take months for me to realize… within one day, something in my heart already chose you.",
        },
        {
            id: 1,
            name: "Sarathi",
            msg: "It all started with a simple message. Two random people talking because of a small doubt and a project. But that one message quietly started something beautiful in my life.",
        },
    ];
    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [letters, setLetters] = useState([]);
    const [zIndexCounter, setZIndexCounter] = useState(10);
    const lettersContainerRef = useRef(null);
    useEffect(() => {
        setLetters(lettersData);
    }, []);
    // Drag logic
    const handleMouseDown = (e) => {
        const isTouch = e.type === "touchstart";
        const startEvent = isTouch ? e.touches[0] : e;

        if (startEvent.target.tagName === "BUTTON") return;

        const letterEl = e.currentTarget;

        const rect = letterEl.getBoundingClientRect();

        const offsetX = startEvent.clientX - rect.left;
        const offsetY = startEvent.clientY - rect.top;

        const startLeft = rect.left + window.scrollX;
        const startTop = rect.top + window.scrollY;

        letterEl.style.transform = "none";
        letterEl.classList.remove("-translate-x-1/2");
        letterEl.classList.remove("-translate-y-1/2");

        letterEl.style.position = "absolute";
        letterEl.style.left = `${startLeft}px`;
        letterEl.style.top = `${startTop}px`;
        letterEl.style.margin = 0;
        letterEl.style.zIndex = zIndexCounter;
        setZIndexCounter(prev => prev + 1);

        const moveAt = (posX, posY) => {
            letterEl.style.left = `${posX - offsetX}px`;
            letterEl.style.top = `${posY - offsetY}px`;
        };

        const onMouseMove = (moveEvent) => {
            const ev = isTouch ? moveEvent.touches[0] : moveEvent;
            moveAt(ev.clientX, ev.clientY);
        };

        const onMouseUp = () => {
            if (isTouch) {
                document.removeEventListener("touchmove", onMouseMove);
                document.removeEventListener("touchend", onMouseUp);
            } else {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
        };

        if (isTouch) {
            document.addEventListener("touchmove", onMouseMove);
            document.addEventListener("touchend", onMouseUp);
        } else {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };


    const handleCloseLetter = (id) => {
        setLetters((prev) => prev.filter((l) => l.id !== id));
    };


    return (
        <main className='munna bg-[#8b0000] h-screen w-full overflow-hidden'>
            {/* Close button to go back to main page */}
            <div onClick={() => navigate('/')} className="crossAll" style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 999999 }}>
                <GiCrossMark className="text-white" />
            </div>
            <section className="munna cssletter z-10">
                <div className={`envelope ${openEnvelope ? "active" : ""}`}>
                    <button
                        className="munna heart"
                        id="openEnvelope"
                        aria-label="Open Envelope"
                        onClick={() => setOpenEnvelope(true)}
                    >
                        <span className="munna heart-text">Open</span>
                    </button>
                    <div className="munna envelope-flap text-black relative">
                        <div className='munna absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center justify-center flex-col md:gap-y-2'>
                            <span className='munna font-sriracha md:text-2xl text-lg'>Envelope Of Love</span>
                            <span className='munna font-dancingScript md:text-3xl text-xl'>From Sarathi</span>
                        </div>
                    </div>
                    <div className="munna envelope-folds">
                        <div className="munna envelope-left"></div>
                        <div className="munna envelope-right"></div>
                        <div className="munna envelope-bottom"></div>
                    </div>
                </div>

                <div className="munna letters" ref={lettersContainerRef}>
                    {letters.map((letter) => (
                        <blockquote
                            key={letter.id}
                            className="munna letter center -translate-x-1/2 -translate-y-1/2"
                            id={letter.id}
                            tabIndex={0}
                            style={{
                                position: 'absolute',
                                top: window.innerWidth < 768 ? '53%' : '50%',
                                left: window.innerWidth < 768 ? '50%' : '50%',
                                transform: 'none',
                            }}

                            onMouseDown={(e) => handleMouseDown(e, letter.id)}
                            onTouchStart={handleMouseDown}
                        >
                            <button
                                className="munna closeLetter"
                                title={`Close ${letter.name}'s letter`}
                                onClick={() => handleCloseLetter(letter.id)}
                            >
                                Close {letter.name}'s letter
                            </button>
                            <p>{letter.msg}</p>
                            <cite>— {letter.name}</cite>
                        </blockquote>
                    ))}
                </div>
            </section>


            {/* ------------------ Heart Beating  */}
            <div className="munna heart-container absolute top-[20%] md:left-20 left-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            <div className="munna heart-container absolute bottom-[10%] md:right-20 right-6 rotate-180">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            {/* ------------------ Heart Falling  */}
            <div className="munna snowflakes z-0">
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
                <div className="munna snowflake">
                    <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" />
                </div>
            </div>
        </main>
    )
}

export default LoveLetter