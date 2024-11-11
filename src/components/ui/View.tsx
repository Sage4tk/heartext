const View:React.FC<{
    children?: React.ReactNode,
    className?: string
}> = (props) => {
    return (
        <div className={"flex flex-col items-center px-4 " + props.className}>

            <div className="w-full lg:w-[1000px]">

                {props.children}

            </div>

        </div>
    )
}

export default View;