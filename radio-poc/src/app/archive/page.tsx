import Table from "@/app/ui/archive-table";

// export default async function Page() {
export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const ITEMS_PER_PAGE = 6;
  //   const archiveData = await fetchArchive();
  const searchParams = await props.searchParams;
  console.log(searchParams);
  // returns what comes after /archive?query=
  // returns what comes after /archive?page= or else 1
  const currentPage = Number(searchParams?.page) || 1;
  // todo- this is a intermediate fix
  // for now we will just hard code total
  const totalPages = Math.ceil(13 / ITEMS_PER_PAGE);

  console.log("current page:");
  console.log(currentPage);
  console.log("total page:");
  console.log(totalPages);

  return (
    <div className="archive-container">
      <h1 className="subheader">Archive</h1>
      {/* <div className = "">
        {archiveData.archive.map((mix, index) => (
            <AudioElement key={index} mixName={mix["mixName"]} showName = {mix["showName"]} dj = {mix["userName"]} mixKey={mix["mixKey"]}></AudioElement>
        ))}

      </div> */}
      <Table currentPage={currentPage} />
    </div>
  );
}
