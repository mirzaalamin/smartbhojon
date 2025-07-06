import React, { ReactElement } from 'react'
import { Button } from './ui/button'
import { MenuItem } from '@/app/page'

interface ItemProps {
    onClose: () => void;
    selectedViewItem: MenuItem | null;   // ⬅️ allow “no item”
    renderStars: (rating: number) => ReactElement;
}

const ViewItem = ({ onClose, selectedViewItem, renderStars }: ItemProps) => {

    if (!selectedViewItem) return null;

    return (
        <div>
            <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[800px]">
                            <div className="bg-white">

                                <div className="text-center sm:mt-0 sm:text-left">
                                    <img src={selectedViewItem.image} alt='thumbnail' className='w-full h-[450px] object-cover' />
                                    <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                        <h3 className="text-3xl font-semibold text-gray-900" id="dialog-title">{selectedViewItem.name}</h3>
                                        <div className="mt-2">
                                            <p className="text-[21px] text-gray-500">{selectedViewItem.description}</p>

                                        </div>
                                        <div className="mt-4 text-[21px] flex items-center justify-center lg:justify-start">
                                            {renderStars(selectedViewItem.rating)}
                                        </div>
                                        <h3 className="text-2xl mt-2 font-semibold text-gray-900" id="dialog-title">${selectedViewItem.price}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 cursor-pointer" onClick={onClose}>
                                <Button type="button" className="h-12 text-lg font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg w-full cursor-pointer">Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewItem