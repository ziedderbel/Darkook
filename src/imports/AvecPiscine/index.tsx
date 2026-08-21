import svgPaths from "./svg-xmu45amrqo"
import img95B82Cfb5A61Bd669C46773F4547B5942 from "./8de0f4922997b4d2b246fb06b94dbe9f784bc9c2.png"
import imgModernLuxuryVillaWithPool1 from "./2e243250df73f8665c2076148b1ef31fae40d3e8.png"
import { img95B82Cfb5A61Bd669C46773F4547B5941 } from "./svg-0eg3o"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "src" in val) return (val as any).src;
  return String(val);
}

type AvecPiscineProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function AvecPiscine({ className, property1 = "Default" }: AvecPiscineProps) {
  const isVariant2 = property1 === "Variant2"
  return (
    <div className={className || "relative size-[120px]"}>
      <div className="absolute contents left-[1.55px] top-[4px]">
        <div className="absolute contents left-[6.68px] top-[4px]">
          <div className="absolute contents left-[6.68px] top-[4px]">
            <div
              className="absolute contents left-[6.68px] top-[4px]"
              data-name="Mask group"
            >
              <div
                className="absolute h-[181.443px] left-[4.61px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2.062px_60.074px] mask-size-[112.75px_112.75px] top-[-56.07px] w-[120.962px]"
                style={{
                  maskImage: `url("${img95B82Cfb5A61Bd669C46773F4547B5941}")`,
                }}
                data-name="95b82cfb5a61bd669c46773f4547b594 1"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    alt=""
                    className="absolute h-[72.05%] left-[-4.04%] max-w-none top-[23.48%] w-[108.08%]"
                    src={toImgSrc(img95B82Cfb5A61Bd669C46773F4547B5942)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute h-[64.575px] left-[1.55px] top-[4px] w-[114.8px]"
          data-name="modern-luxury-villa-with-pool 1"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[218.71%] left-[-9.98%] max-w-none top-[-36.19%] w-[123.03%]"
              src={toImgSrc(imgModernLuxuryVillaWithPool1)}
            />
          </div>
        </div>
      </div>
      {isVariant2 && (
        <>
          <div
            className="absolute h-[114.909px] left-px top-[3px] w-[117.96px]"
            data-name="Union"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="114.909"
              preserveAspectRatio="none"
              viewBox="0 0 117.96 114.909"
              width="117.96"
            >
              <path
                d={svgPaths.p218d6c00}
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

export default function AvecPiscine1() {
  return <AvecPiscine className="relative size-full" />
}
