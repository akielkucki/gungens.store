// components/checkoutprogress.tsx
import React from 'react';

export type CheckoutStage = 'cart' | 'username' | 'delivery' | 'payment' | 'confirmation';

interface CheckoutProgressProps {
    currentStage: CheckoutStage;
}

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStage }) => {
    // Define the stages and their order
    const stages: Array<{id: CheckoutStage; label: string; description: string}> = [
        { id: 'username', label: '1', description: 'Username' },
        { id: 'delivery', label: '2', description: 'Delivery' },
        { id: 'payment', label: '3', description: 'Payment' },
        { id: 'confirmation', label: '4', description: 'Confirmation' }
    ];

    // Find the current stage index
    const currentIndex = stages.findIndex(stage => stage.id === currentStage);

    return (
        <div className="mb-6">
            {/* Stage indicators with progress bars */}
            <div className="flex items-center space-x-2 mb-3">
                {stages.map((stage, index) => {
                    const isActive = index <= currentIndex;
                    const isLastStage = index === stages.length - 1;

                    return (
                        <React.Fragment key={stage.id}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                  ${isActive ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'}`}
                            >
                                {stage.label}
                            </div>

                            {!isLastStage && (
                                <div className="h-1 flex-grow bg-zinc-700">
                                    <div
                                        className="h-full bg-white transition-all duration-300"
                                        style={{
                                            width: isActive && index < currentIndex ? '100%' : '0%'
                                        }}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Stage descriptions */}
            <div className="flex justify-between text-xs text-zinc-400 px-1">
                {stages.map((stage, index) => (
                    <div
                        key={`desc-${stage.id}`}
                        className={`${index === stages.length - 1 ? 'text-right' : (index === 0 ? 'text-left' : 'text-center')} ${currentStage === stage.id ? 'text-white font-medium' : ''}`}
                        style={{ width: index === 0 || index === stages.length - 1 ? 'auto' : '100px' }}
                    >
                        {stage.description}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckoutProgress;