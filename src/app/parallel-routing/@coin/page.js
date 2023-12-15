const Page = async () => {
    await new Promise(resolve => setTimeout(resolve, 10000));

    return (
        <main>
            <div>
                Page coin@parallel-routing
            </div>
        </main>
    )
}

export default Page;