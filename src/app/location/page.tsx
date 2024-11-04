export default async function Location() {
    await new Promise((resolve) => {
         setTimeout(resolve, 4000)
     });

    throw new Error('HUMAN ERROR!!')
    return(
        <div className="text-white
                        text-3xl
                        text-center
                        font-serif">
            Our outlets are open 24/7!
        </div>
    );
}
