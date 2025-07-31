import React from 'react'
import logo from './assets/react.svg'

export default function Home() {

    var title = 'Welcome To WsCube Tech Company';
    var status = 0;
    var className = 0;

    return (
        <>
            <div style={{ 'backgroundColor' : 'red', 'textAlign' : 'center'  }}>
                <img src="/vite.svg" />
                <img src={logo} />

                <h1>{ title }</h1>
            </div>

            {
                (status == 1)
                ?
                    <div className="row">
                        <h1>Welcome To WsCube Tech</h1>
                    </div>
                : 
                    ""
            }

            <div className="row" style={{ display : ` ${ (className == 1) ? 'none' : '' }` }}>
                <h1>Welcome To WsCube Tech</h1> 
            </div>

            <div className={ (className == 1) ? 'row display' : 'row' }>
                <h1>Welcome To WsCube Tech</h1> 
            </div>



            
        </>

    )
}
