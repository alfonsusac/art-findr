"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { definedListKeterampilan, FormKeterampilan, PhCheckCircleFill } from "../../DaftarMitra";
import { cn } from "@/lib/utils";


export const UbahKeterampilan = ({ expertises, user }) => {
  const router = useRouter();
  // const [skill, setSkills] = useState([...expertises]);
  // const [input, setInput] = useState(""); // new state for the input value

  // function handleDelete(index) {
  //   const newSkills = [...skill];
  //   newSkills.splice(index, 1);
  //   setSkills(newSkills);
  // }

  // function handleAdd() {
  //   setSkills([...skill, input]);
  //   setInput(""); // clear the input after adding the skill
  // }

  // async function handleSave() {
  //   const res = await fetch("/api/ubah-data-mitra", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ expertises: skill }),
  //   });
  //   const data = await res.json();

  //   if (res.status === 200) {
  //     toast.success(data.message);
  //     router.push("/akun");
  //   } else {
  //     toast.error(data.message);
  //   }
  // }


  const [error, setError] = useState({})
  const clearFormError = () => setError({})

  const [extraKeterampilan, setExtraKeterampilan] = useState(user.mitra.expertises.filter(ket => !definedListKeterampilan.includes(ket)))
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.value = ""
  }, [extraKeterampilan])

  return (
    <form action={async (form) => {
      clearFormError()
      const keterampilan = []
      form.forEach((e) => {
        keterampilan.push(e)
      })
      if (keterampilan.length === 0) {
        return setError({ keterampilan: "Mohon pilih setidaknya satu keterampilan 🙏" })
      }
      const res = await fetch("/api/ubah-data-mitra", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expertises: [...keterampilan, ...extraKeterampilan] }),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message);
        router.push("/akun");
        router.refresh();
      } else {
        toast.error(data.message);
      }
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Keterampilan Saya:</label>
        <div className="flex flex-col gap-2">
          {
            [
              "Memasak",
              "Mencuci Manual ",
              "Mencuci (Mesin Cuci)",
              "Merapikan Rumah (sapu + pel)",
              "Menyetrika",
              "Mengurus Bayi Baru Lahir",
              "Mengasuh Balita (-5th)",
              "Merawat Anak (5th+)",
              "Mengurus Taman",
              "Mendongeng",
              "Mengajar Baca Tulis",
              "Membawa Motor",
              "Membawa Mobil",
              "Mengurus Lansia",
            ].map((item, idx) => {
              return <div
                key={idx}
                className="flex gap-2 items-center group"
              >
                <input
                  type="checkbox"
                  id={"item" + idx}
                  name="vehicle1"
                  value={item}
                  className="hidden peer"
                  defaultChecked={user?.mitra?.expertises?.includes(item) ?? undefined}
                />
                <label
                  htmlFor={"item" + idx}
                  className={cn(
                    "w-full block p-3 px-3 leading-none border border-neutral-300 rounded-md",
                    "transition-all",
                    "font-normal text-lg",
                    "peer-checked:outline-primary",
                    "hover:bg-primary/10",
                    "peer-checked:bg-primary/20",
                    "outline outline-0",
                    "text-white/0",
                    "peer-checked:text-primary",
                    "select-none",
                    "cursor-pointer",
                    "flex justify-between items-center",
                  )}
                >
                  <div className="text-black text-xl">
                    {item}
                  </div>
                  <PhCheckCircleFill className="text-3xl" />
                </label>
              </div>
            })
          }
        </div>
        {
          error.keterampilan && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.keterampilan}
          </div>
        }

        <div className="mt-6 text-lg border-b pb-2 border-neutral-300">
          Keterampilan Lainnya
        </div>
        {
          extraKeterampilan.map((item, idx) => {
            return (
              <div key={item} className="flex gap-2 justify-between items-start">
                <div className="font-semibold mt-1.5 flex-1 leading-tight">{item}</div>
                <button className="button" onClick={() => {
                  setExtraKeterampilan(prev => prev.filter(p => p !== item))
                }}>hapus</button>
              </div>
            )
          })
        }
        <input
          placeholder="Isi keterampilan tambahan"
          className="input my-2"
          ref={inputRef}
        />
        <button className="button text-lg" onClick={(e) => {
          e.preventDefault()
          if (!inputRef.current.value || !inputRef.current.value === "") {
            inputRef.current.focus()
            return
          }
          if (extraKeterampilan.includes(inputRef.current.value)) {
            setExtraKeterampilan(prev => [...prev])
            return
          }
          setExtraKeterampilan(prev => [...prev, inputRef.current.value])
        }}>Tambah keterampilan</button>
      </fieldset>


      <button className="button btn-primary w-full mt-8 text-xl h-14">
        Simpan
      </button>
    </form>
  )
}
