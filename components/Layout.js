import Link from "next/link";
import Head from 'next/head';
import Router from 'next/router';
const Layout = props => (
    <div>
        <Head>
            <title>{props.title}</title>
        </Head>
        <div className="container">
            <nav>
            {props.backbutton && <span onClick={() => Router.back()} className="back-button">&#x2b05;</span>}
                <Link href="/">
                    <a>
                        <span className="main-title">Hacker Next</span>
                    </a>
                </Link>
            </nav>
            {props.children}
            <style jsx>
                {`
            .container{
                max-width: 800px;
                margin: 0 auto;
                background: #f6f6ef;
            }
            nav{
                background: #f60;
                padding: 1em;
            }
            nav > * {
                display: inline-block;
                color: black;
            }
            nav a{
                text-decoration: none;
            }
            nav .main-title {
                font-weight: bold;
            }
            nav .back-button {
                font-size: 0.9rem;
                padding-right: 1em;
                cursor: pointer;
            }
            `}
            </style>
            <style globsl jsx>
                {`
            body {
                background: white;
                font-family: Verdana, Geneva, sans-serif;
            }`}
            </style>
        </div>
    </div>
)
export default Layout;