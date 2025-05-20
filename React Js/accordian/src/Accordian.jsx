import React, { useEffect, useState } from 'react'
import data from './faqdata.js';
import FaqHeading from './FaqHeading.jsx';
import FaqSection from './FaqSection.jsx';

export default function Accordian() {

    const [faqs, setFaqs] = useState(data);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log('Hello');
    },[currentIndex]);
    

    return (
        <>
            <div class="outer" id="outer">
                {/* <FaqHeading heading="Frequently Asked Questions" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum quae qui harum veritatis amet, placeat excepturi ducimus reprehenderit vero. Ut vitae cupiditate, repellendus odio minima laboriosam dolorem error? Sunt." /> */}

                <FaqHeading heading="Frequently Asked Questions" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum quae qui harum veritatis amet, placeat excepturi ducimus reprehenderit vero. Ut vitae cupiditate, repellendus odio minima laboriosam dolorem error? Sunt.">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut cum quae qui harum veritatis amet, placeat excepturi ducimus reprehenderit vero. Ut vitae cupiditate, repellendus odio minima laboriosam dolorem error? Sunt.
                </FaqHeading>

                {
                    faqs.map((value, index) => {
                        return(
                            <FaqSection faqData={value} key={index} currentIndex={currentIndex} index={index} setCurrentIndex={setCurrentIndex} />


                            // <div class="outer_faq" key={index}>
                            //     <div class="question" onClick={ () => showFaq(index) }>
                            //         { value.question }
                            //         <span>{ (currentIndex == index) ? '-' : '+'  }</span>
                            //     </div>
                            //     <div class={ (currentIndex == index) ? 'answer' : 'answer hidden'  }>
                            //         { value.answer }
                            //     </div>
                            // </div>
                        )
                    })
                }
            </div>
        </>
    )
}
