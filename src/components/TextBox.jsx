import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'

export default function TextBox({value, onValueChange, id, type, label, placeholder})
{
    const [inputType, setInputType] = useState(type);

    return (
        <div className='flex flex-col relative'>
            <label htmlFor={id}>{label}</label>
            <input
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                required
                className='rounded dark:bg-neutral-800 dark:border-neutral-600 border-neutral-200 focus:border-amber-400 focus:outline-amber-400 py-3 focus:ring-0 transition-colors dark:placeholder:text-neutral-500'
                type={inputType}
                autoComplete='on'
                id={id}
                placeholder={placeholder}/>

            {type === 'password' &&
                <button onClick={() => setInputType(currentType => currentType === 'password' ? 'text' : 'password')}
                        type='button' className='absolute right-4 top-[38px]'>
                    {
                        <FontAwesomeIcon size='sm' icon={inputType === 'password' ? faEyeSlash : faEye}/>
                    }
                </button>}
        </div>
    );
}