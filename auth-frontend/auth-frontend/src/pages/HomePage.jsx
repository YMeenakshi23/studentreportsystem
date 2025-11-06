import React from 'react';

function HomePage() {
    return (
        <div className="bg-slate-900 text-slate-200 antialiased font-sans">
            {/* Hero Section */}
            <main>
                <section className="container mx-auto px-6 py-20 text-center">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                        Streamline Academic Reporting with Our
                        <span className="block text-cyan-400 mt-2">Intelligent Report System</span>
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400">
                        Empower teachers and students with a seamless, intuitive, and accurate platform for generating and analyzing academic reports.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="/login" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">Get Started</a>
                        <a href="#" className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-3 px-8 rounded-lg transform hover:scale-105 transition-transform">Learn More</a>
                    </div>
                </section>

                {/* Cards Section */}
                <section className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-slate-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-cyan-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-100 mb-2">Automated Reporting</h3>
                            <p className="text-slate-400">Generate detailed academic reports instantly, saving valuable time for educators and staff.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-slate-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-cyan-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2 2m-2-2v11m-4-6h4m-4 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-100 mb-2">Real-Time Insights</h3>
                            <p className="text-slate-400">Monitor student performance and progress with real-time data visualization and analytics dashboards.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-slate-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-cyan-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 2.21-3.582 4-8 4S0 13.21 0 11s3.582-4 8-4 8 1.79 8 4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 2.21-3.582 4-8 4S0 13.21 0 11s3.582-4 8-4 8 1.79 8 4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v11a2 2 0 002 2h2a2 2 0 002-2v-11" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 10h-2M6 8v11a2 2 0 002 2h2a2 2 0 002-2v-11" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-100 mb-2">Secure & Reliable</h3>
                            <p className="text-slate-400">Your data is safe with us. We ensure a secure and reliable platform with robust encryption and access controls.</p>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-white mb-4">About Our Project</h2>
                        <p className="text-lg text-slate-400 mb-4">
                            The Student Report System is a comprehensive platform designed to revolutionize the way academic data is managed and presented. Our goal is to provide a seamless and efficient tool for schools, colleges, and educational institutions to create, store, and distribute student reports. By leveraging modern technology, we aim to reduce administrative burdens and provide a clear, insightful view of student performance for all stakeholders.
                        </p>
                        <p className="text-lg text-slate-400">
                            Our team is committed to continuous improvement, incorporating feedback from educators and students to ensure the system meets their evolving needs. With a focus on user experience, security, and data accuracy, we are building a foundation for smarter and more effective academic reporting.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://placehold.co/600x400/1e293b/d1d5db?text=Student+System+Image" alt="Student Report System illustration" className="rounded-xl shadow-lg w-full" />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-800 py-12 mt-20">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Project Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Student Report System</h3>
                        <p className="text-sm text-slate-400">Simplifying academic reporting, one report at a time.</p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Quick Links</h3>
                        <nav className="flex flex-col space-y-1 text-sm text-slate-400">
                            <a href="/" className="hover:text-cyan-400 transition-colors">Home</a>
                            <a href="/about" className="hover:text-cyan-400 transition-colors">About Us</a>
                            <a href="/login" className="hover:text-cyan-400 transition-colors">Login</a>
                            <a href="/register" className="hover:text-cyan-400 transition-colors">Register</a>
                        </nav>
                    </div>

                    {/* Social Media & Contact */}
                    <div className="md:text-right">
                        <h3 className="text-xl font-bold text-white mb-2">Connect With Us</h3>
                        <div className="flex justify-center md:justify-end space-x-4">
                            {/* Telegram Icon */}
                            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.32 8.5l-6.23 3.49c-.66.38-.85.7-.85 1.15 0 .28.2.55.57.73l.24-.07c.28-.15.54-.3.73-.55l.23-.2c.18-.17.38-.28.61-.31.2-.03.4-.01.59.04.28.06.5.2.66.44l.05.07c.2.28.45.47.74.58.29.11.59.16.89.16h.08c.32 0 .62-.11.9-.32l.06-.05c.29-.24.53-.5.71-.8.18-.3.3-.64.36-1.01l.01-.06c.07-.37.11-.7.12-1.01v-.02c0-.32-.04-.62-.12-.89l-.04-.07c-.12-.27-.29-.5-.5-.68-.21-.18-.44-.31-.69-.4l-.06-.02c-.24-.08-.51-.12-.76-.12zM9.5 12.5l2.5-1.5 2.5 1.5-2.5 2.5-2.5-2.5z"/>
                                </svg>
                            </a>
                            {/* WhatsApp Icon */}
                            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.55.38 3.06 1.1 4.41L2.05 22l5.05-1.32c1.32.74 2.84 1.13 4.44 1.13 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm4.5 14.93l-.27-.16c-.4-.24-2.45-1.5-2.83-1.66-.38-.15-.82-.23-1.25.13-.42.36-.61.79-.81 1-.2.2-.42.22-.78.1-.35-.12-1.5-.55-1.92-.89-.42-.34-.84-.81-.98-.99-.15-.18-.2-.36-.05-.53.15-.17.3-.29.45-.43.15-.13.31-.22.45-.34.15-.12.2-.21.2-.36s-.08-.26-.18-.44c-.1-.17-.46-.99-.64-1.36-.18-.37-.36-.3-.5-.31-.13-.01-.29-.01-.44-.01s-.4-.05-.62-.05c-.23 0-.49.03-.7.25-.2.22-.76.76-.76 1.86s.78 2.15.89 2.3c.12.15 1.51 2.31 3.65 3.23 2.14.92 2.5 1.05 3.01 1.2.5.15.96.13 1.32-.01s.75-.38 1.17-.65c.42-.27.76-.58 1.04-.94s.48-.65.69-.97c.2-.3.35-.6.5-.9s.2-.5.18-.62c-.02-.12-.13-.2-.27-.28z"/>
                                </svg>
                            </a>
                            {/* LinkedIn Icon */}
                            <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.768s.784-1.768 1.75-1.768 1.75.79 1.75 1.768-.784 1.768-1.75 1.768zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6 mt-8 text-center text-sm text-slate-500 border-t border-slate-700 pt-8">
                    <p>&copy; 2025 Student Report System. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
