"use client"
import style from "./style.module.css"
import  Webname from "../../../public/images/logo-name.png"
import Image from "next/image"
import { useRouter } from "next/navigation"

import SearchInput from "./_complonents/SearchInput/SearchInput"
import CategorySection from "./_complonents/categorySection/CategorySection"
import { useSession } from "next-auth/react"
export default function Home() {
  return (
    <main className="flex-col gap-10 align-center text-black">
        <div className={style.logoname}>
        <Image  src={Webname} height={100} width={350} alt="" ></Image>
        <h2 className={style.slogan}>best in test</h2>
        </div>
        <SearchInput/>
        <CategorySection/>
    </main>  
  )
}
