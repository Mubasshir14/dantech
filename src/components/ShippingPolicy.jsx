import React from 'react';

const ShippingPolicy = () => {
    return (
        <section className="container mx-auto py-12 px-6 max-w-screen-xl text-justify">
            <h1 className="text-3xl font-semibold text-center mb-8 font-poppin uppercase  text-black">Shipping Policy</h1>
            <div className="space-y-6 text-gray-700 leading-relaxed">
                
                <p className="text-lg">
                    We work hard to get your order to you as soon as possible! Here’s everything you need to know about our shipping process, rates, and timelines.
                </p>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Shipping Rates</h2>
                    <p>
                        Shipping rates vary based on your location and the shipping method you choose at checkout. You can view these rates and select your preferred option during the checkout process. Orders over <span className="font-bold">$50</span> qualify for free standard shipping.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Processing Time</h2>
                    <p>
                        Orders are typically processed within <span className="font-bold">1-2 business days</span>. During high-demand periods, processing may take slightly longer, but we’ll keep you informed if there are any delays.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Domestic Shipping</h2>
                    <p>
                        We offer multiple shipping options to fit your needs:
                    </p>
                    <ul className="list-disc list-inside ml-4">
                        <li><span className="font-bold">Standard Shipping</span>: 5-7 business days.</li>
                        <li><span className="font-bold">Express Shipping</span>: 2-3 business days.</li>
                        <li><span className="font-bold">Next-Day Delivery</span>: Available in select locations for orders placed by 5 PM.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">International Shipping</h2>
                    <p>
                        We ship to select countries internationally! Delivery times and shipping fees will vary based on the destination. Please note that international shipments may be subject to customs duties, taxes, or additional fees upon arrival.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Order Tracking</h2>
                    <p>
                        Once your order is shipped, we’ll send you a tracking link via email. You can use this link to track your order’s journey from our warehouse to your doorstep. For any tracking issues, please contact our <a href="/support" className="text-[#065f4a] underline">Customer Support</a> team for assistance.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#097969]">Lost or Delayed Packages</h2>
                    <p>
                        If your package is delayed or appears lost, please reach out to us within <span className="font-bold">7 days</span> of the expected delivery date. We’re here to help ensure you receive your order or get the necessary support in case of delays.
                    </p>
                </div>

                {/* <p className="text-center mt-8">
                    If you have any questions about shipping, please contact our <a href="/support" className="text-[#097969] underline">Customer Support</a> team. We’re here to help!
                </p> */}
            </div>
        </section>
    );
};

export default ShippingPolicy;
