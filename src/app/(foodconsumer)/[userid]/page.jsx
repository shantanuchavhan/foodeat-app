import style from "../style.module.css"
import Image from "next/image"
import SearchInput from "../_complonents/SearchInput/SearchInput"
import CategorySection from "../_complonents/categorySection/CategorySection"

import  Webname from "../../../../public/images/logo-name.png"
const page = () => {
  return (
    <div>
      <div className={style.logoname}>
        <Image  src={Webname} height={100} width={350} alt="" ></Image>
        <h2 className={style.slogan}>best in test</h2>
      </div>
      <SearchInput/>
      <CategorySection/>
    </div>
  )
}

export default page