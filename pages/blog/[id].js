import { useRouter } from "next/router"

export default function Id() {
    const router = useRouter()
    const blogPage = router.query.id
    return (
        <div>
           <h1>Page ID : {blogPage}</h1>
        </div>
    )
}
