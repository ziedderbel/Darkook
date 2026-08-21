import svgPaths from "./svg-k165bvfgka"
import imgRusticPatioFurnitureHouseDeckWithVegetation2 from "./fabb010c874f57c47211afac0d2c3c2209cc0840.png"
import imgRusticPatioFurnitureHouseDeckWithVegetation3 from "./fc84be9e959f9048fba6eb99e02f72d123a4626c.png"
import { imgRusticPatioFurnitureHouseDeckWithVegetation1 } from "./svg-9mpl5"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "src" in val) return (val as any).src;
  return String(val);
}

type RomantiquesProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function Romantiques({ className, property1 = "Default" }: RomantiquesProps) {
  const isVariant2 = property1 === "Variant2"
  return (
    <div className={className || "relative size-[120px]"}>
      <div className="absolute contents left-[3.5px] top-[4px]">
        <div
          className="absolute contents left-[3.5px] top-[4px]"
          data-name="Mask group"
        >
          <div
            className="absolute h-[180.532px] left-[3.5px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_10.272px] mask-size-[113px_113px] top-[-6.27px] w-[120.369px]"
            style={{
              maskImage: `url("${imgRusticPatioFurnitureHouseDeckWithVegetation1}")`,
            }}
            data-name="rustic-patio-furniture-house-deck-with-vegetation 1"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={toImgSrc(imgRusticPatioFurnitureHouseDeckWithVegetation2)}
            />
          </div>
        </div>
        <div
          className="absolute h-[13.355px] left-[62.05px] top-[4px] w-[44.173px]"
          data-name="rustic-patio-furniture-house-deck-with-vegetation 2"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[1452.99%] left-[-134.77%] max-w-none top-[-81.62%] w-[286.74%]"
              src={toImgSrc(imgRusticPatioFurnitureHouseDeckWithVegetation3)}
            />
          </div>
        </div>
      </div>
      {isVariant2 && (
        <>
          <div
            className="absolute left-[3px] size-[113px] top-[4px]"
            data-name="Union"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="113"
              preserveAspectRatio="none"
              viewBox="0 0 113 113"
              width="113"
            >
              <path
                d={svgPaths.p15ed4100}
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

export default function Romantiques1() {
  return <Romantiques className="relative size-full" />
}
