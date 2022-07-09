import React from 'react';

const Population = ({ value, buttonText }) => {
   
    return (
        <>

            <div>
                {(() => {
                    if (value) {

                        return (
                            <>

                                <span>

                                    <div style={{ width: '40%', float: 'left', textAlign: 'center', fontSize: '32px',color:'#85c6ff' }}>{value.attributes.population}</div>
                                    <div style={{ width: '40%', float: 'right', fontSize: '32px',color:'#85c6ff' }}>{value.attributes.households}</div>
                                    <div style={{ width: '40%', textAlign: 'center', float: 'left' }}>Population</div>
                                    <div style={{ width: '40%', float: 'right' }}>Households</div>
                                </span>

                                    
                                {buttonText === 'Locality'
                                    ? <span>

                                        <div style={{ width: '40%', float: 'left', textAlign: 'center',color:'#85c6ff' }}>locality: {value.attributes.locality}</div>
                                        <div style={{ width: '40%', float: 'right',color:'#85c6ff' }}>City:{value.attributes.city}</div>

                                    </span>
                                    : <span>

                                        <div style={{ width: '40%', float: 'left', textAlign: 'center',color:'#85c6ff' }}>Country: India</div>
                                        <div style={{ width: '40%', float: 'right',color:'#85c6ff' }}>District: Bangalore</div>

                                    </span>
                                }

                            </>
                        )
                    }
                })()}
            </div>
        </>
    )
}

export default Population;