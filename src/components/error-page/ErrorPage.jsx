import React from 'react';
import { Radio } from 'react-loader-spinner';
import { useNavigate } from 'react-router';

const ErrorPage = () => {

    const navigate = useNavigate();
    return (

        <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center'>
                <div className=''>
                    <Radio
                        visible={true}
                        height="60"
                        width="60"
                        color="#4fa94d"
                        ariaLabel="radio-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
                <span>Not found what you are looking for?</span>
            </div>
            <div className='flex justify-center'>
                <img width={180} src="https://clipart-library.com/images/pTq8grApc.png" alt="" />
            </div>

            <div className='flex flex-col items-center gap-6'>
                <span>
                    Climb the tree to look for network
                </span>
                <span>Or,</span>
                <button
                    className='btn'
                    type='button'
                    onClick={() => navigate(-1)}
                >Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;