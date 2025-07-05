import React from 'react'

const Processing = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FBF6ED] to-[#F7F0E4]">
            {/* Gradient ring spinner */}
            <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 opacity-20" />
                <div className="h-full w-full animate-spin rounded-full border-[6px] border-orange-500 border-t-transparent" />
            </div>

            {/* Message */}
            <p className="mt-6 text-lg font-medium text-gray-700">
                Your payment is processing...
            </p>
        </div>
    )
}

export default Processing