import Layout from "../../components/layout";
import Head from 'next/head'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css';
// Statically generating dynamic paths and data


export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    )
  }

// List all possible page paths
export async function getStaticPaths() {
    // Util to calculate all post ids
    const paths = getAllPostIds()
    return {
      paths, // [1, 2, 3] or [ssg, rerender, headers] etc. Determines what to replace [dynamic]
      fallback: false
    }
}

  export async function getStaticProps({ params }) {
      // Util to fetch data to generate during build time
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }