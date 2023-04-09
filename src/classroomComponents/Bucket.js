import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Bucket = () => {
  const classId = useParams().id;
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetChBuc = async () => {
      const res = await fetch(`http://127.0.0.1:8000/classroom/getBucket`, {
        method: "POST",
        body: JSON.stringify({ classId: classId }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("uff");
      }
      const resp = await res.json();
      console.log(resp);
      setItems(resp);
    };
    fetChBuc();
  }, [classId]);
  const Timing = (str) => {
    const d = new Date(str);
    let res = "";
    res += d.getDate() + " ";
    const mon = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "july",
      "aug",
      "sept",
      "oct",
      "nov",
      "dec",
    ];
    res += mon[d.getMonth()] + " ";
    res += d.getFullYear() + " - ";
    res += (d.getHours() % 13) + ":" + d.getMinutes();
    if (d.getHours() > 12) {
      res += " PM";
    } else {
      res += " AM";
    }
    return res;
  };
  const fileAndExt = (filePath) => {
    const a = filePath.split("/")[filePath.split("/").length - 1];
    let d = a;
    // if (a.includes("_")) {
    //   const b = a.split("_")[0];
    //   const c = a.split(".")[1];
    //   d = b +"."+ c;
    // }
    return d;
  };
  return (
    <div>
      {items.map((file) => {
        return (
          <div key={file.id}>
            <a
              href={`http://127.0.0.1:8000${file.file}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-center max-w-4xl mx-auto flex flex-row flex-wrap items-baseline justify-between bg-cardCol my-3 p-2 rounded-lg">
                <p className="text-xl font-bold mr-4">
                  {fileAndExt(file.file)}{" "}
                </p>
                <p className="text-sm"> {Timing(file.created_time)}</p>
              </div>
            </a>
          </div>
        );
      })}
      {/* <table>
        <tbody>
          {items.map((file) => {
            return (
              <tr key={file.id}>
                <td>
                  <a
                    href={`http://127.0.0.1:8000${file.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="text-2xl">{fileAndExt(file.file)}</p>
                  </a>
                </td>
                <td>{Timing(file.created_time)}</td>
                <td className="invisible sm:visible" >
                  <div className="px-3">
                    <div className="flex flex-row items-center">
                      <div className="px-6">
                        <div className="text-xl capitalize">
                          <p>{file.created_by.name}</p>
                        </div>
                        <div>
                          <p>{file.created_by.tagline}</p>
                        </div>
                      </div>
                      <img
                        src={`http://127.0.0.1:8000${file.created_by.profilePhoto}`}
                        alt=".."
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};
export default Bucket;
