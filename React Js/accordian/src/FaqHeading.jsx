import React from 'react'

// Method 1
// export default function FaqHeading(props) {

//     console.log(props);

//     return (
//         <>
//             <div class="heading">
//                 <h1>{ props.heading }</h1>
//                 <p>{ props.description}</p>
//                 <p>{ props.children}</p>
//             </div>
//         </>
//     )
// }


// Method 2
export default function FaqHeading({ heading, children }) {

    return (
        <>
            <div class="heading">
                <h1>{ heading }</h1>
                {/* <p>{ children }</p> */}
            </div>
        </>
    )
}
