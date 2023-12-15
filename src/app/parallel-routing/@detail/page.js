const Page = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));

    throw Error('Something went wrong');
    
    return (
        <main>
            <div>
                Page detail@parallel-routing
            </div>
        </main>
    )
}

export default Page;