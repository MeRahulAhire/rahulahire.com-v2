import { useRouter } from "next/router"

export default function Id({blogPage}) {
    
    return (
        <div>
           <h1>Page ID : {blogPage}</h1>
        </div>
    )
}

export async function getServerSideProps(context) {
    // const router = useRouter()
    // const blogPage = router.query.id
    const id = context.params.id
    return {
        props:{
            blogPage: id
        }
    }
}