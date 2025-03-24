import { useParams } from "react-router-dom"

function CommentPage() {
    // comments page for the journal entry with id
    const { id } = useParams();     // extract the 'id' field from the URL

    return <>
        <h1>{`this is the comments page for ${id}`}</h1>
    </>
}

export default CommentPage