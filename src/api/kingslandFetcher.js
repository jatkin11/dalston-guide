const url = 'https://api.tfl.gov.uk/StopPoint/910GDALSKLD/Arrivals';

export default async function fetchArrivals() {
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Error fetching from API");
        }

        const arrivals = await response.json();

    return arrivals.filter(train => train.platformName === 'Platform 1').sort((a,b) => new Date(a.expectedArrival) - new Date(b.expectedArrival));
    }
    catch(error){
        window.alert(error.message);
    }

}

