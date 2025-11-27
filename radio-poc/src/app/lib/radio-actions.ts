// for api fetching functions, etc
"use server";

const apiDomain = `http://localhost:8080`;

export async function fetchArchive(searchQuery: string, currentPage: number) {
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

export async function fetchArchivePageCount(
  searchQuery: string,
  currentPage: number
) {
  try {
    const baseUrl = `${apiDomain}/archive/numpages`;
    const params = new URLSearchParams({
      query: searchQuery,
      page: currentPage.toString(),
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    const res = await fetch(fullUrl, {
      method: "GET",
    });
    const numcount = await res.json();
    return numcount["numPages"];
  } catch (err) {
    console.error("Error in fetching archive count:", err);
    throw new Error("Failed to fetch archive count.");
  }
}

export async function fetchShowInfo(showslug: string) {
  try {
    const baseUrl = `${apiDomain}/shows`;
    const params = new URLSearchParams({
      query: showslug,
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    const res = await fetch(fullUrl, {
      method: "GET",
    });

    const showData = await res.json();
    return showData;
  } catch (err) {
    console.error("Error in fetching show", err);
    throw new Error("failed in fetching show information.");
  }
}

export async function fetchShowArchive(
  searchQuery: string,
  currentPage: number,
  showslug: string
) {
  try {
    const baseUrl = `${apiDomain}/show-archive/` + showslug;
    const params = new URLSearchParams({
      query: searchQuery,
      page: currentPage.toString(),
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    const res = await fetch(fullUrl, {
      method: "GET",
    });

    const showData = await res.json();
    return showData;
  } catch (err) {
    console.error("Error in fetching mixes from this show", err);
    throw new Error("failed in fetching show mixes.");
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


