import React from 'react';

function AboutUs() {
    // Team member data
    const teamMembers = [
        {
            name: 'Lohitha',
            role: 'Project Lead',
            bio: 'Lohitha is the driving force behind the Student Report System. With a background in educational technology, she ensures our project stays innovative and user-focused.',
            photo: 'https://placehold.co/300x300/1e293b/d1d5db?text=Lohitha',
            social: {
                linkedin: '#',
                telegram: '#',
                mail: '#'
            }
        },
        {
            name: 'Kamakshi',
            role: 'Lead Developer',
            bio: 'Kamakshi brings her expertise in full-stack development to build a robust and scalable platform. She is passionate about creating clean and efficient code.',
            photo: 'https://placehold.co/300x300/1e293b/d1d5db?text=Kamakshi',
            social: {
                linkedin: '#',
                telegram: '#',
                mail: '#'
            }
        },
        {
            name: 'Shanti',
            role: 'UI/UX Designer',
            bio: 'Sneha is responsible for our sleek, user-friendly interface. She believes that good design is key to a great user experience and an intuitive system.',
            photo: 'https://placehold.co/300x300/1e293b/d1d5db?text=Shanti',
            social: {
                linkedin: '#',
                telegram: '#',
                mail: '#'
            }
        }
    ];

    return (
        <div className="bg-slate-900 text-slate-200 antialiased font-sans min-h-screen">
            <main className="container mx-auto px-6 py-16">
                <section className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Team</h2>
                    <p className="max-w-3xl mx-auto text-lg text-slate-400">
                        We are a passionate team dedicated to building a seamless and efficient platform for academic reporting. Meet the individuals who are making it happen.
                    </p>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-slate-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-36 h-36 object-cover rounded-full mb-6 border-4 border-cyan-500 shadow-md"
                                />
                                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-cyan-400 font-semibold mb-4">{member.role}</p>
                                <p className="text-sm text-slate-400 mb-6">{member.bio}</p>
                                
                                {/* Social Media Icons */}
                                <div className="flex space-x-4">
                                    {/* LinkedIn */}
                                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.768s.784-1.768 1.75-1.768 1.75.79 1.75 1.768-.784 1.768-1.75 1.768zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                    {/* Telegram */}
                                    <a href={member.social.telegram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.32 8.5l-6.23 3.49c-.66.38-.85.7-.85 1.15 0 .28.2.55.57.73l.24-.07c.28-.15.54-.3.73-.55l.23-.2c.18-.17.38-.28.61-.31.2-.03.4-.01.59.04.28.06.5.2.66.44l.05.07c.2.28.45.47.74.58.29.11.59.16.89.16h.08c.32 0 .62-.11.9-.32l.06-.05c.29-.24.53-.5.71-.8.18-.3.3-.64.36-1.01l.01-.06c.07-.37.11-.7.12-1.01v-.02c0-.32-.04-.62-.12-.89l-.04-.07c-.12-.27-.29-.5-.5-.68-.21-.18-.44-.31-.69-.4l-.06-.02c-.24-.08-.51-.12-.76-.12zM9.5 12.5l2.5-1.5 2.5 1.5-2.5 2.5-2.5-2.5z"/>
                                        </svg>
                                    </a>
                                    {/* Mail */}
                                    <a href={`mailto:${member.social.mail}`} className="text-slate-400 hover:text-cyan-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AboutUs;
