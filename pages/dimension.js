
import Dimension from '../component/dimension'
import Container from '../component/container'
import Head from 'next/head'
export default function dimension() {
    return (
        <>
        <Head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Test your device Dimension</title>
        </Head>
        <Container/>
            <Dimension/>
        </>
    )
}
