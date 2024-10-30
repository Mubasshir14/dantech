import React, { useState } from 'react';

const Blog = () => {
    const [expanded, setExpanded] = useState(Array(5).fill(false));

    const toggleExpand = (index) => {
        setExpanded(expanded.map((item, idx) => (idx === index ? !item : item)));
    };

    const blogs = [
        {
            title: "Top 10 Gadgets for 2024",
            description: "From foldable phones and smart glasses to AI-powered wearables, discover the top tech gadgets making waves this year. We’ve handpicked the latest devices that redefine convenience and connectivity, including gadgets that support smart homes, health tracking, and enhanced mobile entertainment.",
            date: "October 25, 2024",
            fullText: "From foldable phones and smart glasses to AI-powered wearables, discover the top tech gadgets making waves this year. We’ve handpicked the latest devices that redefine convenience and connectivity, including gadgets that support smart homes, health tracking, and enhanced mobile entertainment. Get insights into why these gadgets are topping the charts and how they can fit into your lifestyle."
        },
        {
            title: "Smart Home Essentials",
            description: "Transform your living space with the ultimate smart home essentials. This guide covers everything you need, from smart speakers and lighting to security systems and automated thermostats, designed to seamlessly integrate with modern lifestyle needs and bring your home into the future.",
            date: "October 18, 2024",
            fullText: "Transform your living space with the ultimate smart home essentials. This guide covers everything you need, from smart speakers and lighting to security systems and automated thermostats. Find out which products are must-haves and how they can elevate your daily routines, offering comfort and control at your fingertips."
        },
        {
            title: "The Future of AI in Consumer Electronics",
            description: "Artificial Intelligence is rapidly transforming how we interact with technology. This article explores AI-driven devices like voice assistants, smart TVs, and health trackers, revealing the potential future impact on convenience and productivity.",
            date: "October 15, 2024",
            fullText: "Artificial Intelligence is rapidly transforming how we interact with technology. From voice-activated personal assistants to AI-driven smart TVs and wearable health trackers, this article explores the future of AI in consumer electronics and its role in shaping smarter, more intuitive devices. Discover how AI can redefine your everyday interactions and what new advancements to expect in this field."
        },
        {
            title: "Best Budget-Friendly Tech Gadgets",
            description: "Looking for quality tech on a budget? This guide covers affordable smartphones, noise-canceling earbuds, and portable speakers that won’t break the bank.",
            date: "October 10, 2024",
            fullText: "Want cutting-edge tech without breaking the bank? We’ve rounded up the best budget-friendly gadgets that don’t compromise on quality. Learn about affordable smartphones, noise-canceling earbuds, and portable speakers that are perfect for tech enthusiasts on a budget. Discover how you can enjoy high-quality devices with exceptional functionality at a fraction of the usual cost."
        },
        {
            title: "Top 5 Wireless Earbuds of 2024",
            description: "Explore our picks for the best wireless earbuds of 2024, featuring top-notch audio quality, comfort, and battery life for music lovers and athletes alike.",
            date: "October 5, 2024",
            fullText: "Stay untethered and enjoy crystal-clear sound with our picks for the best wireless earbuds of 2024. We review top models for audio quality, comfort, battery life, and smart features that make them ideal for music lovers, athletes, and travelers alike. Find out which earbuds offer the best combination of sound, durability, and connectivity for a seamless listening experience."
        },
        {
            title: "Guide to Sustainable Tech Purchases",
            description: "Learn how to make sustainable tech choices in 2024, focusing on eco-friendly brands and products with a lower environmental impact.",
            date: "September 30, 2024",
            fullText: "Thinking about your carbon footprint? Discover sustainable tech choices in 2024, with a focus on eco-friendly brands and products with a reduced environmental impact. From energy-efficient appliances to gadgets built from recyclable materials, learn how to make tech purchases that support a greener future."
        },
        {
            title: "5G Technology: What's New in 2024",
            description: "Uncover the latest advancements in 5G and how they’re shaping faster, more reliable connectivity in mobile networks worldwide.",
            date: "September 20, 2024",
            fullText: "With 5G becoming increasingly available, this article uncovers the latest advancements in 5G and its impact on connectivity. Learn how 5G enables faster download speeds, improves latency, and enhances connectivity for mobile networks worldwide, making it an essential tech upgrade for seamless internet experiences in 2024."
        },
        {
            title: "Gaming Consoles: Next-Gen Updates",
            description: "An in-depth look at the new features and performance improvements in the latest gaming consoles, from graphics upgrades to new gaming experiences.",
            date: "September 10, 2024",
            fullText: "Gaming consoles have evolved dramatically, and the latest next-gen models offer stunning graphics and immersive gaming experiences. This article dives into the latest features, including graphics upgrades, faster processing power, and new VR capabilities, giving gamers the ultimate interactive experience in 2024."
        },
        {
            title: "Tech Trends: What to Expect in 2025",
            description: "Prepare for the tech innovations predicted for 2025, from advanced AI to more integrated smart home ecosystems and wearable technologies.",
            date: "September 1, 2024",
            fullText: "The future of tech looks brighter than ever. This article prepares you for the major tech innovations expected in 2025, from more advanced AI applications and integrated smart home ecosystems to wearable technologies that offer health and wellness insights. See what’s next in the world of consumer electronics and how these trends can shape the way you live."
        }
    ];
    

    return (
        <section className="container mx-auto py-10 px-4 max-w-screen-xl text-justify">
            <h1 className="text-4xl font-bold font-poppin uppercase text-center mb-12 text-black">Latest Blogs</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-lg shadow-lg p-6 transform hover:-translate-y-2 transition duration-300 hover:shadow-xl"
                    >
                        <h2 className="text-2xl font-semibold mb-2 text-[#333]">{blog.title}</h2>
                        <p className="text-gray-400 text-sm mb-4">{blog.date}</p>
                        <p className="text-gray-600 leading-relaxed">
                            {expanded[index] ? blog.fullText : blog.description}
                        </p>
                        <button 
                            onClick={() => toggleExpand(index)} 
                            className="mt-6 px-4 py-2 bg-[#097969] text-white rounded hover:bg-[#065f4a] transition duration-300 focus:outline-none"
                        >
                            {expanded[index] ? "Show Less" : "Read More"}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blog;
