import React from 'react'
import logo from './assets/react.svg'

export default function Home() {

    var title = 'Welcome To WsCube Tech Company';

    return (
        <>
            <div style={{ 'backgroundColor' : 'red', 'textAlign' : 'center'  }}>
                <img src="/vite.svg" />
                <img src={logo} />

                <h1>{ title }</h1>
            </div>
            <div className="row">
                <h1>Welcome To WsCube Tech</h1>
            </div>
        </>

    )
}
