import React, { useState } from 'react'
import data from './faqdata.js';

export default function Accordian() {

    const [faqs, setFaqs] = useState(data);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showFaq = (i) => {
        if(currentIndex == i){
            setCurrentIndex();
        } else  {
            setCurrentIndex(i);
        }
    }

    return (
        <>
            <div class="outer" id="outer">
                <div class="heading">
                    <h1>Frequently Asked Questions</h1>
                </div>

                {
                    faqs.map((value, index) => {
                        return(
                            <div class="outer_faq" key={index}>
                                <div class="question" onClick={ () => showFaq(index) }>
                                    { value.question }
                                    <span>{ (currentIndex == index) ? '-' : '+'  }</span>
                                </div>
                                <div class={ (currentIndex == index) ? 'answer' : 'answer hidden'  }>
                                    { value.answer }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
