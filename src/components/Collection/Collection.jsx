import React from 'react';
import img1 from '../../assets/sw1.jpeg'
import img2 from '../../assets/earbuds1.jpeg'
import img3 from '../../assets/ad4.jpeg'
import img4 from '../../assets/pw3.jpeg'
import img5 from '../../assets/earphone1.jpeg'
import img6 from '../../assets/fan1.jpeg'
import img7 from '../../assets/c4.jpeg'
import img8 from '../../assets/sound.jpeg'
import img9 from '../../assets/microphone.jpeg'
import img10 from '../../assets/monitor.webp'
import img11 from '../../assets/camera.png'
import { Link } from 'react-router-dom';
const Collection = () => {
    return (
        <div id='collection'>
            <div className='max-w-screen-xl mx-auto md:my-20 p-2'>

                {/* <h1 className='text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-5'></h1> */}

                <div className="flex w-full flex-col">

                    <div className="divider text-black font-bold text-xl md:text-2xl font-poppin uppercase text-center mb-5">Featured Categories</div>

                </div>
                <div className='grid grid-cols-4 md:grid-cols-9 gap-3 md:gap-4 '>

                    <Link to='/earbud' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer'>
                            <img className='w-20 rounded-full ' src={img2} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>EARBUDS</h1>
                        </div>
                    </Link>

                    <Link to='/smartwatch' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black  rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer'><img className='w-20 rounded-full' src={img1} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>SMARTWATCH</h1>
                        </div>
                    </Link>

                    <Link to='/earphone' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black  rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer'><img className='w-20 rounded-full' src={img5} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>EARPHONE</h1>
                        </div>
                    </Link>


                    <Link to='/adapter' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black  rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer'><img className='w-20 rounded-full' src={img3} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>ADAPTER</h1>
                        </div>
                    </Link>

                    <Link to='/powerbank' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black  rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer'><img className='w-20 rounded-full' src={img4} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>POWER BANK</h1>
                        </div>
                    </Link>

                    <Link to='/speaker' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black  rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer'><img className='w-20 rounded-full' src={img8} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>SPEAKER</h1>
                        </div>
                    </Link>

                    <Link to='/microphone' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black  rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer'><img className='w-20 rounded-full' src={img9} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>MICROPHONE</h1>
                        </div>
                    </Link>

                    <Link to='/camera' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer '><img className='w-20 rounded-full' src={img10} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>Camera</h1>
                        </div>
                    </Link>

                    <Link to='/monitor' className='flex flex-col items-center justify-center'>
                        <div className='border-2 border-black rounded-full p-2 flex items-center justify-center hover:scale-105 duration-1000 transform cursor-pointer'><img className='w-20 rounded-full' src={img11} alt="" />
                        </div>
                        <div>
                            <h1 className='text-sm text-black md:text-lg hover:scale-105 duration-1000 transform cursor-pointer'>Monitor</h1>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Collection;