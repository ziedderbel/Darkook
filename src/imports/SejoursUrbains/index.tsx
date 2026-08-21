import svgPaths from "./svg-5z3kdf5tz5"
import imgEllipse95 from "./7c80eedfec5ff774867349d16ea65fe45694358f.png"
import img21 from "./80e9e0f9e43ae59057ac411c3d5e6af4b1feb260.png"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "src" in val) return (val as any).src;
  return String(val);
}

type SejoursUrbainsProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function SejoursUrbains({
  className,
  property1 = "Default",
}: SejoursUrbainsProps) {
  const isVariant2 = property1 === "Variant2"
  return (
    <div className={className || "relative size-[120px]"}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-1/2 top-1/2">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[120px] top-1/2">
          <div className="absolute contents left-[3px] top-px">
            <div className="absolute flex items-center justify-center left-[3px] size-[113.974px] top-[6.73px]">
              <div className="flex-none rotate-[0.5deg]">
                <div className="relative size-[113px]">
                  <img
                    alt=""
                    className="absolute block inset-0 max-w-none size-full"
                    height="113"
                    src={toImgSrc(imgEllipse95)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isVariant2 && (
        <>
          <div
            className="absolute h-[122.291px] left-[3px] top-[-1px] w-[114px]"
            data-name="Union"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="122.291"
              preserveAspectRatio="none"
              viewBox="0 0 114 122.291"
              width="114"
            >
              <path
                d={svgPaths.p15f76400}
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

export default function SejoursUrbains1() {
  return <SejoursUrbains className="relative size-full" />
}
