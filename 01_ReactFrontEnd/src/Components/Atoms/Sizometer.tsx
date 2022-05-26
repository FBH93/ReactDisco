import { useAtom } from "jotai"
import { sizeAtom } from "../store"

const Sizometer = () => {
  const [, setproductSize] = useAtom(sizeAtom)
  return (
    <>
      <div className="row text-center mt-5">
        <div className="col">
          <div
            className="btn-group btn-group-toggle"
            style={{ paddingBottom: "16px" }}
            data-toggle="buttons"
          >
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="size"
                id="S"
                autoComplete="off"
                onClick={(event) => {
                  setproductSize("S")
                }}
                defaultChecked
              />{" "}
              S
            </label>
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="size"
                id="M"
                autoComplete="off"
                onClick={(event) => {
                  setproductSize("M")
                }}
              />{" "}
              M
            </label>
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="size"
                id="L"
                autoComplete="off"
                onClick={(event) => {
                  setproductSize("L")
                }}
              />{" "}
              L
            </label>
            <label className="btn btn-secondary">
              <input
                type="radio"
                name="size"
                id="XL"
                autoComplete="off"
                onClick={(event) => {
                  setproductSize("XL")
                }}
              />{" "}
              XL
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sizometer
