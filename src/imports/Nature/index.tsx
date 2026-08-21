import svgPaths from "./svg-tdhun7kck7"
import img7065Ad255859Bec235Ddd1E9296F20E22 from "./d9d4573a35f026070859ba208f0c0f13f8c90e60.png"
import img7065Ad255859Bec235Ddd1E9296F20E23 from "./cc8e633f31c2f71b8d280a7e4b13ce5ef2fcd9cb.png"
import { img7065Ad255859Bec235Ddd1E9296F20E21 } from "./svg-gxsv2"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "src" in val) return (val as any).src;
  return String(val);
}

type NatureProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function Nature({ className, property1 = "Default" }: NatureProps) {
  const isVariant2 = property1 === "Variant2"
  return (
    <div className={className || "relative size-[120px]"}>
      <div className="absolute contents left-px top-[4px]">
        <div
          className="absolute contents left-[6.35px] top-[4px]"
          data-name="Mask group"
        >
          <div className="absolute contents left-px top-[-31.7px]">
            <div
              className="absolute h-[189.532px] left-px mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[5.354px_35.697px] mask-size-[113px_113px] top-[-31.7px] w-[126.355px]"
              style={{
                maskImage: `url("${img7065Ad255859Bec235Ddd1E9296F20E21}")`,
              }}
              data-name="7065ad255859bec235ddd1e9296f20e2 1"
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={toImgSrc(img7065Ad255859Bec235Ddd1E9296F20E22)}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute h-[22.08px] left-px top-[34px] w-[45.238px]"
          data-name="7065ad255859bec235ddd1e9296f20e2 2"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[895.12%] left-[-0.4%] max-w-none top-[-314.63%] w-[291.27%]"
              src={toImgSrc(img7065Ad255859Bec235Ddd1E9296F20E23)}
            />
          </div>
        </div>
      </div>
      {isVariant2 && (
        <>
          <div
            className="absolute h-[113px] left-[-7px] top-[4px] w-[126.354px]"
            data-name="Union"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="113"
              preserveAspectRatio="none"
              viewBox="0 0 126.354 113"
              width="126.354"
            >
              <path
                d={svgPaths.p31322300}
                fill="#151838"
                id="Union"
                opacity="0.7"
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

export default function Nature1() {
  return <Nature className="relative size-full" />
}
