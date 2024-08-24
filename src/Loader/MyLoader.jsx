import React from 'react';
import { ClipLoader,HashLoader} from 'react-spinners';

const MyLoader = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 9999
    }}>
        {/*#f86c6b*/}
        {/*thurquoise :
        #00FFD1
        */}
        <HashLoader size={100}
                    color={"#00FFD1"}
                    loading={true} />
    </div>
);

export default MyLoader;
