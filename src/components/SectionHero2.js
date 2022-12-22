import React, {useState} from 'react';

import ButtonPrimary from '../shared/Button/ButtonPrimary';
import Next from '../shared/NextPrev/Next';
import Prev from '../shared/NextPrev/Prev';
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";




const DATA = [
        {
        image: "http://www.foodsafetykorea.go.kr/uploadimg/20190408/20190408010349_1554696229438.jpg",
        heading:  "COOKCREW",
        subHeading: "레시피검색과 식단관리를 한번에,🔥",
        btnText: "",
        btnLink: "",
      },
        {
        image: "http://www.foodsafetykorea.go.kr/uploadimg/20190408/20190408111442_1554689682742.jpg",
        heading: "다이어트 식단 🔥",
        subHeading: "건강한 식단을 만들고 체크하세요",
        btnText: "식단 만들러가기",
        btnLink: "/",
      },
      {
        image: "http://www.foodsafetykorea.go.kr/uploadimg/20190408/20190408112127_1554690087850.jpg",
        heading: "가장 인기있는 다이어트 레시피",
        subHeading: "많은 사람들이 맘에 들어한 레시피🔥",
        btnText: "더 보러가기",
        btnLink: "/",
      },
      
];

let TIME_OUT = null;

const SectionHero2 = () => {
    const [indexActive, setIndexActive] = useState(0);
    const [isRunning, toggleIsRunning] = useBoolean(true);

    useInterval(
        ()=> {
            handleAutoNext();
        },
        isRunning ? 5500 : null
    );
    const handleAutoNext = () => {
        setIndexActive((state) => {
          if (state >= DATA.length - 1) {
            return 0;
          }
          return state + 1;
        });
      };

    const handleClickNext = () => {
        setIndexActive((state) => {
            if (state >= DATA.length -1) {
                return 0;
            }
            return state + 1;
        });
        handleAfterClick();
    };

    const handleClickPrev = () => {
        setIndexActive((state) => {
          if (state === 0) {
            return DATA.length - 1;
          }
          return state - 1;
        });
        handleAfterClick();
      };
    
      const handleAfterClick = () => {
        toggleIsRunning(false);
        if (TIME_OUT) {
          clearTimeout(TIME_OUT);
        }
        TIME_OUT = setTimeout(() => {
          toggleIsRunning(true);
        }, 1000);
      };

      

      const renderItem = (index) => {
        const isActive = indexActive === index;
        const item = DATA[index];
        if (!isActive) {
          return null;
        }
        const slideButton = () => {
            if(!item.btnText){
                return;
            }else {
                 return (
                <ButtonPrimary 
                className="nc-SectionHero2Item__button dark:bg-slate-900"
                sizeClass="py-3 px-6 sm:py-5 sm:px-9"
                href={item.btnLink}>
                    <span>{item.btnText}</span>
                        <span>
                          <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 22L20 20"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>    
                </ButtonPrimary>
            )
          }
        }
        return (
            <div
              className={`nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden`}
              key={index}
            >
                
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex justify-center">
                {DATA.map((_, index) => {
                  const isActive = indexActive === index;
                  return (
                
                    <div
                      key={index}
                      onClick={() => {
                        setIndexActive(index);
                        handleAfterClick();
                      }}
                      className={`relative px-1 py-1.5 cursor-pointer`}
                    >
                      <div
                        className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}
                      >
                        {isActive && (
                          <div
                            className={`nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md ${
                              isActive ? " " : " "
                            }`}
                          ></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
      
              <Prev
                className="absolute left-1 sm:left-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
                btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
                svgSize="w-6 h-6"
                onClickPrev={handleClickPrev}
              />
              <Next
                className="absolute right-1 sm:right-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
                btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
                svgSize="w-6 h-6"
                onClickNext={handleClickNext}
              />
      
              {/* BG */}
              <div className="absolute inset-0 bg-[#ffffff]">
                {/* <div className="absolute inset-0 bg-[#F7F0EA]"> */}
                {/*<img
                  //className="absolute w-full h-full object-contain"
                  //src={backgroundLineSvg}
                  //alt="hero"
              />*/}
              </div>
      
              <div className="relative container pb-0 pt-14 sm:pt-20 lg:py-44">
                <div
                  className={`relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14 nc-SectionHero2Item__left`}
                >
                  <div className="space-y-5 sm:space-y-6">
                    <span className="nc-SectionHero2Item__subheading block text-base md:text-xl text-slate-700 font-medium">
                      {item.subHeading}
                    </span>
                    <h2 className="nc-SectionHero2Item__heading font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl !leading-[114%] text-slate-900">
                      {item.heading}
                    </h2>
                  </div>
                 
                  {slideButton()}
                  {/* <ButtonPrimary
                    className="nc-SectionHero2Item__button dark:bg-slate-900"
                    sizeClass="py-3 px-6 sm:py-5 sm:px-9"
                    href={item.btnLink}
                  >
                    <span>{item.btnText}</span>
                    <span>
                      <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 22L20 20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </ButtonPrimary> */}
                </div>
                <div className="mt-10 lg:mt-0 lg:absolute right-0 bottom-0 top-0 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
                  <img
                    className="w-full h-full object-contain object-right-bottom nc-SectionHero2Item__image"
                    src={item.image}
                    alt={item.heading}
                  />
                </div>
              </div>
            </div>
          );
        };
        
        return (<>{DATA.map((_, index) => renderItem(index))}</>)    
};

export default SectionHero2;