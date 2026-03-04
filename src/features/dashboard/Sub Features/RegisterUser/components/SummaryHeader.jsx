import React from 'react'
import Button from '../../../../../shared/components/UI/Button/Button'

const SummaryHeader = ({ handleAddClick }) => {
    return (
        <>
            <div className="grid grid-cols-[1fr_auto] items-center w-full">

                {/* Left Side */}
                <div>
                    <p>Summary</p>
                    <small>Summary cards for supervisor overview</small>
                </div>

                {/* Right Side */}
                <div>

                    <Button
                        onClick={handleAddClick}
                        size="sm"
                    >
                        Add new user
                    </Button>
                </div>

            </div>

        </>
    )
}

export default SummaryHeader
