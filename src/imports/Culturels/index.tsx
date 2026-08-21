import svgPaths from "./svg-v1x83fgcpb"
import imgE5Cc15Aa13Be5198Fe60E92987E4A9F73 from "./dd7fbcb927b7dbf8635273e581719fe469839af3.png"
import imgE5Cc15Aa13Be5198Fe60E92987E4A9F74 from "./d37ef9108bd357698070ca9b45a58792c7b31f67.png"
import { imgE5Cc15Aa13Be5198Fe60E92987E4A9F72 } from "./svg-quj9u"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "src" in val) return (val as any).src;
  return String(val);
}

type CulturelsProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function Culturels({ className, property1 = "Default" }: CulturelsProps) {
  const isVariant2 = property1 === "Variant2"
  return (
    <div className={className || "relative size-[120px]"}>
      <div className="absolute contents left-[4px] top-0">
        <div
          className="absolute contents left-[4px] top-[7.09px]"
          data-name="Mask group"
        >
          <div
            className="absolute left-[-2.77px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[6.77px_21.437px] mask-size-[112.823px_112.822px] size-[138.772px] top-[-14.35px]"
            style={{
              maskImage: `url("${imgE5Cc15Aa13Be5198Fe60E92987E4A9F72}")`,
            }}
            data-name="e5cc15aa13be5198fe60e92987e4a9f7 2"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full"
              src={toImgSrc(imgE5Cc15Aa13Be5198Fe60E92987E4A9F73)}
            />
          </div>
        </div>
        <div
          className="absolute h-[80.002px] left-[49.13px] top-0 w-[63.591px]"
          data-name="e5cc15aa13be5198fe60e92987e4a9f7 3"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-bottom pointer-events-none size-full"
            src={toImgSrc(imgE5Cc15Aa13Be5198Fe60E92987E4A9F74)}
          />
        </div>
        <div className="absolute h-[4.517px] left-[58.2px] top-[22.02px] w-[3.388px]">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="4.51667"
            preserveAspectRatio="none"
            viewBox="0 0 3.3875 4.51667"
            width="3.3875"
          >
            <path d={svgPaths.p198afe00} fill="#E7E2DE" id="Vector 142" />
          </svg>
        </div>
      </div>
      {isVariant2 && (
        <>
          <div
            className="absolute h-[122px] left-[2.65px] top-0 w-[114.701px]"
            data-name="Union"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="122"
              preserveAspectRatio="none"
              viewBox="0 0 114.701 122"
              width="114.701"
            >
              <path
                d={svgPaths.p42d7500}
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

export default function Culturels1() {
  return <Culturels className="relative size-full" />
}
