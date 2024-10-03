import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ProviderButton({icon,onClickHandler})
{
    return (
        <button
            type={'button'}
            onClick={onClickHandler}
            className='rounded bg-white dark:bg-neutral-800 dark:border-neutral-600 border w-14 transition-colors hover:border-0 hover:bg-amber-400 aspect-square'>
            <FontAwesomeIcon icon={icon} className='dark:fill-white' size='xl'></FontAwesomeIcon>
        </button>
    )
}