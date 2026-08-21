import svgPaths from "./svg-yn7fvuuuoq"
import imgE79B964Fda09Dd9F0Dfa0Afd4B6Cd8332 from "./2c7c83271ffdffefeaab85bb4a0cdb7dc06bbd4e.png"
import imgE79B964Fda09Dd9F0Dfa0Afd4B6Cd8333 from "./dceef9d6637e5f974f556ab932076390d5e5aed8.png"
import { imgE79B964Fda09Dd9F0Dfa0Afd4B6Cd8331 } from "./svg-qx8gb"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "src" in val) return (val as any).src;
  return String(val);
}

type FamilleProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function Famille({ className, property1 = "Default" }: FamilleProps) {
  const isVariant2 = property1 === "Variant2"
  return (
    <div className={className || "relative size-[120px]"}>
      <div className="absolute contents left-[3.19px] top-px">
        <div
          className="absolute contents left-[3.19px] top-[6.67px]"
          data-name="Mask group"
        >
          <div
            className="absolute h-[151.823px] left-[3.19px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_24.828px] mask-size-[112.856px_112.856px] top-[-18.16px] w-[123.657px]"
            style={{
              maskImage: `url("${imgE79B964Fda09Dd9F0Dfa0Afd4B6Cd8331}")`,
            }}
            data-name="e79b964fda09dd9f0dfa0afd4b6cd833 1"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full"
              src={toImgSrc(imgE79B964Fda09Dd9F0Dfa0Afd4B6Cd8332)}
            />
          </div>
        </div>
        <div
          className="absolute h-[82.742px] left-[18.42px] top-px w-[93.085px]"
          data-name="e79b964fda09dd9f0dfa0afd4b6cd833 2"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full"
            src={toImgSrc(imgE79B964Fda09Dd9F0Dfa0Afd4B6Cd8333)}
          />
        </div>
      </div>
      {isVariant2 && (
        <>
          <div
            className="absolute h-[117.5px] left-[3px] top-[2px] w-[112.882px]"
            data-name="Union"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="117.5"
              preserveAspectRatio="none"
              viewBox="0 0 112.882 117.5"
              width="112.882"
            >
              <path
                d={svgPaths.p1b0b0260}
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

export default function Famille1() {
  return <Famille className="relative size-full" />
}
