import React from 'react';
import { FaRegHandshake, FaCreditCard, FaUndo, FaUserShield, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';

const TermsAndConditions = () => {
    return (
        <section className="container mx-auto py-12 px-4 max-w-screen-xl text-justify">
            <h1 className="text-3xl font-semibold text-center mb-8 font-poppin uppercase  text-black">Terms & Conditions</h1>
            <div className="space-y-6 text-gray-700">
                
                <div className="flex items-center space-x-3">
                    <FaRegHandshake className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                </div>
                <p className="ml-8">By accessing and using this website, you confirm that you agree to comply with these terms and conditions. Please review them carefully before making any purchase.</p>
                
                <div className="flex items-center space-x-3">
                    <FaCreditCard className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">2. Payment & Billing</h2>
                </div>
                <p className="ml-8">We accept major credit cards, PayPal, and other available payment methods. All payments are processed securely. Please ensure that your billing information is accurate to avoid delays.</p>
                
                <div className="flex items-center space-x-3">
                    <FaUndo className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">3. Returns & Refunds</h2>
                </div>
                <p className="ml-8">Returns are accepted within 30 days of purchase. Items must be unused and in original packaging. Refunds will be credited to the original payment method within 5-7 business days after we receive the return.</p>

                <div className="flex items-center space-x-3">
                    <FaUserShield className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">4. Privacy Policy</h2>
                </div>
                <p className="ml-8">We value your privacy. Personal information collected on this site is protected and used only to process your orders and improve our services. For details, see our <a href="/privacy-policy" className="text-[#065f4a] underline">Privacy Policy</a>.</p>
                
                <div className="flex items-center space-x-3">
                    <FaShieldAlt className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">5. Security</h2>
                </div>
                <p className="ml-8">Our website uses encryption and secure protocols to protect your information. However, we recommend you take steps to safeguard your online accounts, such as choosing strong passwords and keeping them private.</p>

                <div className="flex items-center space-x-3">
                    <FaQuestionCircle className="text-[#097969] text-2xl" />
                    <h2 className="text-xl font-semibold">6. Changes to Terms</h2>
                </div>
                <p className="ml-8">We may update these terms from time to time. Changes will be posted on this page. By continuing to use our site, you agree to any revised terms and conditions.</p>
                
                {/* <p className="text-center mt-8">
                    For further inquiries, please contact our <a href="/support" className="text-[#097969] underline">Customer Support</a> team. We’re here to assist you!
                </p> */}
            </div>
        </section>
    );
};

export default TermsAndConditions;
