import svgPaths from "./svg-pm1k4yg757";
import clsx from "clsx";
type JoinnWebBackgroundImageProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function JoinnWebBackgroundImage({ text, text1, additionalClassNames = "" }: JoinnWebBackgroundImageProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }} className={clsx("absolute font-['Playfair:Medium',sans-serif] font-medium leading-[1.19] text-[0px] text-black text-white", additionalClassNames)}>
      <p className="font-['Poppins:Medium',sans-serif] mb-0 not-italic text-[20px]">{text}</p>
      <p className="font-['Work_Sans:Regular',sans-serif] font-normal text-[15px]">{text1}</p>
    </div>
  );
}

export default function JoinnWeb() {
  return (
    <div className="relative size-full" data-name="Joinn Web" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 12, 59, 0.9) 0%, rgba(0, 12, 59, 0.9) 100%), linear-gradient(121.531deg, rgb(29, 169, 255) 5.2994%, rgb(70, 106, 255) 97.543%)" }}>
      <p className="absolute font-['Playfair_Display:Regular',sans-serif] font-normal h-[81px] leading-none left-[calc(50%-0.5px)] not-italic text-[0px] text-center text-white top-[181px] tracking-[-2px] translate-x-[-50%] w-[749px]">
        <span className="font-['Poppins:Regular',sans-serif] text-[#a0dbff] text-[40px]">{`The Joinn `}</span>
        <span className="font-['Poppins:Bold',sans-serif] text-[#a0dbff] text-[40px]">Stack.</span>
        <span className="font-['Poppins:Regular',sans-serif] text-[40px]">
          <br aria-hidden="true" />{" "}
        </span>
        <span className="font-['Poppins:Regular',sans-serif] text-[32px] tracking-[-1.6px]">How money compounds — end to end.</span>
      </p>
      <div className="absolute font-['Playfair:Medium',sans-serif] font-medium leading-[1.19] left-[140px] text-[0px] text-black text-white top-[754px] w-[253px]" style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}>
        <p className="font-['Poppins:Medium',sans-serif] mb-0 not-italic text-[20px]">{`Joinn Smart Account `}</p>
        <p className="font-['Work_Sans:Regular',sans-serif] font-normal text-[15px]">The foundation where identity, security, and capital converge into one smart account.</p>
      </div>
      <JoinnWebBackgroundImage text="Joinn Pay" text1="A global card that keeps money liquid while yield keeps growing in the background." additionalClassNames="left-[140px] top-[542px] w-[229px]" />
      <div className="absolute font-['Playfair:Medium',sans-serif] font-medium leading-[1.19] left-[140px] text-[0px] text-black top-[376px] w-[237px]" style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}>
        <p className="font-['Poppins:Medium',sans-serif] mb-0 not-italic text-[#ff731d] text-[20px]">{`Joinn Rewards `}</p>
        <p className="font-['Work_Sans:Regular',sans-serif] font-normal text-[15px] text-white">Real-world benefits earned from consistent usage, smarter habits, and compounding behavior.</p>
      </div>
      <JoinnWebBackgroundImage text="AI-Powered Insights" text1="An intelligence layer that guides every decision, allocation, and habit in real time." additionalClassNames="left-[calc(80%-121.6px)] top-[745px] w-[253px]" />
      <JoinnWebBackgroundImage text="Joinn Invest" text1="Tokenized assets and yield strategies working continuously behind every balance." additionalClassNames="left-[calc(80%-121.6px)] top-[446px] w-[253px]" />
      <div className="absolute h-[87px] left-[377px] top-[766px] w-[192px]">
        <div className="absolute inset-[-0.57%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 192 88">
            <path d={svgPaths.p376ea500} id="Vector 2" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[103px] left-[405px] top-[588px] w-[164px]">
        <div className="absolute inset-[-0.49%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 164 104">
            <path d={svgPaths.p32ff4e80} id="Vector 4" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[66px] left-[405px] top-[431px] w-[164px]">
        <div className="absolute inset-[-0.76%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 164 67">
            <path d={svgPaths.p106aae00} id="Vector 6" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[36px] items-center justify-center left-[calc(40%+120.2px)] top-[766px] w-[347px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[36px] relative w-[347px]">
            <div className="absolute inset-[-1.39%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 347 37">
                <path d={svgPaths.p1f409500} id="Vector 3" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[166px] items-center justify-center left-[calc(60%-39.2px)] top-[465px] w-[193px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[166px] relative w-[193px]">
            <div className="absolute inset-[-0.3%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 193 167">
                <path d={svgPaths.p2561de80} id="Vector 5" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[477px] left-[calc(20%+243.6px)] top-[385px] w-[419px]" data-name="BACKGROUND">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 419 477">
          <g clipPath="url(#clip0_1_60)" id="BACKGROUND">
            <path d={svgPaths.p2de2e40} fill="var(--fill-0, #0048AE)" id="raiz" />
            <g id="hojas-derechas">
              <path d={svgPaths.p2c012800} fill="var(--fill-0, #0F62AD)" id="Vector" />
              <path d={svgPaths.p8cef200} fill="var(--fill-0, #0F62AD)" id="Vector_2" />
              <path d={svgPaths.p70518c0} fill="var(--fill-0, #0F62AD)" id="Vector_3" />
              <path d={svgPaths.p1d050000} fill="var(--fill-0, #0F62AD)" id="Vector_4" />
              <path d={svgPaths.p2aa50100} fill="var(--fill-0, #0F62AD)" id="Vector_5" />
            </g>
            <g id="hojas-izquierdas">
              <path d={svgPaths.p24b70180} fill="var(--fill-0, #A0DBFF)" id="Vector_6" />
              <g id="Group">
                <path d={svgPaths.p21399080} fill="var(--fill-0, #A0DBFF)" id="Vector_7" />
                <path d={svgPaths.p2ce44f00} fill="var(--fill-0, #A0DBFF)" id="Vector_8" />
                <path d={svgPaths.pf12c240} fill="var(--fill-0, #A0DBFF)" id="Vector_9" />
                <path d={svgPaths.p1121ddc0} fill="var(--fill-0, #A0DBFF)" id="Vector_10" />
                <path d={svgPaths.p29eb600} fill="var(--fill-0, #A0DBFF)" id="Vector_11" />
                <path d={svgPaths.p2ffe41b0} fill="var(--fill-0, #A0DBFF)" id="Vector_12" />
                <path d={svgPaths.p22f1a200} fill="var(--fill-0, #A0DBFF)" id="Vector_13" />
              </g>
            </g>
            <g id="frutos">
              <path d={svgPaths.p1a79fd80} fill="var(--fill-0, #FF731D)" id="Vector_14" />
              <path d={svgPaths.p10a24700} fill="var(--fill-0, #FF731D)" id="Vector_15" />
              <path d={svgPaths.p4ce5200} fill="var(--fill-0, #FF731D)" id="Vector_16" />
              <path d={svgPaths.p2d6e6f00} fill="var(--fill-0, #FF731D)" id="Vector_17" />
              <path d={svgPaths.p62d4100} fill="var(--fill-0, #FF731D)" id="Vector_18" />
              <path d={svgPaths.p22ab2600} fill="var(--fill-0, #FF731D)" id="Vector_19" />
            </g>
            <path d={svgPaths.p23d3d500} fill="var(--fill-0, #1A7EC8)" id="tronco" />
          </g>
          <defs>
            <clipPath id="clip0_1_60">
              <rect fill="white" height="477" width="419" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}