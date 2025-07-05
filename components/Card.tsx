'use client';

import React from 'react'
import { Button } from './ui/button'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const Card = () => {
    return (
        <div
            className="w-full m-2 bg-white border border-indigo-100 rounded-[25px] shadow-lg overflow-hidden"
        >
            {/* angled hero photo */}
            <div className="relative h-56">
                <Image
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="image"
                    fill
                    sizes="295px"
                    className="rotate-6 -translate-x-2 -translate-y-14 rounded-br-[30px] object-cover object-center"
                    priority
                />
            </div>

            {/* info */}
            <div className="flex justify-between items-end px-6 pb-5 space-x-4">
                <div>
                    <span className="inline-block mb-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                        Vagetable
                    </span>
                    <h3 className="text-lg font-bold">Chicken Pizza</h3>

                </div>

                <div className="text-right">
                    <p className="text-orange-500 font-bold">$21</p>
                    <div className="flex justify-end gap-[1px]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`h-4 w-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* actions */}
            <div className="border-t flex gap-3 px-6 py-4">
                <Button
                    type="submit"
                    className="h-12 text-lg font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
                >
                    Add to cart
                </Button>
                <Button className="flex-1 h-12 text-sm font-semibold py-2 border border-orange-500 text-orange-500 bg-transparent hover:bg-indigo-50 transition-colors">
                    View
                </Button>
            </div>
        </div>
    )
}

export default Card