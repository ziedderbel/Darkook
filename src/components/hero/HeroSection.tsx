"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Moon02Icon,
  GlobalIcon,
  FavouriteIcon,
  UserIcon,
  Calendar03Icon,
  Clock01Icon,
  CreditCardIcon,
  CustomerSupportIcon,
  Search01Icon,
  House01Icon,
  Location01Icon,
  UserGroupIcon,
  ArrowDown01Icon,
} from "@hugeicons-pro/core-stroke-rounded";
import svgPaths from "../../imports/LandingPage/svg-p2y91de9gv"
import img81831 from "../../imports/LandingPage/a1a57c413ca15b66ba58417dbf49d2caeaafb62f.png"

function toImgSrc(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null) {
    if (typeof val.src === "string") return val.src;
    if (typeof val.default === "string") return val.default;
    if (typeof val.default === "object" && val.default !== null && typeof (val.default as any).src === "string") {
      return (val.default as any).src;
    }
  }
  return String(val);
}



// ─── Logo ────────────────────────────────────────────────────────────────────

function Group79() {
  return (
    <div className="col-1 h-[44.574px] ml-0 mt-0 relative row-1 w-[224px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="44.5742"
        preserveAspectRatio="none"
        viewBox="0 0 224 44.5742"
        width="224"
      >
        <g id="Group 2087325898">
          <path d={svgPaths.p2bca0c0} fill="#547FEE" id="Union" />
          <g id="Darbook">
            <path d={svgPaths.p3d515900} fill="white" />
            <path d={svgPaths.p1e1c2e00} fill="white" />
            <path d={svgPaths.p3dbae00} fill="white" />
            <path d={svgPaths.p1c8f0b80} fill="white" />
            <path d={svgPaths.p2f5e4000} fill="white" />
            <path d={svgPaths.p25a54cf0} fill="white" />
            <path d={svgPaths.p8920900} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  )
}

function Logo() {
  return (
    <a
      href="/"
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
    >
      <Group79 />
    </a>
  )
}

// ─── Navbar actions ───────────────────────────────────────────────────────────

function DarkModeToggle() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <button
        aria-label="Toggle dark mode"
        className="bg-white h-full overflow-clip relative rounded-[40px] shrink-0 w-[48px] cursor-pointer border-none p-0 flex items-center justify-center"
      >
        <HugeiconsIcon icon={Moon02Icon} size={20} className="text-[#556080]" />
      </button>
    </div>
  )
}

function LanguageSelector() {
  return (
    <button
      aria-label="Select language"
      className="bg-white content-stretch flex gap-[16px] items-center overflow-clip px-[14px] py-[12px] relative rounded-[40px] shrink-0 cursor-pointer border-none"
    >
      <div className="relative shrink-0 size-[24px]" data-name="globe-02">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="24"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
          width="24"
        >
          <g id="globe-02">
            <path
              d={svgPaths.pace200}
              id="Vector"
              stroke="#556080"
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
            <path
              d={svgPaths.p3abb500}
              id="Vector_2"
              stroke="#556080"
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
            <path
              d="M21 15H3"
              id="Vector_3"
              stroke="#556080"
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
            <path
              d="M21 9H3"
              id="Vector_4"
              stroke="#556080"
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </g>
        </svg>
      </div>
      <div className="h-[4px] relative shrink-0 w-[8px]" data-name="arrow_down">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="4"
          preserveAspectRatio="none"
          viewBox="0 0 8 4"
          width="8"
        >
          <path d="M0 0L4 4L8 0H0Z" fill="#344054" id="Vector" />
        </svg>
      </div>
    </button>
  )
}

function FavoritesButton() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <button
        aria-label="Favorites"
        className="bg-white h-full overflow-clip relative rounded-[40px] shrink-0 w-[48px] cursor-pointer border-none p-0"
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-[calc(50%-0.29px)]"
          data-name="favourite"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="20"
            preserveAspectRatio="none"
            viewBox="0 0 20 20"
            width="20"
          >
            <g id="favourite">
              <path d={svgPaths.p2ba63470} fill="#556080" id="Vector" />
            </g>
          </svg>
        </div>
      </button>
    </div>
  )
}

function ListPropertyButton() {
  return (
    <button
      className="bg-[#547fee] content-stretch flex h-[48px] items-center justify-center overflow-clip p-[16px] relative rounded-[40px] shrink-0 w-[164px] cursor-pointer border-none"
      data-name="Button"
    >
      <div className="absolute content-stretch flex flex-col items-start left-0 top-[-0.29px] w-[164px]">
        <div
          className="bg-white h-[48px] opacity-0 relative rounded-[40px] shrink-0 w-full"
          data-name="Background"
        />
      </div>
      <div
        className="content-stretch flex h-[24px] items-center justify-center relative shrink-0 w-[148px]"
        data-name="Container"
      >
        <div
          className="content-stretch flex flex-col items-center overflow-clip relative shrink-0"
          data-name="Container"
        >
          <div className="[word-break:break-word] flex flex-col font-['Inter_Tight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
            <p className="leading-[24px]">List your property</p>
          </div>
        </div>
      </div>
    </button>
  )
}

function SignInButton() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <button className="bg-white h-full relative rounded-[40px] shrink-0 cursor-pointer border-none">
        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-center p-[10px] relative size-full">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
              <div
                className="relative shrink-0 size-[24px]"
                data-name="user-circle"
              >
                <svg
                  className="absolute block inset-0 size-full"
                  fill="none"
                  height="24"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <g id="user-circle">
                    <path
                      clipRule="evenodd"
                      d={svgPaths.p3e184700}
                      fill="#547FEE"
                      fillRule="evenodd"
                      id="Vector"
                    />
                  </g>
                </svg>
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Inter_Tight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#344054] text-[16px] whitespace-nowrap">
                <p className="leading-[24px]">Sign In</p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

function NotificationBadge() {
  return (
    <div className="absolute bg-[#547fee] left-[180px] overflow-clip rounded-[26px] size-[18px] top-[-7.29px]">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Figtree:Regular',sans-serif] font-normal h-[10px] justify-center leading-[0] left-[calc(50%-3px)] text-[12px] text-white top-[calc(50%-0.29px)] w-[7px]">
        <p className="leading-[normal]">2</p>
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="-translate-x-1/2 absolute content-stretch flex items-center justify-between left-1/2 top-[30px] w-[1280px] max-w-[calc(100%-48px)]">
      <Logo />
      <div className="content-stretch flex gap-[24px] h-[44px] items-center relative shrink-0">
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
          <DarkModeToggle />
          <LanguageSelector />
          <FavoritesButton />
          <ListPropertyButton />
          <SignInButton />
        </div>
        <NotificationBadge />
      </div>
    </nav>
  )
}

// ─── Hero text ────────────────────────────────────────────────────────────────

function HeroFeatures() {
  return (
    <div className="content-stretch flex gap-[57px] items-center justify-center relative shrink-0 w-[982px]">
      {/* Flexible booking */}
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        <div className="relative shrink-0 size-[28px]" data-name="calendar-03">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="28"
            preserveAspectRatio="none"
            viewBox="0 0 28 28"
            width="28"
          >
            <g id="calendar-03">
              <path
                d={svgPaths.p316c2d00}
                fill="white"
                id="Vector"
                opacity="0.4"
              />
              <path
                d={svgPaths.p262b6b80}
                id="Vector_2"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.33333"
              />
              <path
                d={svgPaths.p173c12c0}
                id="Vector_3"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
              <path
                d={svgPaths.p3de72a80}
                id="Vector_4"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
              <path
                d="M3.5 11.6667H24.5"
                id="Vector_5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
            </g>
          </svg>
        </div>
        <p className="[word-break:break-word] font-['Inter_Tight:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
          Flexible booking
        </p>
      </div>
      {/* Real time offers */}
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        <div
          className="relative shrink-0 size-[30px]"
          data-name="time-quarter-02"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="30"
            preserveAspectRatio="none"
            viewBox="0 0 30 30"
            width="30"
          >
            <g id="time-quarter-02">
              <path
                d={svgPaths.p10ada780}
                fill="white"
                id="Vector"
                opacity="0.4"
              />
              <path
                d="M20 15H15V7.5"
                id="Vector_2"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p2169c518}
                id="Vector_3"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p19def00}
                id="Vector_4"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
            </g>
          </svg>
        </div>
        <p className="[word-break:break-word] font-['Inter_Tight:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
          Real time offers
        </p>
      </div>
      {/* Secure payments */}
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        <div
          className="relative shrink-0 size-[30px]"
          data-name="credit-card-validation"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="30"
            preserveAspectRatio="none"
            viewBox="0 0 30 30"
            width="30"
          >
            <g id="credit-card-validation">
              <path
                d={svgPaths.p342a6b00}
                fill="white"
                id="Vector"
                opacity="0.4"
              />
              <path
                d={svgPaths.p21a7f780}
                id="Vector_2"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p21985400}
                id="Vector_3"
                stroke="white"
                strokeLinecap="round"
                strokeWidth="1.875"
              />
              <path d={svgPaths.p15847600} fill="white" id="Vector_4" />
              <path
                d="M12.5 22.5H14.375"
                id="Vector_5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.875"
              />
              <path
                d="M18.125 22.5H22.5"
                id="Vector_6"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.875"
              />
              <path
                d="M3.125 13.75H12.5"
                id="Vector_7"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
            </g>
          </svg>
        </div>
        <p className="[word-break:break-word] font-['Inter_Tight:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
          Secure payments
        </p>
      </div>
      {/* Support 24/7 */}
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        <div
          className="relative shrink-0 size-[30px]"
          data-name="customer-support"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="30"
            preserveAspectRatio="none"
            viewBox="0 0 30 30"
            width="30"
          >
            <g id="customer-support">
              <path
                d={svgPaths.p34496100}
                fill="white"
                id="Vector"
                opacity="0.4"
              />
              <path
                d={svgPaths.pdb48600}
                fill="white"
                id="Vector_2"
                opacity="0.4"
              />
              <path
                d={svgPaths.p34496100}
                id="Vector_3"
                stroke="white"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.pdb48600}
                id="Vector_4"
                stroke="white"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p14030100}
                id="Vector_5"
                stroke="white"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
              <path
                d={svgPaths.p12769b00}
                id="Vector_6"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.875"
              />
            </g>
          </svg>
        </div>
        <p className="[word-break:break-word] font-['Inter_Tight:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
          Support 24/7
        </p>
      </div>
    </div>
  )
}

function HeroText() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Inter_Tight',sans-serif] text-[18px] text-center text-white/90">
        Apartments, gites, guest houses - 200 options for trips in Tunisia
      </p>
      <h1 className="font-['Bricolage_Grotesk',sans-serif] font-extrabold text-[44px] sm:text-[56px] leading-[1.15] tracking-tight text-center text-white max-w-4xl mx-auto">
        An easy way to find an unforgettable journey
      </h1>
      <HeroFeatures />
    </div>
  )
}

// ─── Search tabs ──────────────────────────────────────────────────────────────

function SearchTabs() {
  return (
    <div className="backdrop-blur-[1.5px] bg-[rgba(255,255,255,0.43)] content-stretch flex flex-col h-[58px] items-center mb-[-0.3px] pt-[6px] px-[6px] relative rounded-tl-[22px] rounded-tr-[22px] shrink-0">
      <div className="content-stretch flex items-center relative shrink-0 w-full">
        {/* Experience tab (active) */}
        <button className="bg-white h-[48px] mr-[-1px] overflow-clip relative rounded-bl-[16px] rounded-tl-[16px] shrink-0 w-[150px] cursor-pointer border-none p-0">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#547fee] h-[40px] left-[calc(50%+0.5px)] overflow-clip rounded-[12px] top-1/2 w-[143px]">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center left-[calc(50%+0.5px)] top-[calc(50%-0.5px)] w-[81px]">
              <div className="[word-break:break-word] flex flex-col font-['Inter_Tight:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                <p className="leading-[24px]">Experience</p>
              </div>
            </div>
          </div>
        </button>
        {/* Location tab */}
        <button className="bg-white h-[48px] overflow-clip relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-[150px] cursor-pointer border-none p-0">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center left-1/2 top-1/2">
            <div className="[word-break:break-word] flex flex-col font-['Inter_Tight:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#475467] text-[16px] whitespace-nowrap">
              <p className="leading-[24px]">Location</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

// ─── Search bar ───────────────────────────────────────────────────────────────

function ExperienceField() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative rounded-bl-[10px] rounded-tl-[10px]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[16px] relative size-full">
          <div
            className="relative shrink-0 size-[24px]"
            data-name="house(10) 2"
          >
            <svg
              className="absolute block inset-0 size-full"
              fill="none"
              height="24"
              preserveAspectRatio="none"
              viewBox="0 0 24 24"
              width="24"
            >
              <g clipPath="url(#clip0_hero_house)">
                <path d={svgPaths.p9dac00} fill="#547FEE" id="Vector" />
                <path d={svgPaths.p3b341b00} fill="#547FEE" id="Vector_2" />
                <path d={svgPaths.p34ada300} fill="#547FEE" id="Vector_3" />
              </g>
              <defs>
                <clipPath id="clip0_hero_house">
                  <rect fill="white" height="24" width="24" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            className="flex-[1_0_0] grid-rows-[max-content] inline-grid leading-[0] min-w-px place-items-start relative"
            data-name="город"
          >
            <div className="bg-white border-[#dbdeea] border-r border-solid col-1 h-[66px] ml-0 mt-0 relative row-1 w-full" />
            <div
              className="col-1 h-[6px] ml-[93.59%] mt-[30px] relative row-1 w-[2.2%] pointer-events-none"
              data-name="arrow_down"
            >
              <svg
                className="absolute block inset-0 size-full"
                fill="none"
                height="6"
                preserveAspectRatio="none"
                viewBox="0 0 10.4489 6"
                width="10.4489"
              >
                <path
                  d="M0 0L5.22445 6L10.4489 0H0Z"
                  fill="#262B2F"
                  id="Vector"
                />
              </svg>
            </div>
            <div className="col-1 content-stretch flex items-center ml-[2.4%] mt-[11px] relative row-1 w-[89.1%] pointer-events-none">
              <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 text-[16px]">
                <p className="font-['Inter_Tight:Regular',sans-serif] text-[#536774] whitespace-nowrap leading-[24px]">
                  What experience are you looking for?
                </p>
              </div>
            </div>
            <select
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label="Choose experience"
              defaultValue=""
            >
              <option value="" disabled>
                Choose experience
              </option>
              <option value="seaside">Seaside</option>
              <option value="pool">Swimming pool</option>
              <option value="urban">Urban stays</option>
              <option value="nature">Nature</option>
              <option value="sahara">Sahara</option>
              <option value="cultural">Cultural</option>
              <option value="family">Family</option>
              <option value="romantics">Romantics</option>
              <option value="historical">Historical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

function DateField({
  label,
  defaultDate,
  rounded,
}: {
  label: "Check in" | "Check out"
  defaultDate: string
  rounded: "left" | "right"
}) {
  const isLeft = rounded === "left"
  return (
    <div
      className={`grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0`}
      data-name={isLeft ? "календарь 1" : "календарь 1.1"}
    >
      <div
        className={`bg-white ${
          isLeft
            ? "border-[#dbdeea] border-r border-solid"
            : "border-0 border-[#dbdeea] border-solid"
        } col-1 h-[66px] ml-0 mt-0 relative row-1 w-[265.5px]`}
      />
      <div className="col-1 content-stretch flex gap-[8px] items-center ml-[23.49px] mt-[11px] relative row-1">
        <div className="relative shrink-0 size-[24px]">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="24"
            preserveAspectRatio="none"
            viewBox="0 0 24 24"
            width="24"
          >
            <g id={isLeft ? "calendar-check-in-01" : "calendar-check-out-01"}>
              <path
                d="M16 2V6M8 2V6"
                stroke="#547FEE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d={isLeft ? svgPaths.p4612d98 : svgPaths.pbc02900}
                stroke="#547FEE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M3 10H21"
                stroke="#547FEE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d={isLeft ? svgPaths.p130de00 : svgPaths.p15703900}
                stroke="#547FEE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 text-[16px] w-[153.492px]">
          <label className="flex flex-col font-['Inter_Tight:Regular',sans-serif] h-[21px] justify-center relative shrink-0 text-[#536774] w-full leading-[24px] cursor-pointer">
            {label}
            <input
              type="date"
              defaultValue={defaultDate}
              aria-label={label}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
          <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] h-[21px] justify-center relative shrink-0 text-[#0a2a3f] w-full leading-[24px] pointer-events-none">
            <p>03/21/2019</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function GuestField() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="отель"
    >
      <div className="border-[#dbdeea] border-l border-solid col-1 h-[66px] ml-0 mt-0 relative row-1 w-[178px]" />
      <div className="col-1 content-stretch flex gap-[8px] items-center ml-[22.35px] mt-[12px] relative row-1 w-[108.896px]">
        <div
          className="relative shrink-0 size-[24px]"
          data-name="user-multiple-02"
        >
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="24"
            preserveAspectRatio="none"
            viewBox="0 0 24 24"
            width="24"
          >
            <g id="user-multiple-02">
              <path d={svgPaths.p1b086200} stroke="#547FEE" strokeWidth="1.5" />
              <path
                d={svgPaths.p31f59260}
                stroke="#547FEE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d={svgPaths.p3de78080}
                stroke="#547FEE"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d={svgPaths.p20595d80}
                stroke="#547FEE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[0] not-italic relative shrink-0 text-[16px] w-[86.684px]">
          <label className="flex flex-col font-['Inter_Tight:Regular',sans-serif] h-[21px] justify-center relative shrink-0 text-[#536774] w-full leading-[24px] cursor-pointer">
            Guest
          </label>
          <select
            aria-label="Number of guests"
            defaultValue="2"
            className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] h-[19px] justify-center relative shrink-0 text-[#1b1d22] w-full leading-[24px] appearance-none bg-transparent border-none outline-none cursor-pointer p-0 text-[16px]"
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
            <option value="5">5+ guests</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function SearchButton() {
  return (
    <button
      aria-label="Search"
      className="relative rounded-[20px] shrink-0 size-[56px] cursor-pointer border-none p-0 bg-transparent"
      data-name="button-search"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="56"
        preserveAspectRatio="none"
        viewBox="0 0 56 56"
        width="56"
      >
        <path d={svgPaths.pdf1ff70} fill="#547FEE" id="button-search" />
      </svg>
      <div className="absolute inset-1/4" data-name="Group">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="28"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
          width="28"
        >
          <g id="Group">
            <path d={svgPaths.p16de8900} fill="white" id="Vector" />
          </g>
        </svg>
      </div>
    </button>
  )
}

function SearchBar() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.44)] relative rounded-bl-[22px] rounded-br-[22px] rounded-tr-[22px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center pb-[6px] pt-[4px] px-[6px] relative size-full">
          <div className="bg-white relative rounded-[16px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[6px] relative size-full">
                <ExperienceField />
                <div className="content-stretch flex h-[66px] items-center leading-[0] relative rounded-[50px] shrink-0 w-[531px]">
                  <DateField
                    label="Check in"
                    defaultDate="2019-03-21"
                    rounded="left"
                  />
                  <DateField
                    label="Check out"
                    defaultDate="2019-03-21"
                    rounded="right"
                  />
                </div>
                <GuestField />
                <SearchButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Service type buttons (Transfer / Hotel) ──────────────────────────────────

function TransferButton() {
  return (
    <button
      className="absolute backdrop-blur-[2px] bg-[rgba(255,255,255,0.15)] content-stretch flex gap-[8px] h-[48px] items-center justify-center left-[457.5px] px-[24px] py-[16px] rounded-[16px] top-[1.5px] w-[128px] cursor-pointer border-none"
      data-name="Button/Navbar"
    >
      <div className="relative shrink-0 size-[24px]" data-name="taxi">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="24"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
          width="24"
        >
          <g id="taxi">
            <path
              clipRule="evenodd"
              d={svgPaths.p26cea200}
              fill="#F2F4F7"
              fillRule="evenodd"
              opacity="0.4"
            />
            <path
              d={svgPaths.pdd8e570}
              stroke="#F2F4F7"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M2.5 13L4.5 14"
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M21.5 13.5L19.5 14"
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={svgPaths.p1ddea2e0}
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={svgPaths.p131d1880}
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={svgPaths.p6912600}
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M20 9.5L21 9"
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M4 9.5L3 9"
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path d={svgPaths.p25944b00} fill="#F2F4F7" opacity="0.4" />
            <path
              d={svgPaths.p2ad06d00}
              stroke="#F2F4F7"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={svgPaths.peed6e00}
              stroke="#F2F4F7"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter_Tight:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        Transfer
      </p>
    </button>
  )
}

function HotelButton() {
  return (
    <button
      className="absolute backdrop-blur-[2px] bg-[rgba(255,255,255,0.15)] content-stretch flex gap-[8px] h-[48px] items-center justify-center left-[320.5px] px-[24px] py-[16px] rounded-[16px] top-[1.5px] w-[128px] cursor-pointer border-none"
      data-name="Button/Navbar"
    >
      <div className="relative shrink-0 size-[24px]" data-name="building-05">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="24"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
          width="24"
        >
          <g id="building-05">
            <path d={svgPaths.p224f0800} fill="#F2F4F7" opacity="0.4" />
            <path
              d="M2.00018 22H22.0002"
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={svgPaths.p2f28c200}
              stroke="#F2F4F7"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={svgPaths.p95fd980}
              stroke="#F2F4F7"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M3 6H6M3 10H6M3 14H6"
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={svgPaths.pfc49240}
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M16.0002 22V19"
              stroke="#F2F4F7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter_Tight:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        Hotel
      </p>
    </button>
  )
}

// ─── Frequent searches ────────────────────────────────────────────────────────

function FrequentSearches() {
  const cities = [
    { name: "Nabeul", width: 49 },
    { name: "Sousse", width: 51 },
    { name: "Djerba", width: 45 },
    { name: "Ain drahem", width: 79 },
  ]
  return (
    <div className="content-stretch flex gap-[24px] items-center pl-[29px] relative shrink-0">
      <p className="[word-break:break-word] flex flex-col font-['Inter_Tight:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap leading-[24px]">
        Frequently search
      </p>
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        {cities.map((city) => (
          <button
            key={city.name}
            className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 bg-transparent border-none cursor-pointer p-0"
          >
            <span className="[word-break:break-word] flex flex-col font-['Inter_Tight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap leading-[24px] h-[18px]">
              {city.name}
            </span>
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg
                  className="block size-full"
                  fill="none"
                  height="1"
                  preserveAspectRatio="none"
                  viewBox={`0 0 ${city.width} 1`}
                  width={city.width}
                >
                  <line
                    stroke="white"
                    strokeDasharray="2 2"
                    strokeOpacity="0.6"
                    x2={city.width}
                    y1="0.5"
                    y2="0.5"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Hero section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      className="h-[620px] overflow-clip relative shrink-0 w-full"
      style={{
        backgroundImage:
          "linear-gradient(159.15939287969525deg, rgb(1, 1, 23) 2.4142%, rgb(70, 94, 156) 100.24%), linear-gradient(90deg, rgb(24, 23, 67) 0%, rgb(24, 23, 67) 100%)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute h-[1279px] left-0 top-[-419px] w-[1920px]"
        data-name="8183 1"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none mix-blend-soft-light object-cover pointer-events-none size-full"
          src={toImgSrc(img81831)}
        />
      </div>
      <div
        className="absolute h-[1334px] left-[-13px] top-[-591px] w-[2000px]"
        data-name="9334 1"
      />
      <div
        className="absolute bottom-0 h-[580px] left-0 w-[1920px]"
        data-name="bg4 1"
      />
      <div
        className="absolute h-[1333px] left-[-64px] top-[-420px] w-[2000px]"
        data-name="1390 1"
      />

      {/* Navbar */}
      <Navbar />

      {/* Bottom curve */}
      <div className="absolute bg-[#f5f7fa] bottom-0 h-[32px] left-[-2px] rounded-tl-[32px] rounded-tr-[32px] w-[1923px]" />

      {/* Hero content */}
      <div className="-translate-x-1/2 absolute flex flex-col gap-5 md:gap-6 items-center left-1/2 top-[115px] md:top-[125px] w-full max-w-[1280px] px-4 z-10">
        <HeroText />
        <div className="flex flex-col gap-2 items-center relative shrink-0 w-full">
          {/* Search widget */}
          <div className="flex flex-col items-center relative shrink-0 w-full max-w-[1240px]">
            <SearchTabs />
            <SearchBar />
            <TransferButton />
            <HotelButton />
          </div>
          <FrequentSearches />
        </div>
      </div>
    </section>
  )
}
