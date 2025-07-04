'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Card from '../../components/Card';
import { useRouter } from 'next/navigation';

const mockUser = {
    name: 'John Willis',
    email: 'john@example.com',
    xp: 4800,
    levelXP: 8000,
    gameWins: 27,
    highScore: 910,
    correctAnswers: 218,
    achievements: ['Comeback', 'Lucky', 'Leader'],
    inventory: ['Extra time', '50/50', 'Most popular answer']
};
export default function UserDashboard() {
    const router = useRouter();
    const xpRef = useRef();
    useEffect(() => {
        requestAnimationFrame(() => {
            const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power3.out' } });

            tl.fromTo(
                xpRef.current,
                { width: '0%' },
                { width: `${(mockUser.xp / mockUser.levelXP) * 100}%` },
                '-=0.5'
            );

            // tl.from('.animate-entry', {
            //     opacity: 0,
            //     y: 30,
            //     stagger: 0.1,
            // }, '-=0.3');
        });

    }, []);


    return (
        <div className=" bg-[var(--bg)] text-[var(--text-primary)] p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 animate-entry">
                <aside className="w-full sm:w-64 bg-[var(--primary)] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Quizopedia</h2>
                        <ul className="space-y-4">
                            <li>🏆 Leaderboard</li>
                            <li>🛒 Shop</li>
                            <li>🎧 Support</li>
                            <li>🔔 Notification</li>
                        </ul>
                    </div>
                    <div className="mt-6 text-sm opacity-70">{mockUser.name}</div>
                </aside>

                <main className="flex-1">
                    <div className="bg-[var(--primary)] p-6 rounded-2xl shadow-xl animate-entry">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-2xl font-bold">
                                    {mockUser.name.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-[var(--text-heading)]">{mockUser.name}</h1>
                                    <p className="text-sm text-[var(--text-secondary)]">{mockUser.email}</p>
                                    {/* </div>
                            <div> */}
                                    {/* <h1 className="text-2xl font-bold text-[var(--text-heading)]">{mockUser.name}</h1>
                                <p className="text-sm text-[var(--text-secondary)]">{mockUser.email}</p> */}
                                    <div className="mt-2 w-48 bg-[var(--bg)] h-3 rounded-full overflow-hidden">
                                        <div
                                            ref={xpRef}
                                            className="bg-[var(--accent)] h-full transition-all duration-700 rounded-full"
                                        ></div>
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                                        XP: {mockUser.xp} / {mockUser.levelXP}
                                    </p>
                                </div>

                            </div>
                            <div className="mt-4 md:mt-0 flex gap-4">
                                <button className="bg-white text-[var(--text-accent)] font-bold py-2 px-4 rounded-xl">Join Lobby</button>
                                <button
                                onClick={() => router.push("/user/quiz")}
                                className="bg-[var(--text-accent)]/70 text-white font-bold py-2 px-4 rounded-xl cursor-pointer md:hover:bg-[var(--text-accent)]">Start Quiz</button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <Card className="flex-1 animate-entry p-4">
                                <p className="text-xl font-bold">{mockUser.gameWins}</p>
                                <p className="text-sm opacity-70">Game Wins</p>
                            </Card>
                            <Card className="flex-1 animate-entry p-4">
                                <p className="text-xl font-bold">{mockUser.highScore}</p>
                                <p className="text-sm opacity-70">Highest Score</p>
                            </Card>
                            <Card className="flex-1 animate-entry p-4">
                                <p className="text-xl font-bold">{mockUser.correctAnswers}</p>
                                <p className="text-sm opacity-70">Correct Answers</p>
                            </Card>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-4 animate-entry">
                                <h3 className="font-bold mb-3">Achievements</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mockUser.achievements.map((a, i) => (
                                        <span
                                            key={i}
                                            className="bg-[var(--accent)]/10 text-[var(--text-accent)] px-3 py-1 rounded-full text-sm"
                                        >
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                            <Card className="p-4 animate-entry">
                                <h3 className="font-bold mb-3">Inventory</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mockUser.inventory.map((item, i) => (
                                        <span
                                            key={i}
                                            className="bg-[var(--accent)]/10 text-[var(--text-accent)] px-3 py-1 rounded-full text-sm"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
