function GoodsItem(props) {
    const {
        id,
        name,
        description,
        images,
        addToBasket = Function.prototype
    } = props

    return (
        <div className="card">       
            <div className="card-image">
                <img src={images.background} alt = {name} />
                <span className="card-title">{name}</span>
            </div>
            <div className="card-content">
                <p>{description}</p>
            </div>
            <div className="card-action">
                <button className="btn" onClick={() =>
                        addToBasket({
                            id,
                            name,                    
                        })}>Buy</button>
            </div>
        </div>
    )
}

export {GoodsItem}
