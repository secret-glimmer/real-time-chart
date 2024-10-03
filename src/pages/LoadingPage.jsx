import {HashLoader} from "react-spinners";

function LoadingPage({message})
{
    return (
        <div className='flex gap-5 text-muted dark:text-white h-screen flex-col justify-center items-center'>
            <HashLoader color="#FFBF00" size={100}/>
            <h4>{message}</h4>
        </div>
    );
}

export default LoadingPage;