export const Video = (props: {className?: string}) => {
    return (
        <iframe
        width="400"
        height="200"
        className={props.className}
        src="https://www.youtube.com/embed/oe8LOFSKz6o?si=f2-CybsOy3y879JU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        >
        </iframe>
    )
}