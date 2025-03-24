import { useParams } from "react-router-dom"

function CommentPage() {
    const { id } = useParams();

    return <>
        <h1>{`this is the comments page for ${id}`}</h1>
    </>
}

export default CommentPage