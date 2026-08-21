import svgPaths from "./svg-6godka2g4z"
import imgEfdf3A28F4E8E4C39A78C19935D40522 from "./227683f0abb7d11c998e4effe3e88b908cc04adf.png"
import imgEfdf3A28F4E8E4C39A78C19935D040522 from "./0d3d4883adcc394081b58ba7c6df306a17cf4d60.png"
import { imgEfdf3A28F4E8E4C39A78C19935D040521 } from "./svg-fyinl"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "src" in val) return (val as any).src;
  return String(val);
}

type HistoriqueProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function Historique({ className, property1 = "Default" }: HistoriqueProps) {
  const isVariant2 = property1 === "Variant2"
  return (
    <div className={className || "relative size-[120px]"}>
      <div className="absolute contents left-[3.45px] top-px">
        <div
          className="absolute contents left-[3.45px] top-[5.42px]"
          data-name="Mask group"
        >
          <div
            className="absolute h-[165.692px] left-[3.45px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_52.059px] mask-size-[112.887px_112.887px] top-[-46.64px] w-[113.913px]"
            style={{
              maskImage: `url("${imgEfdf3A28F4E8E4C39A78C19935D040521}")`,
            }}
            data-name="efdf3a28f4e8e4c39a78c19935d04052 1"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={toImgSrc(imgEfdf3A28F4E8E4C39A78C19935D40522)}
            />
          </div>
        </div>
        <div
          className="absolute h-[57.338px] left-[74.9px] top-px w-[41.901px]"
          data-name="efdf3a28f4e8e4c39a78c19935d04052 2"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[288.46%] left-[-163.16%] max-w-none top-[-84.62%] w-[263.16%]"
              src={toImgSrc(imgEfdf3A28F4E8E4C39A78C19935D040522)}
            />
          </div>
        </div>
      </div>
      {isVariant2 && (
        <>
          <div
            className="absolute left-[3px] size-[113.5px] top-[5px]"
            data-name="Union"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="113.5"
              preserveAspectRatio="none"
              viewBox="0 0 113.5 113.5"
              width="113.5"
            >
              <path
                d={svgPaths.p312d6170}
                fill="#151838"
                fillOpacity="0.7"
                id="Union"
              />
            </svg>
          </div>
          <div
            className="absolute h-[29.548px] left-[49px] top-[45px] w-[22px]"
            data-name="Union"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="29.5479"
              preserveAspectRatio="none"
              viewBox="0 0 22 29.5479"
              width="22"
            >
              <path d={svgPaths.p2f5d0000} fill="white" id="Union" />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}

export default function Historique1() {
  return <Historique className="relative size-full" />
}
