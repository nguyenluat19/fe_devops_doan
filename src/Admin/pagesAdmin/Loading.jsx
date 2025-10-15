

const Loading = () => {
    return (

        <div className="text-center mt-3">
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>

            </div>
            <p className="mt-3"> Vui lòng đợi trong giây lát</p>

        </div>
    )
}

export default Loading
