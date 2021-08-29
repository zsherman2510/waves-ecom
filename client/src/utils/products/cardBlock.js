import React from 'react'
import Card from './card';
const CardBlock = ({items, title, shop, isGrid}) => {
    
    
    const renderCards = () => (
        items ?
            items.map((item) => (
                <Card
                    key={item._id}
                    item={item}
                    grid={isGrid}
                />
            ))
        : null
    )
    
    
    return (
        <div className={shop ? 'card_block_shop' : 'card_block'} >
            <div className={shop ? '': 'container'}>
                {
                    title ? 
                    <div className="title">
                        {title}
                    </div> : null
                
                }
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {renderCards()}
                </div>
            </div>
            
        </div>
    )
}

export default CardBlock
