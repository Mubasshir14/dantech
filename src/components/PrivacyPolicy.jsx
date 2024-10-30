import React from 'react';
import { FaUser, FaLock, FaUserShield, FaMailBulk } from 'react-icons/fa';

const PrivacyPolicy = () => {
    return (
        <section className="container mx-auto py-12 px-6 max-w-screen-xl text-justify">
            <h1 className="text-3xl font-semibold text-center mb-8 text-[#097969]">Privacy Policy</h1>
            <div className="space-y-6 text-gray-700">
                
                <div className="flex items-center space-x-3">
                    <FaUser className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">1. Information Collection</h2>
                </div>
                <p className="ml-8">
                    We collect personal information you provide, such as when you create an account, make a purchase, or subscribe to our newsletter. We may also gather data on your interactions with our website to enhance our services.
                </p>
                
                <div className="flex items-center space-x-3">
                    <FaMailBulk className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">2. Communication Preferences</h2>
                </div>
                <p className="ml-8">
                    You may receive promotional messages and updates about your orders or new products. You can update your communication preferences in your account settings or opt out by following the unsubscribe link in our emails.
                </p>
                
                <div className="flex items-center space-x-3">
                    <FaUserShield className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">3. Information Usage</h2>
                </div>
                <p className="ml-8">
                    We use your information to complete transactions, personalize your experience, and improve our services. Data insights allow us to offer relevant content, products, and promotions tailored to your interests.
                </p>

                <div className="flex items-center space-x-3">
                    <FaLock className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">4. Information Security</h2>
                </div>
                <p className="ml-8">
                    We use industry-standard security measures, including encryption, secure servers, and access control, to protect your personal data. Regular monitoring and updates help us safeguard against unauthorized access.
                </p>
                
                <div className="flex items-center space-x-3">
                    <FaUserShield className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">5. Data Sharing & Third Parties</h2>
                </div>
                <p className="ml-8">
                    Your data is shared only when necessary, such as with trusted service providers (e.g., payment processors and delivery services) to complete transactions. We do not sell your personal information to third parties.
                </p>
                
                <div className="flex items-center space-x-3">
                    <FaUserShield className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">6. Data Retention & Access</h2>
                </div>
                <p className="ml-8">
                    We retain your information for as long as necessary to fulfill the purposes described in this policy, unless otherwise required by law. You can request access, correction, or deletion of your data by contacting us.
                </p>

                <p className="text-center mt-8">
                    For questions or concerns, please contact our <a href="/support" className="text-[#097969] underline">Customer Support</a> team.
                </p>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
