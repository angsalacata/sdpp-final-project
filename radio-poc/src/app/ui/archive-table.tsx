import "@/app/styles/mix-row.scss";
import { fetchArchive } from "@/app/lib/radio-actions";
import { MixElement } from "@/app/ui/mix-element";
import Pagination from "@/app/ui/invoices/pagination";

// general archive table
export default async function ArchiveTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const archiveData = await fetchArchive(currentPage);
  console.log("my archive data");
  console.log(archiveData);
  const totalPages = archiveData.numPages;


  return (
    <div>
      {archiveData.archive.length > 0 && (
        <div className="table">
          {archiveData.archive?.map((mix: any, index: number) => (
            <MixElement
              key={index + currentPage}
              mixName={mix["mixName"]}
              showName={mix["showName"]}
              mixKey={mix["mixKey"]}
              desc={mix["description"]}
              /*NOTE: genre is returned as an array of at most 4 elements. Eg- ['RnB', 'Jazz', "", ""] means only 2 genres*/
              genre={mix["genre"]}
              image={mix["image"]}
              showslug={mix["showslug"]}
              explicit={mix["explicit"]}
              tracklistid={mix["tracklistid"]}
              airdate={mix["airdate"]}
              location={mix["location"]}
              hostName={mix["hostName"]}
              active={false}
              guest={mix["guest"]}
            ></MixElement>
          ))}
        </div>
      )}
      {archiveData.length == 0 && <div>NO SHOWS FOUND</div>}
      <Pagination totalPages={totalPages}></Pagination>
    </div>
  );
}
