// for api fetching functions, etc
"use server";

const apiDomain = `http://localhost:8080`;

export async function fetchArchive(currentPage: number) {
  try {
    console.log("query string:");

    const baseUrl = `${apiDomain}/archive`;
    const params = new URLSearchParams({
      page: currentPage.toString(),
    });
    console.log(params);
    const fullUrl = `${baseUrl}?${params.toString()}`;
    const res = await fetch(fullUrl, {
      method: "GET",
    });
    const archiveData = await res.json();
    return archiveData;
  } catch (err) {
    console.error("Error in fetching archive:", err);
    throw new Error("Failed to fetch archive.");
  }
}


export async function fetchSchedule(){

  try {
    const fullUrl = `${apiDomain}/schedule`;
    
    const res = await fetch(fullUrl, {
      method: "GET",
    });

    const scheduleData = await res.json();
    return scheduleData;
  } catch (err) {

    console.error("Error in fetching schedule", err);
    throw new Error("Error in fetching schedule.");
  }
}

export async function fetchInitialGetLiveStream(){
  try {
    const fullUrl = `https://api.radiocult.fm/api/station/redux-731b6892/schedule/live`;
    const res = await fetch(fullUrl, {
      method: "GET",
    });

    const retrievedLiveData = await res.json();
    return retrievedLiveData;
  } catch (err) {
    console.error("Error in fetching initial get live stream", err);
    throw new Error("Error in fetching initial get live stream .");
  }
}


