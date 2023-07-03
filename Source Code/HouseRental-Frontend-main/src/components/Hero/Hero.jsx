import React from 'react'
import "./Hero.css"
import { Container } from 'react-bootstrap'


function Hero() {
    return (
        <>
            <section className='hero'>
                <div className='container'>
                    <h1 style={{ color: 'white' }}>Managing Rents made Easy</h1>
                </div>
                <div className='content text-center my-5'>
                    <Container style={{padding:0}}>
                        Simplify and streamline your rental property management.
                        <br />
                        Say goodbye to tedious paperwork and experience the convenience of RentSure, your all-in-one solution for effective rental management.
                    </Container>
                </div>
            </section>
        </>

    )
}

export default Hero
