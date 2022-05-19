import { Component } from 'react'

export class CardButton extends Component {
  render() {
    return (
        <>
            <div className="row text-center mt-1">
                <div className="col"><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{ marginBottom: '25px' }}>Add to cart</button></div>
            </div>
            <div className="alert alert-success cartInfo" role="alert"><span><strong>The item has been added to your card.</strong></span></div>
        </>
    )
  }
}

export default CardButton
