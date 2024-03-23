"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhCheckCircleFill } from "../DaftarMitra";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

export const UbahKebutuhan = ({ considerations, user }) => {
  const router = useRouter();
  // const [need, setneeds] = useState([...considerations]);
  // const [input, setInput] = useState(""); // new state for the input value

  // function handleDelete(index) {
  //   const newneeds = [...need];
  //   newneeds.splice(index, 1);
  //   setneeds(newneeds);
  // }

  // function handleAdd() {
  //   setneeds([...need, input]);
  //   setInput(""); // clear the input after adding the need
  // }

  // async function handleSave() {
  //   const res = await fetch("/api/ubah-data-mitra", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ considerations: need }),
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


  return (
    <form action={async (form) => {
      clearFormError()
      const values = []
      form.forEach((e) => {
        values.push(e)
      })

      console.log(values)

      // TODO: Maybe flip the booleans?
      // if (values.length === 0) {
      // return setError({ kebutuhanKhusus: "Mohon pilih setidaknya satu keterampilan 🙏" })
      // }

      const res = await fetch("/api/ubah-data-mitra", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ considerations: values }),
      });
      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message);
        router.push("/akun");
        router.refresh()
      } else {
        toast.error(data.message);
      }
    }}>

      <fieldset className="mt-2">
        <label htmlFor="tanggal-lahir" className="text-2xl">Pertimbangan</label>
        <p>Apakah ada yang harus diketahui untuk pencari Mitra?</p>
        <div className="flex flex-col gap-2">
          {
            [
              { value: "Alergi Anjing", detail: "Saya memiliki alergi anjing" },
              { value: "Alergi Kucing", detail: "Saya memiliki alergi kucing" },
            ].map((item, idx) => {
              return <div
                key={idx}
                className="flex gap-2 items-center group"
              >
                <input
                  type="checkbox"
                  id={"item" + idx}
                  name="vehicle1"
                  value={item.value}
                  className="hidden peer"
                  defaultChecked={user?.mitra?.considerations?.includes(item.value) ?? undefined}
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
                    {item.detail}
                  </div>
                  <PhCheckCircleFill className="text-3xl" />
                </label>
              </div>
            })
          }
        </div>
        {
          error.kebutuhanKhusus && <div className="p-3 leading-none bg-red-100 rounded-md text-red-500 font-medium">
            {error.kebutuhanKhusus}
          </div>
        }
      </fieldset>
      <Button className="button btn-primary w-full mt-8 text-xl h-14">
        Simpan
      </Button>
    </form>
  )
};
