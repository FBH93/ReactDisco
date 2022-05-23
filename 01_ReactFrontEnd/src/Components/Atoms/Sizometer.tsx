import { Component } from 'react'

export class Sizometer extends Component {
  render() {
    return (
      <>
        <div className="row text-center mt-5">
          <div className="col">
            <div
              className="btn-group btn-group-toggle"
              style={{ paddingBottom: '16px' }}
              data-toggle="buttons"
            >
              <label className="btn btn-secondary">
                <input
                  type="radio"
                  name="size"
                  id="S"
                  autoComplete="off"
                  defaultChecked
                />{' '}
                S
              </label>
              <label className="btn btn-secondary">
                <input type="radio" name="size" id="M" autoComplete="off" /> M
              </label>
              <label className="btn btn-secondary">
                <input type="radio" name="size" id="L" autoComplete="off" /> L
              </label>
              <label className="btn btn-secondary">
                <input type="radio" name="size" id="XL" autoComplete="off" /> XL
              </label>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Sizometer
