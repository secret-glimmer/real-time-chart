import React from 'react';
import {motion} from 'framer-motion';
import {useDashboardLayout} from "../context/DashboardLayoutContext.jsx";

const Card = React.forwardRef(({
                                   id,
                                   style,
                                   className,
                                   onMouseDown,
                                   onMouseUp,
                                   onTouchEnd,
                                   isEnabled,
                                   setIsEnabled,
                                   title,
                                   onVisibilityChangedHandler,
                                   children,
                                   ...props
                               }, ref) =>
{
    const {isEditingLayout} = useDashboardLayout();
    const bgColor = isEnabled ?
        'bg-gray-50 dark:bg-neutral-800' :
        'bg-red-200 dark:bg-red-950';

    return (
        <motion.div style={{...style}}
                    className={`flex flex-col gap-7 items-start shadow-md rounded-lg p-4 dark:text-white w-full select-none ${className} ${bgColor}`}
                    ref={ref}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onTouchEnd={onTouchEnd}
                    initial="hidden"
                    animate="visible"
                    variants={animation}>
            
             <span className='flex justify-between items-center w-full'>
                <h4 className='text-sm'>{title}</h4>
                 {
                     isEditingLayout &&
                     <span className='flex gap-4'>
                             <CheckBox isChecked={isEnabled} onCheckHandler={() => setIsEnabled(id, isEnabled)}/>
                         <span
                             className='w-5 h-5 fill-amber-400 flex justify-center items-center drag-handle cursor-grab active:cursor-grabbing'>
                         <svg width={'15px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                             <path
                                 d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"/>
                         </svg>
                     </span>
                     </span>
                 }
            </span>

            <span className='m-auto w-full'>{children}</span>
        </motion.div>
    );
})

const animation = {
    hidden: {
        opacity: 0,
        willChange: "opacity"
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.5,
        },
    },
};

export default Card;

function CheckBox({isChecked, onCheckHandler})
{
    return (
        <span className='flex justify-cente items-center'>
            <button title='Show/Hide chart'
                    className='w-5 h-5 flex justify-center items-center rounded hover:bg-amber-100 dark:hover:bg-amber-900 aspect-square'
                    onClick={onCheckHandler}>
                
                {isChecked ?
                    <svg className='fill-amber-400' xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path
                            d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                    :
                    <svg className='fill-amber-400' xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path
                            d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"/>
                    </svg>
                }
            </button>
        </span>
    )
}