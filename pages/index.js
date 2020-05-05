import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';
import Link from 'next/link';
class Index extends React.Component {
    static async getInitialProps({ req, res, query }) {
        let stories;
        let page = Number(query.page) || 1;
        console.log(query);
        try {
            const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
            stories = await response.json();

        }
        catch (err) {
            console.log(err);
            stories = [];
        }

        return { page, stories };
    }
    componentDidMount = () => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
            .register("/sw.js")
             .catch(err => console.error("Service worker registration failed", err));
        }
         else {
            console.log("Service worker not supported");
        }
    }
    render() {
        const { stories, page } = this.props;

        if (stories.length === 0) {
            return <Error statusCode={503} />;
        }
        return (
            <Layout title="Hacker Next" description="a hacker news clone">
                <StoryList stories={stories} />
                <footer>
                    <Link href={`/?page=${page + 1}`}>
                        <a>Next Page ({page + 1})</a>
                    </Link>
                    <Link href={`/?page=${page - 1}`}>
                        <a>Previous Page ({page - 1})</a>
                    </Link>
                </footer>
                <style jsx>
                    {`
            footer {
                padding: 1em;
                width: 100%;
                display: flex;
                justify-content: space-around;
            }
            footer a{
                font-weight: bold;
                color: black;
                text-decoration: none:
            }
            `}
                </style>
            </Layout>
        )
    }
}
export default Index;