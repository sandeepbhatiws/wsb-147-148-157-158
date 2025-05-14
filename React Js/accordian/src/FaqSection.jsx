import React from 'react'

export default function FaqSection({ faqData, currentIndex, index, setCurrentIndex }) {

    const showFaq = (i) => {
        if(currentIndex == i){
            setCurrentIndex();
        } else  {
            setCurrentIndex(i);
        }
    }

    return (
        <>
            <div class="outer_faq">
                <div class="question" onClick={ () => showFaq(index) }>
                    {faqData.question}
                    <span>{ (currentIndex == index) ? '-' : '+'  }</span>
                </div>
                <div class={ (currentIndex == index) ? 'answer' : 'answer hidden'  }>
                    {faqData.answer}
                </div>
            </div>
        </>
    )
}
