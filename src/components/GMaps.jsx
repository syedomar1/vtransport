
export default function GMaps() {
    return (
        <>
            <img  className='h-5/6 mt-2 ml-2'src={`https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=${import.meta.env.VITE_GOOGLE_API_KEY}`} alt="hello" /> 
        </>
    );
}
