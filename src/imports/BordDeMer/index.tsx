import svgPaths from "./svg-2g17b5wqj0"
import imgBeachfrontBungalowDusk2 from "./f5c8061b896e0ad8b3ac0aa45cedc31ec176b6cd.png"
import imgBeachfrontBungalowDusk3 from "./fcd742ce8a2299c432c288f166fba193cf03250a.png"
import { imgBeachfrontBungalowDusk1 } from "./svg-cvp3e"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "src" in val) return (val as any).src;
  return String(val);
}

type BordDeMerProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function BordDeMer({ className, property1 = "Default" }: BordDeMerProps) {
  if (property1 === "Variant2") {
    return (
      <button
        className={className || "block cursor-pointer relative size-[120px]"}
        data-name="Property 1=Variant2"
      >
        <div className="absolute contents left-0 top-[4px]">
          <div
            className="absolute contents left-0 top-[4px]"
            data-name="Mask group"
          >
            <div className="absolute flex h-[144.57px] items-center justify-center left-[-94.93px] top-[-27.63px] w-[256.467px]">
              <div className="-scale-y-100 flex-none rotate-180">
                <div
                  className="h-[144.57px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[94.93px_31.63px] mask-size-[112.963px_112.963px] relative w-[256.467px]"
                  style={{ maskImage: `url("${imgBeachfrontBungalowDusk1}")` }}
                  data-name="beachfront-bungalow-dusk 1"
                >
                  <img
                    alt=""
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                    src={toImgSrc(imgBeachfrontBungalowDusk2)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[40px] items-center justify-center left-[96px] top-[40px] w-[25px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <div
                className="h-[40px] relative w-[25px]"
                data-name="beachfront-bungalow-dusk 2"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[366.67%] left-[-158.7%] max-w-none top-[-172.73%] w-[1022.16%]"
                    src={toImgSrc(imgBeachfrontBungalowDusk3)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute h-[112.96px] left-0 top-[4px] w-[121px]"
          data-name="Union"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="112.96"
            preserveAspectRatio="none"
            viewBox="0 0 121 112.96"
            width="121"
          >
            <path
              d={svgPaths.p1f5bcf00}
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
      </button>
    )
  }
  return (
    <div
      className={className || "relative size-[120px]"}
      data-name="Property 1=Default"
    >
      <div className="absolute contents left-0 top-[4px]">
        <div
          className="absolute contents left-0 top-[4px]"
          data-name="Mask group"
        >
          <div className="absolute flex h-[144.57px] items-center justify-center left-[-94.93px] top-[-27.63px] w-[256.467px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <div
                className="h-[144.57px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[94.93px_31.63px] mask-size-[112.963px_112.963px] relative w-[256.467px]"
                style={{ maskImage: `url("${imgBeachfrontBungalowDusk1}")` }}
                data-name="beachfront-bungalow-dusk 1"
              >
                <img
                  alt=""
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  src={toImgSrc(imgBeachfrontBungalowDusk2)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[40px] items-center justify-center left-[96px] top-[40px] w-[25px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div
              className="h-[40px] relative w-[25px]"
              data-name="beachfront-bungalow-dusk 2"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt=""
                  className="absolute h-[366.67%] left-[-158.7%] max-w-none top-[-172.73%] w-[1022.16%]"
                  src={toImgSrc(imgBeachfrontBungalowDusk3)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BordDeMer1() {
  return <BordDeMer className="relative size-full" />
}
